var petrandom = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function petrandom ()
    {
        Phaser.Scene.call(this, { key: 'petrandom' });
    },

    create: function ()
    {   
        this.utilities = new Utilities({scene:this,x:0,y:0});
        this.items = this.utilities.shuffle(["water","flowers","food"])
        this.active = false;
        this.count = 0;
        this.second_counter =0;
        this.current_item= "";
        this.timerText = this.add.text(window.innerWidth-5, 5, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(1,0).setAlign('center');
        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        this.button_scan = new ButtonFunction({scene:this,x:window.innerWidth/2,y:window.innerHeight-5, sprite:'button_scan', function:this.classifyImage}).setScale(this.game.global.scaler).setOrigin(0.5,1);
        this.button_scan.visible = false;
        this.btn_player = this.add.image(window.innerWidth/2, (window.innerHeight/2 + 200*this.game.global.scaler), this.game.global.player_neutral).setOrigin(0.5, 0).setScale(this.game.global.scaler*3);
        this.speech_bubble = new MessageBoard({scene:this, x:window.innerWidth/2, y:this.btn_player.y - (300*this.game.global.scaler), board:"speech_bubble", message:"Hi!"}).setOrigin(0.5).setScale(this.game.global.scaler*3);
        this.start();
    },

    classifyImage: async function(){
        if(this.scene.active == true){
            this.classified = await takePictureAndClassify()
            console.log("clicked")
            console.log(this.classified[0].label)
            if(this.classified[0].label==this.scene.current_item){
                this.scene.active=false;
                this.scene.button_scan.enabled = false;
                this.scene.button_scan.visible = false;
                this.scene.sayThanks();
                CameraPreview.hide()
                this.scene.time.delayedCall(2000, this.scene.hideSpeech, [],this.scene);
                this.scene.time.delayedCall(2000, this.scene.checkDone, [], this.scene);
            }
        }
    },

    countSec: function(){
        if(this.active==true){
        this.time.delayedCall(1000, this.countDown, [], this);}
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

    
    start: function(){
        let time = Math.floor(Math.random()*10)
        this.time.delayedCall(time*2000, this.request, [], this);
    },

    request: function(){
        setupCamera('top');
        if(this.count<3){
            this.showSpeech();
            this.speech_bubble.update(this.items[this.count]);
            this.current_item = this.items[this.count];
        }
        else if (this.count<4){
            this.showSpeech();
            this.speech_bubble.update("suitcase");
            this.current_item = "suitcase"
        }
        this.second_counter=60;
        this.active = true;
        this.timerText.visible = true;
        this.timerText.setText('1:00')
        this.countSec();
        this.count+=1;
        this.button_scan.enabled = true;
        this.button_scan.visible = true;
    },

    done: function(){
        console.log('done')
    },

    gameOver: function(){
        console.log('gameover')
    },

    correctScan: function(){
        
    },

    checkDone: function(){
        if(this.count >=4){
            this.done()
        }
        else{
            this.start()
        }
    },

    makeSad: function(){
        this.btn_player.setTexture(this.game.global.player_sad)
    },

    makeNeutral: function(){
        this.btn_player.setTexture(this.game.global.player_neutral)
    },

    makeHappy: function(){
        this.btn_player.setTexture(this.game.global.player_happy)
    },

    sayThanks: function(){
        this.speech_bubble.update("Thanks")
        this.timerText.visible = false;
        this.makeHappy()
    },

    hideSpeech: function()
    {
        this.speech_bubble.appear(false)
        this.makeNeutral()
    },

    showSpeech: function()
    {
        this.speech_bubble.appear(true)
        this.makeSad()
    }
})