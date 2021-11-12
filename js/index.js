class ControllCookie {
    
    constructor (){

    }

    get({ key, value } = {}){
        let list = new Map();
        let listCookie = document.cookie.split(';');
        
        for (let index in listCookie){
            let ls = listCookie[index].split('=');
            list.set(ls[0].trim(), ls[1].trim());
        }

        return list.get(key);
    }

    set({ key, value, arrCookie }){
        if (key && value)
            document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        else if (arrCookie) {
            for (let index in arrCookie){
                document.cookie = `${encodeURIComponent(index)}=${encodeURIComponent(arrCookie[index])}`;
            }
        }
        
        return this;
    }

}


class ChangeLanguage {
    constructor(){
        this.language;
    }

    change (lang){
        const newLang = lang || new ControllCookie().get({
            key: 'language'
        }) || 'ru';
            
        if (lang) {
            new ControllCookie().set({ 
                key: 'language', 
                value: newLang 
            });
        }
        this.language = newLang; 
        document.documentElement.setAttribute("lang", this.language)
        
        this.changeHeader();
        this.changeGeneralInfo();
        this.changeWorkExp();
        this.changeEducation();
        this.changeSkills();
        new TextPrinter().printAllText();
    }

    changeHeader(){
        document.querySelector('.name_user')
            .textContent = new ControllLanguage().getText({
                type: 'value',
                text: 'name',
                lang: this.language
            });
        document.querySelector('.position_user.first')
                .textContent = new ControllLanguage().getText({
                        type: 'value',
                        text: 'position1',
                        lang: this.language
                    });
                    
        document.querySelector('.position_user.second')
                .textContent = new ControllLanguage().getText({
                        type: 'value',
                        text: 'position2',
                        lang: this.language
                    });
    }
    changeWorkExp() {
        
        const listWork = new ControllLanguage().getText({
            type: 'work_list',
            lang: this.language
        })

        let mainElement = document.querySelector('#work_exp .content');
        mainElement.innerHTML = '';
        
        for (let index in listWork){
            let section = new GenereateElement().general({
                nameElemen: 'section'
            })
            let nameWork = new GenereateElement().general({
                nameElemen: 'h4'
            })
            nameWork.textContent = listWork[index].name;
            let role = new GenereateElement().general({
                nameElemen: 'h5'
            })
            role.textContent = new ControllLanguage().getText({
                type: 'headers',
                text: 'role'
            })+': '+listWork[index].role;
            let respb = new GenereateElement().general({
                nameElemen: 'h5'
            })
            respb.textContent = new ControllLanguage().getText({
                type: 'headers',
                text: 'responsibilities'
            })+': '; 

            section.appendChild(nameWork);
            section.appendChild(role);
            section.appendChild(respb);

            const ul = new GenereateElement().general({
                nameElemen: 'ul'
            })
            for (let iWork in listWork[index].resp){
                const li = new GenereateElement().general({
                    nameElemen: 'li'
                })
                li.textContent = listWork[index].resp[iWork];
                ul.appendChild(li); 
            }  
            section.appendChild(ul)
                
            mainElement.appendChild(section);

        }
        
        
    }
    changeEducation() {
        const listEducation = new ControllLanguage().getText({
            type: 'education_list',
            lang: this.language
        })

        let mainElement = document.querySelector('#education .content');
        mainElement.innerHTML = '';
        
        for (let index in listEducation){
            const p = new GenereateElement().general({
                nameElemen: 'p'
            })
            p.textContent = listEducation[index];
            mainElement.appendChild(p);
        }

    }
    changeGeneralInfo(){
        document.querySelector('.phone_user')
            .textContent = new ControllLanguage().getText({
                type: 'headers',
                text: 'phone',
                lang: this.language
            }) + ': ' + new ControllLanguage().getText({
                type: 'value',
                text: 'phone',
                lang: this.language
            });
        document.querySelector('.email_user')
            .textContent = new ControllLanguage().getText({
                type: 'headers',
                text: 'email',
                lang: this.language
            }) + ': ' + new ControllLanguage().getText({
                type: 'value',
                text: 'email',
                lang: this.language
            });
        document.querySelector('.birthday_user')
            .textContent = new ControllLanguage().getText({
                type: 'headers',
                text: 'birthday',
                lang: this.language
            }) + ': ' + new ControllLanguage().getText({
                type: 'value',
                text: 'birthday',
                lang: this.language
            });
    }
    changeSkills(){
        const listDevOpsSkills = new ControllLanguage().getText({
            type: 'skills',
            text: 'devops',
            lang: this.language
        })
        const listWebSkills = new ControllLanguage().getText({
            type: 'skills',
            text: 'web',
            lang: this.language
        })

        let mainElement = document.querySelector('#skills .content');
        mainElement.innerHTML = '';
        
        let headerDevOps = new GenereateElement().general({
            nameElemen: 'h4'
        })
        headerDevOps.textContent = 'DevOps';
        let headerWeb = new GenereateElement().general({
            nameElemen: 'h4'
        })
        headerWeb.textContent = 'Web Developer';
        let sectionWeb = new GenereateElement().general({
            nameElemen: 'section'
        })
        let sectionDevOps = new GenereateElement().general({
            nameElemen: 'section'
        })

        sectionWeb.appendChild(headerWeb);
        sectionDevOps.appendChild(headerDevOps);

        const ulDevOps = new GenereateElement().general({ nameElemen: 'ul' })
        const ulWeb = new GenereateElement().general({ nameElemen: 'ul' })
        for (let index in listDevOpsSkills) {
            const li = new GenereateElement().general({
                nameElemen: 'li'
            });
            li.textContent = listDevOpsSkills[index];
            ulDevOps.appendChild(li);
        }

        for (let index in listWebSkills) {
            const li = new GenereateElement().general({
                nameElemen: 'li'
            });
            li.textContent = listWebSkills[index];
            ulWeb.appendChild(li);
        }

        sectionDevOps.appendChild(ulDevOps);
        sectionWeb.appendChild(ulWeb);
        mainElement.appendChild(sectionDevOps);
        mainElement.appendChild(sectionWeb);
    }
}

class Scroller {
    constructor() {
        this.isScrolling = false;
    }

    init(){
        this.init_event_scroll();
    }

    init_event_scroll(){
        let _this = this;
        document.addEventListener('scroll', function (e){
            if (!_this.isScrolling) {
                window.requestAnimationFrame(() => {
                    _this.isScrolling = false;
                    _this.scroller();
                });
            }
            _this.isScrolling = true;
        });
    }

    listSection () {

        return document.querySelectorAll("main section");
        
    }

    scroller () {

        let listItems = this.listSection();
        let listMenuNavDesk = document.querySelectorAll("header #header__up_menu_section nav.up_menu ul li");
        let listMenuNavMobile = document.querySelectorAll("header #header__burger_section nav ul li");
        
        for (let index in listItems) {
            if (index < listItems.length) {
                if (this.isVisible(listItems[index])) {
                    if (!listItems[index].classList.contains('active')){
                        
                        listItems[index].classList.add('active');
                        
                        if (listItems[index].id){
                            new TextPrinter().printText(`main article section#${listItems[index].id} content p`);
                        }
                    }
                }
                
                this.header_fixed();
            }
        }
        
    }

    isVisible (el) {

        const elem = el.getBoundingClientRect();

        return (elem.top + 80 >= 0) && (elem.height/3 + window.innerHeight >= elem.bottom) 
    }

    isVisibleSection (el) {

        const elem = el.getBoundingClientRect();
        return ((elem.top + elem.height >= 0) && (elem.height + window.innerHeight >= elem.bottom));
    }

    header_fixed (){

        let header = document.querySelector('header');
        let main = document.querySelector('main');
        let position = header.getBoundingClientRect();
        if (!header.classList.contains('fixed_header') && !this.isVisible(header)){
            header.classList.add('fixed_header');
            main.classList.add('header_is_fixed')
        }
        else if (window.pageYOffset <= 0) {
            header.classList.remove('fixed_header');
            main.classList.remove('header_is_fixed');
        }
        
    }
}

const listMainMenu = [
    { title: new ControllLanguage().getText({ type: 'menu', text: 'general' }), link: '#general' },
    { title: new ControllLanguage().getText({ type: 'menu', text: 'expirience' }), link: '#work_exp' },
    { title: new ControllLanguage().getText({ type: 'menu', text: 'education' }), link: '#education' },
    { title: new ControllLanguage().getText({ type: 'menu', text: 'skills' }), link: '#skills' },
]

class GenerateMenu {
    constructor(){
        
    }

    init({
        list,
        mainElement
    }) {

        this.mainElement = mainElement;
        this.list = listMainMenu || list;

        return this;
    }

    generate() {

        let createElUl = new GenereateElement().general({ nameElemen: 'ul' });;
        for (let index in this.list) {
            let elemLi = new GenereateElement().general({ nameElemen: 'li' });
            let link = new GenereateElement().link({ name: this.list[index].title, link: `${this.list[index].link}_anchor` });
            elemLi.appendChild(link);
            createElUl.appendChild(elemLi);
        }
        this.mainElement.appendChild(createElUl);

    }

    generateLi () {
        let createLi = document.createElement('li');

        return createLi;
    }

    generateLink ({ name, link }) {
        let createLink = document.createElement('a');
        createLink.href = link;
        createLink.textContent = name;
        return createLink;
    }
}

class GenereateElement {
    constructor(){

    }

    link({ name, link }){
        let createLink = document.createElement('a');
        createLink.href = link;
        createLink.textContent = name;
        return createLink;
    }

    general ({ nameElemen }){
        return document.createElement(nameElemen);
    }

    li () {
        let createLi = document.createElement('li');

        return createLi;
    }
    
    ul () {
        let createLi = document.createElement('li');

        return createLi;
    }
}

new GenerateMenu().init({
    mainElement: document.querySelector('.up_menu'),
}).generate();
new GenerateMenu().init({
    mainElement: document.querySelector('div#burger nav'),
}).generate();

document.querySelector('#burger_button').onclick = function (e) {
    let button = document.querySelector('#burger_button');
    let menu = document.querySelector('div#burger nav'); 

    if (button.classList.contains('opened')){
        button.classList.remove('opened');
        menu.classList.remove('opened');
    }
    else{
        button.classList.add('opened');
        menu.classList.add('opened');
    }
}

document.querySelector('nav.lang_changer a#ru').onclick = preChanhed;
document.querySelector('nav.lang_changer a#en').onclick = preChanhed;
document.querySelector('nav.lang_changer a#uk').onclick = preChanhed;


const listLinkAnchor = document.querySelectorAll('section[id^="header__"] a[href*="#"]');

for (let iAnchor of listLinkAnchor){
    iAnchor.addEventListener('click', function (e){
        e.preventDefault();
        
        document.querySelector(iAnchor.getAttribute('href'))
                .scrollIntoView({
                    behavior: 'smooth',
                    alingToTop: true
                });
    })
}

function preChanhed(e){
    e.preventDefault();
    new ChangeLanguage().change(e.target.id || e.srcElement.id);
}
