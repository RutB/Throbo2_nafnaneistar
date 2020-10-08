from bs4 import BeautifulSoup
import requests
import re
import json
import os.path
import timeit
from googletrans import Translator
import urllib.parse

start = timeit.default_timer()

def getAllMaleOrFemaleNames(choose = 0):
    url = "https://vefur.island.is/mannanofn/leit-ad-nafni/?Stafrof=&Nafn=&Drengir=on&Samthykkt=yes"
    if choose:
        url = "https://vefur.island.is/mannanofn/leit-ad-nafni/?Nafn=&Stulkur=on&Samthykkt=yes"
    nofn = []
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    namelist = soup.find('div', {'class': 'nametype'})
    result = namelist.findAll('li');
    for new in result:
        nofn.append(new.text.strip().split()[0])
    return nofn

def getAllMiddleNames():
    nofn = []
    r = requests.get("https://vefur.island.is/mannanofn/leit-ad-nafni/?Nafn=&Millinofn=on&Samthykkt=yes")
    soup = BeautifulSoup(r.text, 'html.parser')
    namelist = soup.find('div', {'class': 'nametype'})
    result = namelist.findAll('li');
    for new in result:
        nofn.append(new.text.strip().split()[0])
    return nofn;

def findAndReturnText(entry, tag):
    found = entry.find(tag);
    if not found:
        return ""
    return found.text.strip()

def getFemaleNamesAndMeaning():
    names = []
    r = requests.get("https://attavitinn.is/sambond-og-kynlif/fjolskylda/merkingar-nafna/")
    soup = BeautifulSoup(r.text, 'html.parser')
    namelist = soup.findAll('li', {'class': 'woman'})
    for new in namelist:
        name = {}
        name["name"] = findAndReturnText(new,'h3')
        name["desc"] =  findAndReturnText(new,'p')
        names.append(name);
    return names

def getMaleNamesAndMeaning():
    names = []
    r = requests.get("https://attavitinn.is/sambond-og-kynlif/fjolskylda/merkingar-nafna/")
    soup = BeautifulSoup(r.text, 'html.parser')
    namelist = soup.findAll('ul', {'class': 'list-men'})
    result = namelist[2].findAll('li');
    for new in result:
        name = {}
        name["name"] = findAndReturnText(new,'h3')
        name["desc"] =  findAndReturnText(new,'p')
        names.append(name);
    result = namelist[3].findAll('li');
    for new in result:
        name = {}
        name["name"] = findAndReturnText(new,'h3')
        name["desc"] =  findAndReturnText(new,'p')
        names.append(name);
    result = namelist[4].findAll('li');
    for new in result:
        name = {}
        name["name"] = findAndReturnText(new,'h3')
        name["desc"] =  findAndReturnText(new,'p')
        names.append(name);
    return names

def writeToJsonFile(obj,filename):
    with open(filename,'w', encoding="utf-8") as outfile:
        json.dump(obj,outfile,ensure_ascii=False)
    
def writeToTextFile(obj,filename):
    with open(filename,'w',encoding="utf-8") as outfile:
        s = ""
        for n in obj:
            s = s + n + "\n"
        outfile.write(s)

def appendToTextFile(text,filename):
    with open(filename,'a',encoding="utf-8") as outfile:
        s = text+"\n"
        outfile.write(s);
 
def readTranslatedMeaningsToList(f):
    namesAndMeaning = []
    if os.path.isfile(f):
        file1 = open(f, 'r') 
        Lines = file1.readlines()
        for line in Lines:
            if len(line.strip()) < 1:
                continue
            name = {}
            data =  line.split(':')
            name["name"] = data[0]
            name["desc"] = data[1]
            namesAndMeaning.append(name)
    return namesAndMeaning

def getAndTranslateEnglishMeaning(name):
    f = "translatedMeanings.txt";
    translator = Translator()
    url = "https://www.behindthename.com/name/"+name
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    link = soup.find('a', {'class': 'searchLink'})
    url = "https://www.babycenter.ca/"+ link['href']
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    meaning = soup.findAll('div', {'class': 'medium-9'})
    text = meaning[2].text.strip()
    trans = translator.translate(text,dest="is")
    s = name + ":"+trans.text
    appendToTextFile(s,f)
    return trans.text

def newgetAndTranslateEnglishMeaning(name):
    name = replaceIslChar(name.lower())
    f = "translatedMeanings.txt";
    translator = Translator()
    url = "https://www.behindthename.com/name/"+name
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    div = soup.find('div', {'class': 'namemain'})
    if not div:
        return ""
    meaning = ""
    if "There was no name" in div.text.strip():
        div = soup.find('span', {'class': 'listname'})
        if not div:
            return ""
        link = div.find('a')
        url = "https://www.behindthename.com/"+link['href']
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        div = soup.find('div', {'class': 'namemain'})
        if div.text.strip() == "Submitted Name":
            div = soup.findAll('div', {'class': 'namemain'})
            meaning = div[1].findNextSibling('div')
        else:
            meaning = div.findNextSibling('div')
    else:
        meaning = div.findNextSibling('div')
    if "Icelandic".lower() in meaning.text.strip().lower() and "form of".lower() in meaning.text.strip():
        i = 0;
        while "form of" in meaning.text.strip():
            links = meaning.findAll('a')
            link = links[0]
            for l in links:
                if "/name/" in  l['href']:
                    link = l
            url = "https://www.behindthename.com/"+link['href']
            r = requests.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            div = soup.find('div', {'class': 'namemain'})
            meaning = div.findNextSibling('div')
            i = i+1
            if i > 6:
                return ""
    text = meaning.text.strip()
    trans = translator.translate(text,dest="is")
    translation = trans.text
    if translation.lower() == "vista":
        return ""
    translation.replace("f & m", "kvk og kk")
    s = name+":"+translation+"\n"
    appendToTextFile(s,f)
    return translation

def replaceIslChar(s):
    alph = (
        ('á','a'),('í','i'),('ó','o'),('ý','y'),('é','e'),('þ','th'),('ð','d'),('ú','u')
    )
    news = s
    for old,new in alph:
        news = news.replace(old,new)
    return news

def getFullNameListWithDesc(fullList, descList):
    combinedNames = []
    indexedDesc = []
    savedMeanings = readTranslatedMeaningsToList('translatedMeanings.txt')
    indexedSaved = []
    for t in descList:
        indexedDesc.append(t['name'])
    for t in savedMeanings:
        indexedSaved.append(t['name'])
    for i in fullList:
        name = {}
        nameText = i
        if indexedDesc.count(i) > 0:
            index = indexedDesc.index(i)
            descText = descList[index]['desc']
        elif indexedSaved.count(i) > 0:
            print("indexed saved the day")
            index = indexedSaved.index(i)
            descText = savedMeanings[index]['desc']
        else:
            descText = newgetAndTranslateEnglishMeaning(i)
        name["name"] = nameText
        name["desc"] = descText
        combinedNames.append(name)
    return combinedNames

#runtime +- 75min
def initGettingFullList():
    allFemaleApprovedNames = getAllMaleOrFemaleNames(1);
    femaleDesc = getFemaleNamesAndMeaning();

    allMaleApprovedNames = getAllMaleOrFemaleNames(0)
    maleDesc = getMaleNamesAndMeaning()

    fullMaleList = getFullNameListWithDesc(allMaleApprovedNames,maleDesc)
    fullFemaleList = getFullNameListWithDesc(allFemaleApprovedNames,femaleDesc)

    maleMissing = []
    femaleMissing = []


    for n in fullMaleList:
        if n['desc'] == "":
            maleMissing.append(n['name'])

    for n in fullFemaleList:
        if n['desc'] == "":
            femaleMissing.append(n['name'])

    writeToTextFile(maleMissing,"maleMissing.txt")
    writeToTextFile(femaleMissing,"femaleMissing.txt")


    print(len(fullMaleList))
    print(len(maleMissing));
    print(len(femaleMissing))
    print(len(fullFemaleList))

    writeToJsonFile(fullMaleList,"fullMaleNamesWithDesc.json")
    writeToJsonFile(fullFemaleList,"fullFemaleNamesWithDesc.json")

def createDataForDB(f = "fullFemaleNamesWithDesc.json", m = "fullMAleNamesWithDesc.json"):
    sql = "INSERT INTO name_card (name, description, gender) VALUES \n"
    with open(f) as json_file:
        data = json.load(json_file)
        for p in data:
                desc = "MISSING"
                if not p['desc'] == "":
                    desc = p['desc']
                desc = desc.replace("'",'`')
                x = desc.count("(")
                y = desc.count(")")
                if x > y:
                    desc = desc+")"
                line = "('{}','{}',{}),\n".format(p['name'],desc, 1)
                sql = sql+line.replace('"',"“")
    with open(m) as json_file:
        data = json.load(json_file)
        for p in data:
                desc = "MISSING"
                if not p['desc'] == "":
                    desc = p['desc']
                desc = desc.replace("'",'`')
                x = desc.count("(")
                y = desc.count(")")
                if x > y:
                    desc = desc+")"
                line = "('{}','{}',{}),\n".format(p['name'],desc, 0)
                sql = sql+line.replace('"',"“")
    with open("insertdb.txt",'w',encoding="utf-8") as outfile:
        outfile.write(sql)

#createDataForDB()

x = getFemaleNamesAndMeaning()




def writeToDBfile(x):
    sql = "INSERT INTO name_card (name, description, gender) VALUES \n"
    for line in x:
        line = "('{}','{}',{}),\n".format(line['name'],line['desc'], 1)
        sql = sql + line;
    with open("insertdb.txt",'w',encoding="utf-8") as outfile:
        outfile.write(sql)
stop = timeit.default_timer()
print('Time: ', stop - start)  

