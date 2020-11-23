document.addEventListener("DOMContentLoaded", () => {

    let addButtons = document.querySelectorAll(".add__button");
    let removeButtons = document.querySelectorAll(".remove__button"); 
    addButtons.forEach(b => b.addEventListener("click", addToList));
    removeButtons.forEach(p => p.addEventListener("click", removeFromList));

    function addToList(e){
        //const url = `${window.location.origin}/searchname/addtoliked`;
        //console.log(url+`/${e.target.getAttribute("id")}`);
        console.log(`${window.location.origin}/searchname/addtoliked/${e.target.getAttribute("id")}`);
        //fetch(url+`/${e.target.getAttribute("id")}`)
        fetch(`${window.location.origin}/searchname/addtoliked/${e.target.getAttribute("id")}`)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error(`Error ${resp.text()}`);
                    return
                }
                return resp.json();
            }).then(data => {
                console.log(data)
                if(data)
                    toggleButton(e.target)
            })

    };

    function removeFromList(e){
        fetch(`${window.location.origin}/searchname/removefromliked/${e.target.getAttribute("id")}`)
            .then((resp) => {
                if(resp.status !== 200)  {
                    console.error(`Error ${resp.text()}`);
                    return ;
                }
                /*Kalla hér á fall sem breytir takka hjá nafni*/
                return resp.json();
            }).then(data => {
                console.log(data)
                if(data)
                    toggleButton(e.target)
            })
    };

    /**
     * TODO:
     * Taka inn lista sem er að birtast
     * Fara yfir hvert stak í lista
     * Ef id staksins er nú þegar í approvedNames lista, þá:
     *  Fela "bæta á lista"
     *  Birta "Taka af lista"
     * Ef ýtt er á takka og aðgerð heppnast, þá:
     *  Toggla takka, s.s. fela current og birta hinn
     */
    function toggleButton(button){
        if(button.classList.contains("remove__button")){
            button.textContent = "Bæta í lista"
            button.classList.toggle("remove__button")
            button.classList.toggle("add__button")
        }
        else if(button.classList.contains("add__button")){
            button.textContent = "Taka úr lista"
            button.classList.toggle("remove__button")
            button.classList.toggle("add__button")
        }

    }
   // checkApproveStatus();
});