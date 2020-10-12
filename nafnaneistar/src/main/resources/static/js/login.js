document.addEventListener('DOMContentLoaded', () => {

    const loginform = document.querySelector('.login__form');
    loginform.addEventListener('submit', submitHandler);
    var interval;

function submitHandler(e){
    e.preventDefault();
   
    let user = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    let url = `${window.location.origin}/login/check/${user}/${password}`
    validateLogin(url)


}


function decreaseTimer(){
    let timer = document.querySelector('.popup__timer');
    let pTitle = document.querySelector('.popup__title');
    let code = (!pTitle.textContent.toLowerCase().includes('mistókst')) ? 1 : 0;
    let value = parseInt(timer.textContent);
    timer.textContent = parseInt(value-1);
    let url = `${window.location.origin}/swipe`
    if(value <= 1){
        if(code == 1)
            window.location.replace(url)
        else 
            document.querySelector('.popup').remove()
        
        clearInterval(interval)
    }
}


function el(tag,className,text = null){
    let element = document.createElement(tag)
    element.classList.add(className)
    if(text)
        element.appendChild(document.createTextNode(text))
    return element;
}

function createPopup(title, text, timer) {
    let popupContainer = el('div','popup__container')

    let popupTitle = el('h2','popup__title',title)
    popupContainer.appendChild(popupTitle)

    let popupText = el('p','popup__text',text)
    popupContainer.appendChild(popupText)

    let popupTimer = el('span','popup__timer',timer)
    popupContainer.appendChild(popupTimer)


    let popup = el('div','popup')
    popup.appendChild(popupContainer);

    document.querySelector('body').appendChild(popup)

    
}


function validateLogin(url){
    fetch(url).then((resp) => {
        if(resp.status !== 200) {
            console.log(`Error ${resp.text()}`);
            return
        }
        return resp.json()}).then((data)=>{   
            console.log(data)
            if(data)
                createPopup("Innskráning Tókst","Slóðin verður færð á aðalsíðuna eftir","3");
            else
                createPopup("Innskráning Mistókst","Vitlaust notendanafn eða lykilorð","3");
             interval = setInterval(decreaseTimer,1000)

    })
}


});
