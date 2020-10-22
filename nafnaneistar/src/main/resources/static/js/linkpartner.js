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
});
