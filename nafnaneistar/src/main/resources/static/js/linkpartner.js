document.addEventListener('DOMContentLoaded', () => {
    
    const linkingform = document.querySelector('#email');
    linkingform.addEventListener('focusout', validHandler);

    let removeButtons = document.querySelectorAll('.link__remove');
    removeButtons.forEach(button => button.addEventListener('click', removeNameFromList));

    function validHandler(e){
        let error = document.querySelector('.error__message');
        let button = document.querySelector('.form__button');
        let msg = "Netfang er ekki til";
        if (!e.target.value.includes("@")){
            button.disabled = true;
            error.classList.remove('--hidden');
            error.textContent = "Netfang er rangt slegið inn";
            return;
        }
        let url = `${window.location.origin}/linkpartner/checkemail?email=${e.target.value}`
        
        fetch(url).then((resp) => {
            if(resp.status !== 200) {
                console.log(`Error ${resp.text()}`);
                return
            } return resp.json()}).then((data)=>{   
                if(data){
                   button.disabled = false;
                   error.classList.add('--hidden')
                   error.textContent = msg;
                   console.log("tengist partner");
                }
                else {
                    button.disabled = true;
                    error.classList.remove('--hidden');
                    populateTable(data);
                    console.log("ekki tengist partner");
                } 
        })
    }
    function removeNameFromList(e) {
        let grandpapa = e.target.parentNode.parentNode; //row
        let id = grandpapa.getAttribute('id');
        let url = `${window.location.origin}/linkpartner/remove?id=${id}`;
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.log(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
            .then((data) => {
                if (data)
                    grandpapa.remove();
            })
    }

    function populateTable(data) {
        let bt = document.querySelector('.link__remove');
        bt.addEventListener('click', removeNameFromList);
    }
    
});


