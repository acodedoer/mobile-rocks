var food = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function food ()
    {
        Phaser.Scene.call(this, {key: 'food' });
    },

    create: function ()
    {
        this.index_selected=0;
        this.points =0;
        this.add.rectangle(0,0, window.innerWidth, (window.innerHeight*1/12), 0xF9C22E).setOrigin(0);
        this.btn_back = this.add.rectangle(4,4, window.innerWidth/4, (window.innerHeight*1/12)-8, 0xF9C22E)
                        .setOrigin(0)
                        .setStrokeStyle(4, 0xFAD267)
                        .setInteractive()
                        .on('pointerdown',()=>{
                            this.toBack();
                        });
        this.btn_back_text = this.add.text(window.innerWidth/8,window.innerHeight/24, 'back', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');
        this.txt_points = this.add.text(window.innerWidth*7/8,window.innerHeight/24, 'points: 0', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');
        
        this.btn_player = this.add.image(window.innerWidth/2, (window.innerHeight/6) + (window.innerHeight*1/12), this.game.global.player_sprite).setOrigin(0.5,0.5).setScale(this.game.global.scaler*3);
        this.btn_player.visible = false;
        
        this.menu =[{"name":"pizza", "price":1},{"name":"smoothy", "price":3},{"name":"shawarma", "price":9},{"name":"fries", "price":6},{"name":"muffin", "price":2},{"name":"kitkat", "price":4},{"name":"egg roll", "price":6}]
        this.selected = false;
        this.selected_food={}
        
        this.score=0;
        this.number_selected=0

        this.menu_buttons = []
        this.menu_buttons_text = []

        this.correct =false;
        
        this.scan = this.add.rectangle(window.innerWidth/4, window.innerHeight, window.innerWidth/2, (window.innerHeight/6), 0xF9C22E)
            .setOrigin(0.5,1)
            .setInteractive()
            .on('pointerdown', () => (this.classifyNumber()));
        this.scan_text = this.add.text(window.innerWidth/4, window.innerHeight - (window.innerHeight/12), 'scan', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setColor('#000000').setAlign('center');

         this.toMenu = this.add.rectangle(window.innerWidth* 3/4, window.innerHeight, window.innerWidth/2, (window.innerHeight/6), 0x817F82)
            .setOrigin(0.5,1)
            .setInteractive()
            .on('pointerdown', () => (this.showMenu()));
        this.toMenu_text = this.add.text(window.innerWidth* 3/4, window.innerHeight - (window.innerHeight/12), 'Menu', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setColor('#000000').setAlign('center');

        this.number_to_scan = this.add.text(window.innerWidth/2, window.innerHeight*3/6, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 300*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');
        this.message = this.add.text(window.innerWidth/2, window.innerHeight*3/6, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');
        
        this.oops = this.add.text(window.innerWidth/2, (window.innerHeight*5/6) + 1, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,1).setAlign('center');
        
        document.addEventListener("backbutton", ()=>
            {
                this.scene.start('mainmenu')
                }
        , false);

        this.showMenu()
    },

    toBack: function(){
        if (this.selected==false){
            CameraPreview.stopCamera();
            this.scene.start('mainmenu')
        }
        else{
            this.showMenu()
        }
    },

    showMenu: function(){
        this.destroyScan();
        this.selected=false;
        this.btn_player.visible=false;
        this.correct =false;
        this.toMenu.visible=false;
        this.toMenu_text.visible=false;
        this.message.visible =false;
        this.scan.visible=false;
        this.scan_text.visible=false;

        this.menu_text = this.add.text(window.innerWidth/2, window.innerHeight* 1.5/12, "Choose an item, and scan its price", {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler, wordWrap: { width: window.innerWidth * 11/12, useAdvancedWrap: true }}).setOrigin(0.5,0.5).setAlign('center');

        for (let i = 0; i<6; i++){
            this.menu_buttons[i] = this.add.rectangle(window.innerWidth/2, (window.innerHeight* 2/12 + (window.innerHeight - window.innerHeight/12) * i/8) + window.innerHeight/16 , window.innerWidth, (window.innerHeight/8)-10, 0xF9C22E).setOrigin(0.5).setInteractive().on('pointerdown', () => {this.selected=true; this.index_selected = i; this.number_selected=this.menu[i]["price"]; this.setUpScan()});
            this.menu_buttons_text[i] = this.add.text(this.menu_buttons[i].x, this.menu_buttons[i].y, ""+this.menu[i]["name"]+": "+this.menu[i]["price"], {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setColor('#000000').setAlign('center');
        }
  },

    setUpScan: function(){
        this.destroyMenu()
        setupCamera("top")
        this.scan.visible=true;
        this.scan.input.enabled = true;
        this.scan.setAlpha(1);
        this.scan_text.setAlpha(1);
        this.toMenu.visible=true;
        this.toMenu.input.enabled = false;
        this.toMenu.setAlpha(0.3)
        this.toMenu_text.visible = true;
        this.toMenu_text.setAlpha(0.3)
        this.scan_text.visible=true;
        this.number_to_scan.setText(this.number_selected)
        this.number_to_scan.visible=true;
    },

    destroyScan: function(){
        CameraPreview.hide()
        this.number_to_scan.setText('')
    },

    destroyMenu: function(){
        this.menu_text.destroy()
        for(let i=0; i<this.menu_buttons.length;i++){
            this.menu_buttons[i].destroy()
        }

        for(let i=0; i<this.menu_buttons.length;i++){
            this.menu_buttons_text[i].destroy()
        }
    },

    classifyNumber: async function(){
        this.classified = await takePictureAndClassify()
        if(this.classified[0].label== ""+this.number_selected){
            this.setDone()
        }
        else{
            this.oops.setText(`oops, you scanned ${this.classified[0].label}`)
            this.time.delayedCall(2000, ()=>{this.oops.setText('')}, [], this)
        }
    },

    setDone: function(){
        this.points+=10;
        this.txt_points.setText(`points: ${this.points}`)
        CameraPreview.hide();
        this.btn_player.visible = true;
        this.number_to_scan.visible =false;
        this.message.setText("Thanks for the "+this.menu[this.index_selected].name)
        this.message.visible =true;
        this.scan.input.enabled = false;
        this.scan.setAlpha(0.3);
        this.scan_text.setAlpha(0.3);
        this.btn_player.visible=true;
        this.toMenu.input.enabled = true;
        this.toMenu.setAlpha(1)
        this.toMenu_text.setAlpha(1)
    }
})