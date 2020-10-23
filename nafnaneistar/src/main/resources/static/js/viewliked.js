document.addEventListener('DOMContentLoaded', () => {

    let tabs = document.querySelectorAll('.viewliked__tab');
    for (const t of tabs) {
        t.addEventListener('click', openWindow);
    }
    initStarConversion();

    let rows = document.querySelectorAll('.gender__row');
    rows.forEach(row => row.addEventListener('mouseleave', starConvertRow));


    let stars = document.querySelectorAll('.gender__rankstar');
    stars.forEach(star => {
        star.addEventListener('mouseenter', starStruck)
        star.addEventListener('click', updateRank)
    })


    let partnerOptions = document.querySelectorAll('.select__option');
    partnerOptions.forEach(partner => partner.addEventListener('click', customSelect))


    function customSelect(e) {
        let id = e.target.getAttribute('id');
        if(!id) return;
        let selected = document.querySelector('.select__selected')
        let tabs = document.querySelectorAll('.viewliked__tab')
        tabs.forEach(tab => tab.classList.remove('--active'));
        tabs[1].classList.add('--active')
        document.querySelectorAll('.viewliked__window').forEach(window => window.classList.remove("viewliked__active"))
        document.querySelector('#window2').classList.add("viewliked__active")
        let combopartner = document.querySelector('.combo__partner');
        
        combopartner.textContent = e.target.textContent;
        selected.textContent = e.target.textContent;
        let url = `${window.location.origin}/viewliked/combolist?partnerid=${id}`;
        fetch(url)
        .then((resp) => {
            if (resp.status !== 200) {
                console.log(`Error ${resp.text()}`);
                return;
            }
            return resp.json();
        })
        .then((data) => {
            populateTable(data);
        });
    }

    function populateTable(data) {
        let tables = document.querySelectorAll('.combo__table');
        let ftable =tables[0]
        let ftbody = ftable.querySelector('tbody');
        let mtable = tables[1]
        let mtbody = mtable.querySelector('tbody');
        while(ftbody.firstChild)
            ftbody.removeChild(ftbody.firstChild);
        while(mtbody.firstChild)
            mtbody.removeChild(mtbody.firstChild);
        for (const [key, rank] of Object.entries(data)) {
            info = key.split('-')
            let name = info[0]
            let id = info[1]
            let gender = info[2];
            let row = document.createElement('tr');
            row.classList.add('combo__row')
            let td = document.createElement('td');
            td.setAttribute('id',id);
            td.appendChild(document.createTextNode(name))
            row.appendChild(td)

            let startd = document.createElement('td');
            startd.classList.add('gender__rank');
            startd.appendChild(document.createTextNode(rank))
            row.appendChild(startd)

            let ops = document.createElement('td');
            ops.classList.add('combo__operations')
            ops.appendChild(document.createTextNode("X - X"));
            row.appendChild(ops)
            if(gender == 1)
                ftbody.appendChild(row)
            if(gender == 0)
                mtbody.appendChild(row)
            starConvertSingleRow(row);
          }
        
        
    }



    function updateRank(e) {
        let grandpapa = e.target.parentNode.parentNode
        let parent = e.target.parentNode;
        let nametd = grandpapa.querySelector('.gender__name');
        let id = nametd.getAttribute('id');
        let currank = parent.classList[0]
        let stars = parent.querySelectorAll('.filled');
        let rank = stars[stars.length - 1].classList[4].split('-')[1];
        parent.classList.remove(currank)
        parent.classList.remove("gender__rank")
        parent.classList.add(`rank${rank}`);
        parent.classList.add('gender__rank')
        sendUpdateRating(id, rank)

    }
    function starStruck(e) {
        let parent = e.target.parentNode;
        let rankclass = e.target.classList[4];
        let targetrank = parseInt(rankclass.split('-')[1])
        let starcluster = parent.querySelectorAll('.gender__rankstar');
        starcluster.forEach(cstar => {
            let cstarclass = cstar.classList[4];
            let cstarrank = parseInt(cstarclass.split('-')[1])
            if (cstarrank <= targetrank) {
                cstar.classList.remove('far')
                cstar.classList.remove(cstarclass)
                cstar.classList.remove('empty')
                cstar.classList.add('filled')
                cstar.classList.add('fas')
                cstar.classList.add(cstarclass)
            }
            else {
                cstar.classList.add('empty')
                cstar.classList.remove('filled')
                cstar.classList.remove('fas')
                cstar.classList.remove(cstarclass)
                cstar.classList.add('far')
                cstar.classList.add(cstarclass)
            }
        })

    }
    function starConvertRow(e) {
        let rank = e.target.querySelector('.gender__rank')
        let maxrank = parseInt(rank.classList[0].split('rank')[1]);
        for (let i = 0; i < rank.children.length; i++) {
            let childclass = rank.children[i].classList[4];
            let childrank = parseInt(childclass.split('-')[1])
            if (maxrank == 0) {
                rank.children[i].classList.remove('fas')
                rank.children[i].classList.remove(childclass)
                rank.children[i].classList.remove("filled")
                rank.children[i].classList.add('empty')
                rank.children[i].classList.add('far')
                rank.children[i].classList.add(childclass)
            }
            if (childrank <= maxrank) {
                rank.children[i].classList.remove('far')
                rank.children[i].classList.remove(childclass)
                rank.children[i].classList.add('fas')
                rank.children[i].classList.add(childclass)
            }
            if (childrank > maxrank) {
                rank.children[i].classList.remove('fas')
                rank.children[i].classList.remove(childclass)
                rank.children[i].classList.add('far')
                rank.children[i].classList.add(childclass)
            }

        }
    }

    function initStarConversion() {
        let ranks = document.querySelectorAll('.gender__rank');
        ranks.forEach(rank => {
            let value = parseInt(rank.textContent);
            while (rank.firstChild)
                rank.removeChild(rank.firstChild);
            for (let i = 1; i < 6; i++) {
                if (i <= value)
                    rank.appendChild(createFilledStar(i))
                else
                    rank.appendChild(createEmptyStar(i));
            }
        })

    }

    function starConvertSingleRow(row){
        let ranks = row.querySelectorAll('.gender__rank');
        ranks.forEach(rank => {
            let value = parseInt(rank.textContent);
            while (rank.firstChild)
                rank.removeChild(rank.firstChild);
            for (let i = 1; i < 6; i++) {
                if (i <= value)
                    rank.appendChild(createFilledStar(i))
                else
                    rank.appendChild(createEmptyStar(i));
            }
        })

    }
    function createEmptyStar(rank) {
        let star = document.createElement('i');
        star.classList.add('far');
        star.classList.add('fa-star')
        star.classList.add('gender__rankstar')
        star.classList.add('empty')
        if (rank)
            star.classList.add(`starrank-${rank}`)
        return star;
    }
    function createFilledStar(rank) {
        let star = document.createElement('i');
        star.classList.add('fas');
        star.classList.add('fa-star')
        star.classList.add('gender__rankstar')
        star.classList.add('filled')
        if (rank)
            star.classList.add(`starrank-${rank}`)
        return star;
    }

    function openWindow(e) {
        if (!e.target.getAttribute('id').includes('tab')) return;
        let tabno = e.target.getAttribute('id');
        tabs.forEach(tab => tab.classList.remove('--active'));
        e.target.classList.add('--active')
        let views = document.querySelectorAll('.viewliked__window');    
        let no = tabno.split('tab')[1];
        if(parseInt(no)===2) return;
        views.forEach(view => view.classList.remove('viewliked__active'))
        let window = `window${no}`;
        document.getElementById(window).classList.add('viewliked__active')
        document.querySelector('.select__selected').textContent = "Velja"
    
    }

    function sendUpdateRating(id, rating) {
        let url = `${window.location.origin}/viewliked/updaterating?id=${id}&rating=${rating}`;
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.log(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
            .then((data) => {
                console.log(data)
            });
    }

})