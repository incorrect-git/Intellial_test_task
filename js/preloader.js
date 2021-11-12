class Preloader {
    constructor(){
        this.spinnerBlock = document.getElementById('preloader');
        this.numbLoad = 0;
        this.loaded = 0;
        this.error = 0;
    }

    init({  }) {
        const listScripts = [
            "js/language.js",
            "js/printerText.js",
            "js/index.js"
        ]
        this.numbLoad = listScripts.length;
        new LoaderScripts()
            .init({ 
                arrUrl: listScripts,
                loaded: this.loadedScript.bind(this),
                error: this.errorLoadedScript.bind(this)
            })
            .load()

    }

    checkLoad(){
        if (this.loaded >= this.numbLoad) {
            setTimeout(() => {
                this.close();
            }, 1000);
                new ChangeLanguage().change();
                new Scroller().scroller();
                new Scroller().init();
        }

        if (this.error != 0) {
            this.spinnerBlock.classList.add('error_loaded');
            new TextPrinter().init({
                selector: "#preloader #error_loaded_msg",
                text: new ControllLanguage().getText({
                    type: 'value',
                    text: 'error_loaded',
                    speed: 10
                })
            }).play();
        }
    }

    loadedScript(){
        this.loaded += 1;
        this.checkLoad();
    }
    errorLoadedScript(){
        this.error += 1;
        this.checkLoad();
    }

    open(){
        this.spinnerBlock.classList.remove('close');
        this.spinnerBlock.classList.add('open');
    }

    close(){
        this.spinnerBlock.classList.remove('open');
        this.spinnerBlock.classList.add('close');
    }
}

class LoaderScripts {
    constructor(){

    }

    init({ url, arrUrl, loaded, error }){
        this.url = url;
        this.arrUrl = arrUrl;
        this.loadedCallback = loaded;
        this.errorCallback = error;
        return this;
    }

    async load(){

        if (this.url) {
            this.createElement(this.url);
        }
        else if (this.arrUrl) {
            this.indexQueue = 0;
            this.loadAsync();
        }

    }

    async loadAsync(){
        if (this.indexQueue >= this.arrUrl.length)
            return false;
        const resultLoad = await this.createElement(this.arrUrl[this.indexQueue]);
        if (resultLoad){
            this.loadedCallback();
            this.indexQueue++;
            this.loadAsync();

        }
    }

    async createElement(url){
        return await new Promise((res, rej) => {
            const scriptBlock = document.createElement('script');
            scriptBlock.src = url;

            scriptBlock.onload = function () {
                res(true);
            };
            scriptBlock.onerror = this.errorCallback;
            document.head.appendChild(scriptBlock);
        })
    }
}

new Preloader().init({});