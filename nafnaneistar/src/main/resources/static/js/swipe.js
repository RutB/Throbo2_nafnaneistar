document.addEventListener('DOMContentLoaded', ()=> {


const namecard = document.querySelector('.namecard');
const buttons = document.querySelectorAll('.namecard__button');

let mouseDown = 0;
let mouseX = undefined;

namecard.addEventListener('mousedown', (e)=> {
    mouseDown = 1;
    mouseX = e.clientX;
})

namecard.addEventListener('mouseup', (e)=> {
    mouseDown = 0;
    mouseX = undefined;
})

namecard.addEventListener('mouseout', (e)=> {
    
    let id = buttons[0].value
    if(mouseDown && mouseX !== undefined){
        let url = (mouseX < e.clientX) ? getDecision(id,1) : getDecision(id,0);
        mouseX = undefined;
        getNewName(url)
    }
    
})

document.addEventListener('keyup', decideByKeyboard)

for (const bt of buttons) {
    bt.addEventListener('click',decide);
}

function getDecision(id,approve){
    let url = ""
    if(approve){
        url = `${window.location.origin}/swipe/approve/${id}`
        
    }
    else{
        url = `${window.location.origin}/swipe/disapprove/${id}`
    }
    return url;
}

function decide(e){
    const id = e.target.value;
    let url = (e.target.classList.contains('namecard__approve')) ? getDecision(id,1) : getDecision(id,0)
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
        console.log(data)
        rePopulateData(data)
    })
}

function rePopulateData(data){
    let nameText = document.querySelector('.namecard__name');
    let nameDesc = document.querySelector('.namecard__description')
    const buttons = document.querySelectorAll('.namecard__button');
    let genderIcon = document.querySelector(".namecard__gender")
    genderIcon.classList.remove("fa-venus");
    genderIcon.classList.remove("fa-mars");
    
    const {id, name, description, gender } = data

    let classname = (gender) ? 'fa-venus' : 'fa-mars';
    nameText.textContent = name;
    nameDesc.textContent = description
    genderIcon.classList.add(classname);
    buttons.forEach((button) => button.setAttribute('value',id))
    
    
}


function decideByKeyboard(e){
    let id = document.querySelector('.namecard__button').value
    let url = ""
    if(e.key === "ArrowRight")
       url =  getDecision(id,1)
    if(e.key === "ArrowLeft")
        url =  getDecision(id,0)
    getNewName(url)

}

});