document.addEventListener('DOMContentLoaded', () => {

    const updateNameButton = document.querySelector('#settings__updateName__button');
    const nameInput = document.querySelector('#changeName');
    updateNameButton.addEventListener('click',updateName)
    nameInput.addEventListener('keyup',(e) => {
        if(e.key === "Enter"){
            updateName();
        }
    })


    const updatePasswordButton = document.querySelector('#settings__changePassword__button');
    const oldpassInput = document.querySelector("#changePass__old");
    const newpassInput = document.querySelector("#changePass__new")
    updatePasswordButton.addEventListener('click',updatePassword)
    oldpassInput.addEventListener('keyup',(e) => {
        if(e.key === "Enter"){
            updatePassword();
        }
    })
    newpassInput.addEventListener('keyup',(e) => {
        if(e.key === "Enter"){
            updatePassword();
        }
    })

    newpassInput.addEventListener('focusin',(e) => {
        e.target.setAttribute('placeholder',"")
    })
    oldpassInput.addEventListener('focusin',(e) => {
        e.target.setAttribute('placeholder',"")
    })
    
    
    const resetLikedButton = document.querySelector('#settings__reset__button');
    
    resetLikedButton.addEventListener('click',resetList)


    function updateName() {
        let currentName = document.querySelector('.settings__currentName')
        let name = nameInput.value;
        if(name.trim().length === 0){
            nameInput.value = ""
            nameInput.setAttribute('placeholder','Settu inn gilt nafn')
        }
        else {
            nameInput.value = ""
            let url = `${window.location.origin}/settings/updatename?newname=${name}`;
            createElephantLoader("Uppfæri lykilorð")
            fetch(url).then(resp => {
                if(resp.status !== 200){
                    console.error("failed to get response: " + resp.text)
                    nameInput.setAttribute('placeholder','Villa kom upp')
                }
                return resp.json();
            }).then(r => {
                console.log(r)
                if(r){
                    currentName.textContent = capitalize(name)
                    nameInput.setAttribute('placeholder','')
                }
                else {
                    nameInput.setAttribute('placeholder','Villa kom upp')
                }
                removeElephantLoader();
            });
           
        }
           
    }

    function updatePassword() {
        let oldpass = oldpassInput.value;
        let newpass = newpassInput.value;

        if(oldpass.length === 0){
            oldpassInput.setAttribute("placeholder","Má ekki vera tómt")
        }
        else if(newpass.length === 0){
            newpassInput.setAttribute("placeholder","Má ekki vera tómt")
        }
        else {
            oldpassInput.value = ""
            newpass.value = ""
            let url = `${window.location.origin}/settings/changepassword?oldpass=${oldpass}&newpass=${newpass}`;
            createElephantLoader("Uppfæri Nafn")
            fetch(url).then(resp => {
                if(resp.status !== 200){
                    console.error("failed to get response: " + resp.text())
                    oldpassInput.setAttribute("placeholder","Villa kom upp")
                    newpassInput.setAttribute("placeholder","Villa kom upp")
                }
                return resp.json();
            }).then(r => {
                oldpassInput.setAttribute("placeholder","")
                newpassInput.setAttribute("placeholder","")
                if(r){
                    oldpassInput.setAttribute("placeholder","Breyting tókst")
                    newpassInput.setAttribute("placeholder","Breyting tókst")
                }
                else {
                    oldpassInput.setAttribute("placeholder","Gamla lykilorð ekki rétt")
                    newpassInput.setAttribute("placeholder","Villa kom upp")
                }
                removeElephantLoader();
            });
        }
    }
    
    function resetList(){
        let totalLiked = document.querySelector('.settings__totalLiked');
        //ég veit að þetta er nono en nenni ekki að henda í custom popup atm
        let answer =  confirm("Ertu viss um að þú viljir byrja uppá nýtt með listana?")
        if(answer){
            let url = `${window.location.origin}/settings/resetlists`;
            createElephantLoader("Núllstilli lista")
            fetch(url).then(resp => {
                if(resp.status !== 200){
                    console.error("failed to get response: " + resp.text())
                 }
                return resp.json();
            }).then(r => {
                if(r){
                    totalLiked.textContent = "0";
                }
                removeElephantLoader();
            });
        }
    }

    function createElephantLoader(text){
        let body = document.querySelector('body')
        let elephant__loader = el('div','elephant__loader');
        let loading__img = el('div','loading__imgdiv')
        elephant__loader.appendChild(loading__img);
        let img = el('img','loading__img')
        img.setAttribute('alt',"Walking elephant that represents a loading gif")
        img.setAttribute('src','/img/fill.gif')
        loading__img.appendChild(img)
        let span = el('span','loading__text');
        span.appendChild(document.createTextNode(text))
        elephant__loader.appendChild(span)
        body.insertBefore(elephant__loader,body.childNodes[0])
    }

    function removeElephantLoader(){
        let elephants = document.querySelectorAll('.elephant__loader')
        elephants.forEach(e=> e.remove())
      }

    function el(tag, className, text = null) {
    let element = document.createElement(tag)
    if (className) {
        let classes = className.split(' ');
        classes.forEach(c => element.classList.add(c))
    }
    if (text)
        element.appendChild(document.createTextNode(text))
    return element;
    }
    
      const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
});