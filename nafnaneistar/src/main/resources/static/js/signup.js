document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector('.form__button');
    let error = document.querySelector('.error__message')
    const email = document.querySelector('#email');
    email.addEventListener('focusin',resetEmailtxt);
    email.addEventListener('focusout',validateEmail);

function validateEmail(e){
    if(e.target.value.trim().length === 0) return;
    let msg = "Netfang nú þegar í notkun";
    if(!e.target.value.includes("@")){
        button.disabled = true;
        error.classList.remove('--hidden')
        error.textContent = "Netfang rangt slegið inn"
        return
    }
    let url = `${window.location.origin}/signup/checkemail?email=${e.target.value}`
    fetch(url).then((resp) => {
        if(resp.status !== 200) {
            console.log(`Error ${resp.text()}`);
            return
        }
        return resp.json()}).then((data)=>{   
            if(data){
               button.disabled = false;
               error.classList.add('--hidden')
               error.textContent = msg;
            }
            else {
                button.disabled = true;
                error.classList.remove('--hidden')
            } 
    })
}

function resetEmailtxt(){
    let msg = "Netfang nú þegar í notkun";
    error.classList.add('--hidden')
    error.textContent = msg
}
function el(tag,className,text = null){
    let element = document.createElement(tag)
    element.classList.add(className)
    if(text)
        element.appendChild(document.createTextNode(text))
    return element;
}


});
