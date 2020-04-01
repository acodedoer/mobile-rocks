var wordscountdown = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function wordscountdown ()
    {
        Phaser.Scene.call(this, { key: 'wordscountdown' });
    },

    create: function ()
    {   
        this.count = 0;
        //this.words = this.getWords();
        this.words = ['bas'];
        this.btn_letter_holder = [];
        this.btn_word_holder = [];
        this.letters = [];
        this.btn_selected = false;
        this.selected_letter = "";
        this.selected_index = "";
        this.lookup_btn = new Object();
        this.lettersscanned = 0;
        this.second_counter = 600;
        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        this.button_scan = new ButtonFunction({scene:this,x:window.innerWidth/2,y:window.innerHeight-5, sprite:'button_scan', function:this.classifyImage}).setScale(this.game.global.scaler).setOrigin(0.5,1);
        this.nextChallenge();
        this.countSec()
        this.timerText = this.add.text(window.innerWidth-5, 5, '1:00', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(1,0).setAlign('center');
        this.score_text = this.add.text(window.innerWidth/2, 5, '0', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(1,0).setAlign('center');
        this.answerbox = []
    },

    getWords: function () {
        let words = this.shuffle(words_hard).slice(0,3)
        words.unshift(this.shuffle(words_easy)[0])
        console.log(words)
        return words;
    },

    countSec: function(){
        this.time.delayedCall(1000, this.countDown, [], this);
    },

    countDown: function() {
        this.second_counter--;
        if(this.second_counter>=0){
            this.timerText.setText(Math.floor(this.second_counter/60)+':' + (this.second_counter%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
            this.countSec()
        }
        else{
           this.gameOver();
        }  
    },

    addTime: function() {
        this.second_counter+=60;
    },

    gameOver: function(){
        window.localStorage.setItem('wordscountdownscore', this.count);
        if(window.localStorage.getItem('wordscountdownbestscore')<=this.count){
            window.localStorage.setItem('wordscountdownbestscore', this.count);
        };
        CameraPreview.hide()
        this.scene.start('wordscountdowngameover')
    },

    classifyImage: async function(){
        this.classified = await takePictureAndClassify()
        console.log(this.classified[0].label)
        this.scene.letterFound(this.classified[0].label)
    },

    nextChallenge: function(){
        this.button_scan.visible=true;
        this.word = this.words[this.count];
        this.letters = this.shuffle(this.word.split(''))
        this.displayLetters(this.letters)
        this.setWordHolders()
        setupCamera('top');
        this.disableLetters()
        this.hideWord();
        this.time.delayedCall(2000, this.allLettersScanned, [], this);

    },

    allLettersScanned: function(){
        this.enableLetters()
        this.showWord()
        CameraPreview.hide()
    },

    disableLetters: function(){
        this.btn_letter_holder.forEach(btn =>{
            btn.input.enabled = false;
        })
    },

    enableLetters: function(){
        this.btn_letter_holder.forEach(btn =>{
            btn.input.enabled = true;
        })
    },

    hideWord: function(){
        this.btn_confirm.visible = false;
        this.btn_delete.visible = false;
        this.btn_word_holder.forEach(btn=>{
            btn.visible = false;
        })
    },

    showWord: function(){
        this.btn_confirm.visible = true;
        this.btn_delete.visible = true;
        this.btn_word_holder.forEach(btn=>{
            btn.visible = true;
        })
    },

    prepareNextChallenge: function(){
        this.lettersscanned = 0;
        if(this.count<this.words.length-1)
        {
            this.addTime()
            this.count+=1;
            this.btn_letter_holder.forEach(btn => {
                btn.destroyBtn();
            });
            this.btn_word_holder.forEach(btn => {
                btn.destroyBtn();
            });
            this.btn_letter_holder.length = 0
            this.btn_word_holder.length = 0
            this.btn_confirm.destroyBtn()
            this.btn_delete.destroyBtn()
            this.score_text.setText(this.count)
        }
        else{
            this.toHome()
        }    
    },

    displayLetters: function(letters) { 
        if(letters.length==3){
            this.displayThree('top',0, letters);
        }
        else if( letters.length == 4){
            this.displayTwo('top',0,letters.slice(0, 2));
            this.displayTwo('bottom',2,letters.slice(2, 4));
        }
        else if( letters.length == 5){
            this.displayTwo('top',0,letters.slice(0, 2));
            this.displayThree('bottom',2,letters.slice(2, 5),true);
        }
        else if( letters.length == 6){
            this.displayThree('top',0,letters.slice(0, 3));
            this.displayThree('bottom',3,letters.slice(3, 6));
        }
    },

    displayTwo: function (pos,index,letters){
        let vertical_pos = (window.innerHeight* 2/3) - (400*this.game.global.scaler)
        let start = window.innerWidth/2-(200*this.game.global.scaler);
        let mul = 0;
        if (pos =="bottom"){
            vertical_pos = window.innerHeight * 2/3
            mul = 2;
        }
        for (let i =0; i<2; i++){
            this.btn_letter_holder[index] = new LetterHolder({scene:this,x:start,y:vertical_pos,letter:letters[i]}).setScale(this.game.global.scaler).setOrigin(0.5);
            this.lookup_btn[letters[i]] = i+mul;
            this.btn_letter_holder[index].on('pointerdown',function(){
                console.log("b4 locked: ",this.btn_letter_holder[i+mul].locked)
                console.log("b4 btn selected: ",this.btn_letter_holder[i+mul].isSelected())
                console.log("b4 selected: ",this.btn_selected)
                console.log("b4 letter: ",this.selected_letter)
                if(this.btn_letter_holder[i+mul].locked == false){
                    if(this.btn_selected == false){
                        this.btn_letter_holder[i+mul].setSelected();
                        this.selected_letter = this.btn_letter_holder[i+mul].getLetter();
                        this.selected_index = i+mul;
                        this.btn_selected = true;
                    }
                    else if(this.btn_letter_holder[i+mul].isSelected()==true){
                        this.btn_letter_holder[i+mul].unSelect()
                        this.btn_selected = false;
                        this.selected_letter = "";
                    }
                    console.log("then locked: ",this.btn_letter_holder[i+mul].locked)
                    console.log("then btn selected: ",this.btn_letter_holder[i+mul].isSelected())
                    console.log("then selected: ",this.btn_selected)
                    console.log("then letter: ",this.selected_letter)     
                    console.log("") 
            }}, this );
            start+= 400*this.game.global.scaler
            index+=1;
        }
    },

    displayThree: function (pos,index,letters,fiveletterword){
        let vertical_pos = (window.innerHeight* 2/3) - (400*this.game.global.scaler)
        let start = window.innerWidth/2-(400*this.game.global.scaler);
        let mul = 0;
        if (pos =="bottom"){
            vertical_pos = window.innerHeight * 2/3
            mul=3;
            if(fiveletterword==true){
                mul=2;
            }
        }
        for (let i =0; i<3; i++){
            this.btn_letter_holder[index] = new LetterHolder({scene:this,x:start,y:vertical_pos,letter:letters[i]}).setScale(this.game.global.scaler).setOrigin(0.5);
            this.lookup_btn[letters[i]] = i+mul;
            this.btn_letter_holder[index].on('pointerdown',function(){
                if(this.btn_letter_holder[i+mul].locked == false){
                    if(this.btn_selected == false){
                        this.btn_letter_holder[i+mul].setSelected();
                        this.selected_letter = this.btn_letter_holder[i+mul].getLetter();
                        this.selected_index = i+mul;
                        this.btn_selected = true;
                        console.log("selecting")
                    }
                    else if(this.btn_letter_holder[i+mul].isSelected()==true){
                        this.btn_letter_holder[i+mul].unSelect()
                        this.btn_selected = false;
                        this.selected_letter = "";
                        console.log("unselecting")
                    }
        }}, this );
            start+= 400*this.game.global.scaler
            index+=1;
        }
    },

    setWordHolders:function () {
        let vertical_pos = window.innerHeight/3 - 300*this.game.global.scaler;
        let horizontal_pos = window.innerWidth/2 - ((this.letters.length/2 - 0.5) *220*this.game.global.scaler);
        for(let i =0; i<this.letters.length; i++){
            this.btn_word_holder[i] = new WordHolder({scene:this,x:horizontal_pos,y:vertical_pos}).setScale(this.game.global.scaler).setOrigin(0.5);
            this.btn_word_holder[i].on('pointerdown',function(){
                if(this.selected_letter!=""){
                    if(this.btn_word_holder[i].getLetter()!=""){
                        let old_letter = this.btn_word_holder[i].getLetter();
                        this.unAdd(old_letter)
                    }
                    this.btn_word_holder[i].setLetter(this.selected_letter); 
                    this.btn_selected=false; 
                    this.letter=""; 
                    this.btn_letter_holder[this.selected_index].unSelect();
                    this.btn_letter_holder[this.selected_index].isAdded();
                    this.selected_letter=""; 
                    this.selected_index=""}
                }, 
            this)
            horizontal_pos+=220*this.game.global.scaler
        }
        this.btn_delete = new ButtonFunction({scene:this,x:window.innerWidth/4,y:window.innerHeight/3, sprite:'button_clear', function:this.unAddAll}).setScale(this.game.global.scaler).setOrigin(0.5,1);
        this.btn_confirm= new ButtonFunction({scene:this,x:window.innerWidth* 3/4,y:window.innerHeight/3, sprite:'button_confirm', function:this.checkWord}).setScale(this.game.global.scaler).setOrigin(0.5,1);
    },

    unAdd: function(l){
        let index = this.lookup_btn[l];     
        this.btn_letter_holder[index].unAdd();
    },

    unAddAll: function(){
        for(let i = 0; i<this.scene.letters.length; i++){
            this.scene.btn_word_holder[i].removeLetter()
            let index = this.scene.lookup_btn[this.scene.letters[i]];
            this.scene.btn_letter_holder[index].unAdd();
        }
    },

    checkWord: function(){
        let word=''
        this.scene.btn_word_holder.forEach(btn => {
            word+=btn.getLetter()
        });
        if(this.scene.words.includes(word)){
            this.scene.prepareNextChallenge()
            this.scene.nextChallenge()
        }
        else {console.log('false')}
    },

    checkFound: function(){
        let letter = this.classified[0].label
        for(let i=0; i<this.word.length; i++){
            if(this.btn_letter_holder_letter[i].text==letter && this.letters.includes(letter)){
                this.btn_letter_holder[i].setFillStyle(0x53B3CB,1)
                this.letters.splice(this.letters.indexOf(letter), 1 );
                break
            }
        }

        if(this.letters.length==0){
            this.makeLettersInteractive();
        }
    },

    toHome: function()
    {
        CameraPreview.stopCamera();
        this.scene.start("mainmenu")
    },

    shuffle: function(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;

    },

    letterFound: function(letter){
        let found=false
        for(let i=0; i<this.btn_letter_holder.length; i++)
            if(this.btn_letter_holder[i].getLetter()==letter && this.btn_letter_holder[i].getScanned() == false){
                this.btn_letter_holder[i].setScanned();
                found = true
                this.lettersscanned+=1;
                break;
            }
            if(found==false){
                console.log("oops")
            }
            console.log(this.lettersscanned,":",this.letters.length)
            if(this.lettersscanned==this.letters.length){
                this.allLettersScanned()
            }
    }
});