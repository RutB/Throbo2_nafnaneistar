document.addEventListener('DOMContentLoaded', ()=>{

    let tabs = document.querySelectorAll('.viewliked__tab');
    for(const t of tabs) {
        t.addEventListener('click',openWindow);
    }



    function openWindow(e){
        
        if(!e.target.getAttribute('id').includes('tab')) return;
        let tabno = e.target.getAttribute('id');
        tabs.forEach(tab => tab.classList.remove('--active'));
        e.target.classList.add('--active')
        let views = document.querySelectorAll('.viewliked__window');
        views.forEach(view => view.classList.remove('viewliked__active'))
        let no = tabno.split('tab')[1];
        let window = `window${no}`;
        console.log(window)
        document.getElementById(window).classList.add('viewliked__active')
    }



})