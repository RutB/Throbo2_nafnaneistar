
document.addEventListener('DOMContentLoaded', () => {

    let tabs = document.querySelectorAll('.viewliked__tab');

    for (const t of tabs) {
        t.addEventListener('click', openWindow);
    }
    initStarConversion();

    let window3 = document.querySelector('#window3');
    let gender_button = window3.querySelector('.gender__sortTable');
    gender_button.addEventListener('click',()=> {
        document.querySelector('body').appendChild(createTableLoader("Endurraða Töflu...",true))
    })

    let rows = document.querySelectorAll('.gender__row');
    rows.forEach(row => row.addEventListener('mouseleave', starConvertRow));

    let stars = window3.querySelectorAll('.gender__rankstar');
    stars.forEach(star => {
        star.addEventListener('mouseenter', starStruck)
        star.addEventListener('click', updateRank)
    })

    let window5 = document.querySelector("#window5")
    let nameButtons = window5.querySelectorAll('.viewliked__nameButton');
    nameButtons.forEach(nb => nb.addEventListener('click', createRandomName))

    let removeButtons = document.querySelectorAll('.gender__removeName');
    removeButtons.forEach(button => button.addEventListener('click', removeNameFromList))

    let tab2 = document.querySelector('#tab2')
    let partnerOptions = tab2.querySelectorAll('.select__option');
    partnerOptions.forEach(partner => partner.addEventListener('click', customSelect))

    let tab4 = document.querySelector("#tab4");
    let rankSelect = tab4.querySelectorAll('.select__option');;
    rankSelect.forEach(select => select.addEventListener('click', initRankSelect))

    function createRandomName(e) {
        let result = document.querySelector('.viewliked__nameResult')
        let radioButtons = document.querySelectorAll('.gender__radio');
        let lastname = document.querySelector('#lastname').value
        let gender, middle;
        radioButtons.forEach(rb => {
            if (rb.checked)
                gender = (rb.getAttribute('id') === "female") ? 1 : 0;
        });
        if (e.target.textContent.toLowerCase().includes('millinafn'))
            middle = true
        let url = (middle) ? `${window.location.origin}/viewliked/namemaker?middle=${middle}&gender=${gender}` : `${window.location.origin}/viewliked/namemaker?gender=${gender}`;
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
            .then((data) => {
                let name = ""
                data.forEach(d => {
                    if (d !== "")
                        name += d;
                })
                name += " " + lastname;
                result.textContent = name
            });
    }

    function removeNameFromList(e) {
        let w3 = document.querySelector('#window3')
        let grandpapa = e.target.parentNode.parentNode; //row
        let id = grandpapa.getAttribute('id');
        let url = `${window.location.origin}/viewliked/remove?id=${id}`;
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
            .then((data) => {
                if (data)
                    grandpapa.remove();
                let rows = w3.querySelectorAll('.gender__row');
                for (let row of rows) {
                    if (parseInt(row.getAttribute('id')) === parseInt(id)) {
                        row.remove();
                        break;
                    }
                }
            })
    }

    function customSelect(e) {
        let id = e.target.getAttribute('id');

        if (!id) return;
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
        let tables = document.querySelectorAll('.combo__table');
        clearTable(0, tables)
        clearTable(1, tables)
        document.querySelector('main').appendChild(createTableLoader("Sæki og sortera töflu..."))
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
            .then((data) => {
                let tables = document.querySelectorAll('.combo__table');
                removeTableLoader();
                populateTable(data, tables);
            });
    }

    function el(tag, className, text = null) {
        let element = document.createElement(tag)
        if (className) {
            let classes = className.split(' ');
            classes.forEach(c => element.classList.add(c))
        }
        if (text)
            element.appendChild(document.createTextNode(text))
        return element;
    }

    function clearTable(gender, tables) {
        let table = tables[gender]
        let tbody = table.querySelector('tbody');
        while (tbody.firstChild)
            tbody.removeChild(tbody.firstChild);
        return tbody;
    }

    function populateTable(data, tables) {
        let ftbody = clearTable(0, tables)
        let mtbody = clearTable(1, tables)
        for (const [key, rank] of Object.entries(data)) {
            info = key.split('-')
            
            let name = info[0]
            let id = info[1]
            let gender = info[2];
            let row = el('tr', 'combo__row');
            let td = el('td', null, name);
            row.setAttribute('id', id);
            row.appendChild(td)

            let startd = el('td', 'gender__rank');
            startd.appendChild(document.createTextNode(rank))
            row.appendChild(startd)

            let ops = el('td', 'combo__operations');
            let bt = el('button', 'gender__removeName')

            bt.addEventListener('click', removeNameFromList)
            bt.appendChild(document.createTextNode("Taka af Lista"))
            ops.appendChild(bt);
            row.appendChild(ops)
            if (gender == 1)
                ftbody.appendChild(row)
            if (gender == 0)
                mtbody.appendChild(row)
            starConvertSingleRow(row);
        }
    }

    function updateRank(e) {
        let grandpapa = e.target.parentNode.parentNode
        let parent = e.target.parentNode;
        let id = grandpapa.getAttribute('id');
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

    function starConvertSingleRow(row) {
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
        let star = el('i', 'far fa-star gender__rankstar empty')
        if (rank)
            star.classList.add(`starrank-${rank}`)
        return star;
    }
    function createFilledStar(rank) {
        let star = el('i', 'fas fa-star gender__rankstar filled')
        if (rank)
            star.classList.add(`starrank-${rank}`)
        return star;
    }
    function initRankSelect(e) {
        let target = e.target;
        let grandpapa = target.parentNode
        let grandgranpapa = grandpapa.parentNode;
        let id = null;
        if (target.getAttribute('id') !== null) {
            if (target.getAttribute('id').includes('rank'))
                id = target.getAttribute('id').split('rank')[1]
        }
        else if (grandgranpapa.getAttribute('id') !== null) {
            if (grandgranpapa.getAttribute('id').includes('rank'))
                id = grandgranpapa.getAttribute('id').split('rank')[1]

        }
        else if (grandgranpapa.getAttribute('id') !== null) {
            if (grandgranpapa.getAttribute('id').includes('rank'))
                id = grandgranpapa.getAttribute('id').split('rank')[1]
        }
        if (id !== null)
            showTopList(id)
    }

    function showTopList(id) {
        tabs.forEach(tab => tab.classList.remove('--active'));
        let gender__rank = document.querySelector('.rating__title');
        let ranks = gender__rank.querySelector('.gender__rank');
        tabs[3].classList.add('--active')
        document.querySelectorAll('.viewliked__window').forEach(window => window.classList.remove("viewliked__active"))
        document.querySelector('#window4').classList.add("viewliked__active")
        let url = `${window.location.origin}/viewliked/getrankedList?id=${id}`;
        ranks.textContent = id
        starConvertSingleRow(gender__rank)
        document.querySelector('main').appendChild(createTableLoader("Sæki og sortera töflu..."))
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
            .then((data) => {
                removeTableLoader();
                let tables = document.querySelectorAll('.rating__table');
                populateTable(data, tables);
                tables.forEach(t => sortTable(t))
                
            });
    }

    function openWindow(e) {
        if (e.target.getAttribute('id') == null) return
        if (!e.target.getAttribute('id').includes('tab')) return;
        let tabno = e.target.getAttribute('id');
        if (tabno === null) return;
        tabs.forEach(tab => tab.classList.remove('--active'));
        e.target.classList.add('--active')
        let views = document.querySelectorAll('.viewliked__window');
        let no = parseInt(tabno.split('tab')[1]);
        if (no === 2 || no === 4) return;

        views.forEach(view => view.classList.remove('viewliked__active'))
        let window = `window${no}`;
        document.getElementById(window).classList.add('viewliked__active')
        document.querySelector('.select__selected').textContent = "Velja"

    }

    function createTableLoader(text,specialFix = false){
        if(specialFix){
            setTimeout(()=> {
                let tables = window3.querySelectorAll('.gender__table')
                tables.forEach(t=> sortMiddleTable(t))
            },1000);
            removeTableLoader();
        }
        let table_loader = el('div','elephant__loader');
        let loading__img = el('div','loading__imgdiv')
        table_loader.appendChild(loading__img);
        let img = el('img','loading__img')
        img.setAttribute('src','/img/fill.gif')
        img.setAttribute('alt',"Walking elephant that represents a loading gif")
        loading__img.appendChild(img)
        let span = el('span','loading__text');
        span.appendChild(document.createTextNode(text))
        table_loader.appendChild(span)
        return table_loader;
    }

    function removeTableLoader(){
        let elephants = document.querySelectorAll('.elephant__loader')
        elephants.forEach(e=> e.remove())
    }
    const sendUpdateRating = (id, rating) => {
        let url = `${window.location.origin}/viewliked/updaterating?id=${id}&rating=${rating}`;
        fetch(url)
            .then((resp) => {
                if (resp.status !== 200) {
                    console.error(`Error ${resp.text()}`);
                    return;
                }
                return resp.json();
            })
    }

    const sortTable = (table) => {
        const LETTERS = `AÁBCDÐEÉFGHIÍJKLMNOÓPRSTUÚVWXYÝZÞÆÖ`
        let rows, x, y, shouldSwitch;
        let switching = true;
        let i;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1, j = 2; i < (rows.length - 1); i++, j++) {
                shouldSwitch = false;
                x = rows[i].querySelector('td');
                y = rows[j].querySelector('td');
                if (LETTERS.indexOf(x.textContent[0].toUpperCase()) > LETTERS.indexOf(y.textContent[0].toUpperCase())) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        removeTableLoader();
    }

    async function sortMiddleTable(table) {
        const LETTERS = `AÁBCDÐEÉFGHIÍJKLMNOÓPRSTUÚVWXYÝZÞÆÖ`
        let rows, x, y, shouldSwitch;
        let switching = true;
        let i;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1, j = 2; i < (rows.length - 1); i++, j++) {
                shouldSwitch = false;
                x = rows[i].querySelector('span');
                y = rows[j].querySelector('span');  
                if (LETTERS.indexOf(x.textContent[0].toUpperCase()) > LETTERS.indexOf(y.textContent[0].toUpperCase())) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        removeTableLoader();
    }

})