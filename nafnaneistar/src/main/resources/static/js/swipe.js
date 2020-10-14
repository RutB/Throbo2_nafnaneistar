document.addEventListener('DOMContentLoaded', ()=> {



const buttons = document.querySelectorAll('.namecard__button');
for (const bt of buttons) {
    bt.addEventListener('click',decide);
}


function decide(e){
    const id = e.target.value;
    let url = ""
    if(e.target.classList.contains('namecard__approve')){
        url = `${window.location.origin}/swipe/approve/${id}`
        
    }
    else{
        url = `${window.location.origin}/swipe/disapprove/${id}`
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

});