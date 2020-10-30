document.addEventListener('DOMContentLoaded', () => {
    
    const linkingform = document.querySelector('.linking__form');
    linkingform.addEventListener('submit', submitHandler);

    function submitHandler(e){
        e.preventDefault();
        let error = document.querySelector('.error__message');
        error.classList.add('--hidden')
        
        let user = document.querySelector('#email').value
        let url = `${window.location.origin}/linkpartner/check/${user}`
        console.log(url);
        validatePartner(url)
    }


    function validatePartner(url){
        fetch(url).then((resp) => {
            if(resp.status !== 200) {
                console.log(`Error ${resp.text()}`);
                console.log('Err');
                return
            }
            return resp.json()}).then((data)=>{   
                if(!data)
                    ShowError()
            //connectPartner(data)
            console.log(data);
                 
        })
    }

    function connectPartner(data){
        let code = (error.classList.contains('--hidden')) ? 1 : 0;

    }
    function ShowError(message = null){
        let error = document.querySelector('.error__message');
        let username = document.querySelector('#email');
        console.log(username.value.trim())
        if(username.value.trim().length === 0)
            message = "Vinsamlegast sláðu inn netfang"
        if (!username.value.includes("@")){
            message = "Ath að slá inn gilt netfang"
        }
        error.classList.remove("--hidden")
        if(message)
            error.textContent = message
    }

    
});
