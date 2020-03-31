
var pets = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function pets ()
    {
        Phaser.Scene.call(this, { key: 'pets' });
    },

    create: function ()
    {   
        this.points = 0;
         
        this.add.rectangle(0,0, window.innerWidth, (window.innerHeight*1/12), 0x53B3CB).setOrigin(0);
        this.btn_back = this.add.rectangle(4,4, window.innerWidth/4, (window.innerHeight*1/12)-8, 0x53B3CB)
                        .setOrigin(0)
                        .setStrokeStyle(4, 0x72C0D4)
                        .setInteractive()
                        .on('pointerdown',()=>{
                            this.toHome();
                        });
        
        this.btn_back_text = this.add.text(window.innerWidth/8,window.innerHeight/24, 'back', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');

        this.txt_points = this.add.text(window.innerWidth*7/8,window.innerHeight/24, 'points: 0', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');

        this.challenges = [{"message":"I'm a bit thirsty, can you find me some water?", "item":"water"},{"message":"I'm in the mood for some berries, can you find me some?", "item":"berries"},{"message":"Lets find some flowers", "item":"flowers"}]
        this.count = 0
        this.total = this.challenges.length
        this.btn_player = this.add.image(window.innerWidth/2, (window.innerHeight/6) + (window.innerHeight*1/12), this.game.global.player_sprite).setOrigin(0.5,0.5).setScale(this.game.global.scaler*3);
        
        this.text_instruction = this.add.text(window.innerWidth/2,window.innerHeight* 3/7, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler, wordWrap: { width: window.innerWidth * 11/12, useAdvancedWrap: true }}).setOrigin(0.5,0.5).setAlign('center');
        this.text_instruction.visible = false;

        this.text_message = this.add.text(window.innerWidth/2,window.innerHeight* 3/7, 'Thank you', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');
        this.text_message.visible = false;

        this.oops = this.add.text(window.innerWidth/2, (window.innerHeight*5/6) + 1, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,1).setAlign('center');
        
        this.scan = this.add.rectangle(window.innerWidth/4, window.innerHeight, window.innerWidth/2, (window.innerHeight/6), 0x53B3CB)
            .setOrigin(0.5,1)
            .setInteractive()
            .on('pointerdown', () => (this.classifyShape()));
        this.scan_text = this.add.text(window.innerWidth/4, window.innerHeight - (window.innerHeight/12), 'scan', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setColor('#000000').setAlign('center');

         this.next = this.add.rectangle(window.innerWidth* 3/4, window.innerHeight, window.innerWidth/2, (window.innerHeight/6), 0x817F82)
            .setOrigin(0.5,1)
            .setInteractive()
            .on('pointerdown', () => (this.nextChallenge()));
        this.next_text = this.add.text(window.innerWidth* 3/4, window.innerHeight - (window.innerHeight/12), 'next', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setColor('#000000').setAlign('center').setAlpha(0.3);


        this.nextChallenge();             
    },
    toHome: function(){
        CameraPreview.stopCamera();
        this.scene.start('mainmenu')
    },

    classifyShape: async function(){
        this.classified = await takePictureAndClassify()
        if(this.classified[0].label == this.itemToScan){
            this.updatePoints()
            this.displayMessage()
            this.allowNext()
            this.disallowScan()
        }
        else{
            this.oops.setText(`oops, you scanned ${this.classified[0].label}`)
            this.time.delayedCall(2000, ()=>{this.oops.setText('')}, [], this)
        }
    },

    allowNext: function(){
        this.next.input.enabled = true;
        this.next.setAlpha(1);
        this.next_text.setAlpha(1)
    },

    disallowNext: function(){
        this.next.input.enabled = false;
        this.next.setAlpha(0.3);
        this.next_text.setAlpha(0.3)
    },

    allowScan: function(){
        this.scan.input.enabled = true;
        this.scan.setAlpha(1);
        this.scan_text.setAlpha(1)
        CameraPreview.show()
    },

    disallowScan: function(){
        this.scan.input.enabled = false;
        this.scan.setAlpha(0.3);
        this.scan_text.setAlpha(0.3)
        CameraPreview.hide()
    },

    updatePoints: function(){
        this.points+=10;
        this.txt_points.setText(`points: ${this.points}`)
    },
    
    nextChallenge: function(){
        if(this.count < this.challenges.length){
            setupCamera("bottom")
            this.disallowNext();
            this.allowScan();
            this.displayInstruction()
            this.itemToScan = this.challenges[this.count].item
            this.count+=1;
        }

        else{
            this.text_message.setText("That's it!")
            CameraPreview.hide()
            this.displayMessage()
        }
    },

    checkScan: function(){
        
    },

    displayMessage: function(){
        this.text_instruction.visible =false;
        this.text_message.visible =true;
    },

    displayInstruction: function(){
        this.text_instruction.setText(this.challenges[this.count].message)
        this.text_instruction.visible =true;
        this.text_message.visible =false;
    }
              
})