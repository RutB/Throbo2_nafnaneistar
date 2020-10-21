document.addEventListener('DOMContentLoaded', ()=>{

    let tabs = document.querySelectorAll('.viewliked__tab');
    for(const t of tabs) {
        t.addEventListener('click',openWindow);
    }
    initStarConversion();

    
    let stars  = document.querySelectorAll('.gender__rankstar');
    stars.forEach(star => {
        star.addEventListener('mouseover',starStruck)
    })


    function starStruck(e){
        let parent  = e.target.parentNode;
        let rankclass = e.target.classList[4];
        let targetrank = parseInt(rankclass.split('-')[1])
        let starcluster = parent.querySelectorAll('.gender__rankstar');
        starcluster.forEach(cstar => {
            let cstarclass = cstar.classList[4];
            let cstarrank = parseInt(cstarclass.split('-')[1])
            if(cstarrank <= targetrank){
                cstar.classList.remove('far')
                cstar.classList.remove(cstarclass)
                cstar.classList.add('fas')
                cstar.classList.add(cstarclass)
            }
            else {
                cstar.classList.remove('fas')
                cstar.classList.remove(cstarclass)
                cstar.classList.add('far')
                cstar.classList.add(cstarclass)
            }
        })
    }

    


    function initStarConversion(){
        let ranks = document.querySelectorAll('.gender__rank');
        ranks.forEach(rank => {
            let value = parseInt(rank.textContent);
            rank.removeChild(rank.firstChild);
            for(let i = 1; i < 6;i++){
                if(i <= value)
                    rank.appendChild(createFilledStar(i))
                else
                    rank.appendChild(createEmptyStar(i));
            }
        })

    }

    function createEmptyStar(rank){
        let star = document.createElement('i');
        star.classList.add('far');
        star.classList.add('fa-star')
        star.classList.add('gender__rankstar')
        star.classList.add('empty')
        if(rank)
            star.classList.add(`starrank-${rank}`)
        return star;
    }
    function createFilledStar(rank){
        let star = document.createElement('i');
        star.classList.add('fas');
        star.classList.add('fa-star')
        star.classList.add('gender__rankstar')
        star.classList.add('filled')
        if(rank)
            star.classList.add(`starrank-${rank}`)
        return star;
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