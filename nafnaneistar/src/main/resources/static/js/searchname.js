document.addEventListener("DOMContentLoaded", () => {

    let addButtons = document.querySelectorAll(".add__button");
    let removeButtons = document.querySelectorAll(".remove__button"); 
    addButtons.forEach(b => b.addEventListener("click", addToList));
    removeButtons.forEach(p => p.addEventListener("click", removeFromList));

    function addToList(e){
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
                return resp.json();
            }).then(data => {
                console.log(data)
                if(data)
                    toggleButton(e.target)
            })
    };

    function toggleButton(button){
        if(button.classList.contains("remove__button")){
            button.textContent = "Bæta í lista"
            button.classList.toggle("remove__button")
            button.classList.toggle("add__button")
        }
        else if(button.classList.contains("add__button")){
            button.textContent = "Taka af lista"
            button.classList.toggle("remove__button")
            button.classList.toggle("add__button")
        }
    }
});