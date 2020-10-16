document.addEventListener("DOMContentLoaded", () => {
  const namecard = document.querySelector(".namecard");

  
  const buttons = document.querySelectorAll(".namecard__button");
  for (const bt of buttons) {
    bt.addEventListener("click", decide);
  }

  const cbs = document.querySelectorAll('.filter__checkbox');
  for(const cb of cbs){
    cb.addEventListener('click',initCheckForFilter);
    cb.addEventListener('click',refreshName);
    }


  let mouseDown = 0;
  let mouseX = undefined;

  let touchDownX = undefined;
  let lastTouch = undefined;

  namecard.addEventListener("mousedown", (e) => {
    mouseDown = 1;
    mouseX = e.clientX;
  });

  namecard.addEventListener("mouseup", (e) => {
    mouseDown = 0;
    mouseX = undefined;
  });

  namecard.addEventListener("mouseout", (e) => {
    let id = buttons[0].value;
    if (mouseDown && mouseX !== undefined) {
      let url = mouseX < e.clientX ? getDecision(id, 1) : getDecision(id, 0);
      mouseX = undefined;
      getNewName(url);
    }
  });

  document.addEventListener("keyup", decideByKeyboard);

  namecard.addEventListener("touchstart", (e) => {
    touchDownX = e.touches[0].clientX;
  });

  namecard.addEventListener("touchmove", (e) => {
    lastTouch = e.touches[0].clientX;
  });

  namecard.addEventListener("touchend", (e) => {
    let offset = 60;
    if (Math.abs(touchDownX - lastTouch) > offset) {
      if (touchDownX < lastTouch + offset) {
        getNewName(getDecision(buttons[0].value, 1));
      } else if (touchDownX > lastTouch - offset) {
        getNewName(getDecision(buttons[0].value, 0));
      }
    }

    touchDownX = undefined;
    lastTouch = undefined;
  });

  function getDecision(id, approve) {
    let url = "";
    if (approve === 1) {
      url = `${window.location.origin}/swipe/approve/${id}`;
    } else {
      url = `${window.location.origin}/swipe/disapprove/${id}`;
    }
    return url;
  }

  function decide(e) {
    const id = document.querySelector(".namecard__button").value;
    console.log(e.target)
    let url = e.target.classList.contains("fa-arrow-circle-right")
      ? getDecision(id, 1)
      : getDecision(id, 0);
    getNewName(url);
  }

  function getNewName(url) {
    let params = extractParams();
    if(params.length > 1)
        url += params;
    fetch(url)
      .then((resp) => {
        if (resp.status !== 200) {
          console.log(`Error ${resp.text()}`);
          return;
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        rePopulateData(data);
      });
  }

  function rePopulateData(data) {
    let nameText = document.querySelector(".namecard__name");
    let nameDesc = document.querySelector(".namecard__description");
    const buttons = document.querySelectorAll(".namecard__button");
    let genderIcon = document.querySelector(".namecard__gender");
    genderIcon.classList.remove("fa-venus");
    genderIcon.classList.remove("fa-mars");

    const { id, name, description, gender } = data;

    let classname = gender ? "fa-venus" : "fa-mars";
    nameText.textContent = name;
    nameDesc.textContent = description;
    genderIcon.classList.add(classname);
    buttons.forEach((button) => button.setAttribute("value", id));
  }

  function decideByKeyboard(e) {
    let id = document.querySelector(".namecard__button").value;
    if (e.key === "ArrowRight") url = getDecision(id, 1);
    if (e.key === "ArrowLeft") url = getDecision(id, 0);
    getNewName(url);
  }

  function createCheckMark(){
      let i = document.createElement('i');
      i.classList.add('fas')
      i.classList.add('fa-check')
      return i;
  }


  function extractParams(){
    let params = "";
      let cbs = document.querySelectorAll('.filter__checkbox');
      for(let cb of cbs) {
          if(cb.children.length === 1){
              if(cb.getAttribute('id') === 'female'){
                params += (params.indexOf("?") === -1) ? "?female=1" : "&female"; 
              }
              if(cb.getAttribute('id') === 'male'){
                params += (params.indexOf("?") === -1) ? "?male=1" : "&male"; 
              }
          }
      }
      return params;
  }

  function initCheckForFilter(e){
    let target = e.target
    if(target.classList.contains('fas'))
        target = target.parentNode
    if(target.children.length === 0)
        target.appendChild(createCheckMark());
    else
        while(target.firstChild){target.removeChild(target.firstChild)}
        
  }

  function refreshName(){
      let url = `${window.location.origin}/swipe/newname`;
      getNewName(url)
  }

});