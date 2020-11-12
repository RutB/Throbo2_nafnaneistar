document.addEventListener('DOMContentLoaded', () => {

    const updateNameButton = document.querySelector('#settings__updateName__button');
    const updatePasswordButton = document.querySelector('#settings__changePassword__button');
    const resetLikedButton = document.querySelector('#settings__reset__button');

    updateNameButton.addEventListener('click',updateName)


    function updateName() {
        const nameInput = document.querySelector('#changeName');
        let currentName = document.querySelector('.settings__currentName')
        let name = nameInput.value;
       
        if(name.trim().length === 0){
            nameInput.value = ""
            nameInput.setAttribute('placeholder','Settu inn gilt nafn')
        }
        else {
            url = `${window.location.origin}/settings/updatename?newname=${name}`;
            if(waitForConfirmation(url)){
                currentName.textContent = name
            }
           
        }
           
    }

    async function waitForConfirmation(url,data = null){
        let answer = false;
        fetch(url).then(resp => {
            if(resp.status !== 200){
                console.error("failed to get response")
            }
            return resp.json();
        }).then(r => answer = r)
            return answer
    }
    
    function createElephantLoader(container,text){
        let elephant__loader = el('div','elephant__loader');
        let loading__img = el('div','loading__imgdiv')
        elephant__loader.appendChild(loading__img);
        let img = el('img','loading__img')
        img.setAttribute('alt',"Walking elephant that represents a loading gif")
        img.setAttribute('src','/img/fill.gif')
        loading__img.appendChild(img)
        let span = el('span','loading__text');
        span.appendChild(document.createTextNode(text))
        elephant__loader.appendChild(span)
        container.insertBefore(elephant__loader,container.childNodes[0])
    }

    function removeElephantLoader(){
        let elephants = document.querySelectorAll('.elephant__loader')
        elephants.forEach(e=> e.remove())
      }
});