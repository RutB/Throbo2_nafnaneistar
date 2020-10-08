document.addEventListener('DOMContentLoaded', ()=> {

const user = document.querySelector('.user').textContent

const buttons = document.querySelectorAll('.namecard__button');
for (const bt of buttons) {
    bt.addEventListener('click',decide);
}


function decide(e){
    const id = e.target.value;
    let url = ""
    if(e.target.classList.contains('namecard__approve')){
        url = `${window.location.origin}/swipe/approve/${user}/${id}`
        
    }
    else{
        url = `${window.location.origin}/swipe/disapprove/${user}/${id}`
    }
    getNewName(url)
}

function getNewName(url){
    fetch(url).then((resp) => {
        if(resp.status !== 200) {
            console.log(`Error ${resp.text()}`);
            return
        }
        return resp.json()
    }).then((data)=>{   
        rePopulateData(data)
    })
}

function rePopulateData(data){
    let nameText = document.querySelector('.namecard__name');
    let nameDesc = document.querySelector('.namecard__description')
    const buttons = document.querySelectorAll('.namecard__button');

    const {id, name, description, gender } = data

    nameText.textContent = name;
    nameDesc.textContent = description
    buttons.forEach((button) => button.setAttribute('value',id))
    
    
}

});