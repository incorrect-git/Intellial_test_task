
class TextPrinter {

    constructor (){
        this.isPrinting = false;
        this.isStoped = true;
        this.isPaused = false;
        this.idInterval;
        this.speed = 50;
        this.position = 0;
        this.elem;
    }

    init({
        elem,
        selector, 
        text,
        speed
    }){
        if (selector) 
            this.elem = document.querySelector(selector);
        else if (elem)
            this.elem = elem 

        if (this.elem == undefined){
            console.log('error element');
            return false;
        }
        this.elem.classList.add('printing');
        this.text = text || this.elem.textContent;
        
        this.elem.textContent = '';
        if (speed)
            this.speed = speed;

        return this;
    }

    print () {
        clearInterval(this.idInterval);
        setInterval(() => {
            if (this.position >= this.text.length){
                clearInterval(this.idInterval)
                this.elem.classList.remove('printing');
            }
            else {
                let currentContent = this.elem.textContent;
                this.elem.textContent = currentContent + this.text[this.position];
                this.position++;
            }
        }, this.speed);
    }

    play () {
        this.print();
        return this;
    }

    stop () {
        clearInterval(this.idInterval);
        return this;

    }

    printText (block) {
        let listTextBlock = document.querySelectorAll(block);
                   
        for (let indexTextBlock in listTextBlock) {
            
            if (indexTextBlock < listTextBlock.length) {
                

                const printedText = new TextPrinter().init({
                    elem: listTextBlock[indexTextBlock],
                    text: listTextBlock[indexTextBlock].textContent
                })

                setTimeout(function () {
                    printedText.play();
                }, 1000)
            }

        }
    }

    printAllText (){
        
        this.printHeaderBlock();
        this.printGeneralBlock();
        this.printWorkBlock();
        this.printEducation();
    }

    printHeaderBlock () {
        new TextPrinter().init({
            selector: '.name_user'
        }).play();
        new TextPrinter().init({
            selector: '.position_user.first'
        }).play();
        new TextPrinter().init({
            selector: '.position_user.second'
        }).play();
    }
    printGeneralBlock () {
        new TextPrinter().init({
            selector: '.phone_user'
        }).play();
        new TextPrinter().init({
            selector: '.email_user'
        }).play();
        new TextPrinter().init({
            selector: '.birthday_user'
        }).play();
    }
    printWorkBlock () {
        new TextPrinter().printText('#work_exp .content ul li')
        new TextPrinter().printText('#work_exp .content h4')
        new TextPrinter().printText('#work_exp .content h5')
    }
    printEducation(){
        new TextPrinter().printText('#education .content p')
    }
}