
var selectpet = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function selectpet ()
    {
        Phaser.Scene.call(this, { key: 'selectpet' });
    },

    create: function ()
    {   
        this.selected = false;
        this.welcome = new MessageBoard({scene:this, x:window.innerWidth/2, y:window.innerHeight * 1/7, board:"message_board_thin", message:"Choose a pet"}).setOrigin(0.5).setScale(this.game.global.scaler);
        this.player_names= ["bunny_neutral", "penguin_neutral"]
        this.player_index = 0;
        
        this.btn_left = new ButtonFunction({scene:this,x:0,y:window.innerHeight/2, sprite:'button_back', function:this.back}).setScale(this.game.global.scaler).setOrigin(0,0.5).setInteractive();
        this.btn_right = new ButtonFunction({scene:this,x:window.innerWidth,y:window.innerHeight/2, sprite:'button_next', function:this.next}).setScale(this.game.global.scaler).setOrigin(1,0.5).setInteractive();
        this.btn_player = this.add.image(window.innerWidth/2,window.innerHeight/2, this.player_names[this.player_index]).setOrigin(0.5,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_player.on('pointerdown', () => {this.selectPlayer(this.player_names[this.player_index])});
    },

    next: function(){
        this.scene.destroyContinue();
        this.scene.btn_player.destroy();
        this.scene.player_index < this.scene.player_names.length-1 ? this.scene.player_index+=1:this.scene.player_index
        this.scene.btn_player = this.scene.add.image(window.innerWidth/2,window.innerHeight/2, this.scene.player_names[this.scene.player_index]).setOrigin(0.5,0.5).setInteractive().setScale(this.scene.game.global.scaler*3);
        this.scene.btn_player.on('pointerdown', () => {this.scene.selectPlayer(this.scene.player_names[this.scene.player_index])});
    },

    back: function(){
        this.scene.destroyContinue();
        this.scene.btn_player.destroy();
        this.scene.player_index > 0 ? this.scene.player_index-=1:this.scene.player_index
        this.scene.btn_player = this.scene.add.image(window.innerWidth/2,window.innerHeight/2, this.scene.player_names[this.scene.player_index]).setOrigin(0.5,0.5).setInteractive().setScale(this.scene.game.global.scaler*3);
        this.scene.btn_player.on('pointerdown', () => {this.scene.selectPlayer(this.scene.player_names[this.scene.player_index])});
    },

    selectPlayer: function(player){
        if(this.selected == false){
            if(player=="bunny_neutral"){
                this.game.global.player_neutral = player;
                this.game.global.player_sad =  "bunny_sad"
                this.game.global.player_happy = "bunny_happy"
            }
            else{
                this.game.global.player_neutral = player;
                this.game.global.player_sad =  "penguin_sad"
                this.game.global.player_happy = "penguin_happy"
            }
            this.btn_player.setScale(this.game.global.scaler*3.5)
            this.displayContinue();
            this.selected=true;
        }
    },

    displayContinue: function(){
        this.btn_continue = new ButtonLink({scene:this,x:window.innerWidth/2,y:window.innerHeight*6/7, sprite:'button_confirm', link:'petmenu'}).setScale(this.game.global.scaler).setOrigin(0.5).setInteractive();
    },

    destroyContinue: function(){
        this.selected=false;
        if(this.btn_continue)
        {this.btn_continue.destroy();}
    }
});