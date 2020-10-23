document.addEventListener('DOMContentLoaded', () => {
    
    const loginform = document.querySelector('.linking__form');
    loginform.addEventListener('submit', submitHandler);
    var interval;

    function submitHandler(e){
        e.preventDefault();
       
        let user = document.querySelector('#email').value
        let url = `${window.location.origin}/linkpartner/check/${user}`
        validateLogin(url)
    }
    function el(tag,className,text = null){
        let element = document.createElement(tag)
        element.classList.add(className)
        if(text)
            element.appendChild(document.createTextNode(text))
    }

    function createAlert(text){
        //document.getElementById("hiddenAlert").style.visibility = "visible"
        
        let alertText = el('p','form__alert', text)

        let alertContainer = el('div','alert__container')
        alertContainer.appendChild(alertText)
        document.querySelector(".linking__submit").appendChild(alertContainer)

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
                    createAlert("Tenging tókst");
                else
                    createAlert("Tenging mistókst");    
        })
    }



    
});
