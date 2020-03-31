var playermenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function playermenu ()
    {
        Phaser.Scene.call(this, { key: 'playermenu' });
    },

    create: function ()
    {   
        this.player_names= ["player_rabbit", "player_bear", "player_zebra","player_penguin", "player_parrot"]
        this.player_index = 0;
        
        this.instruction = this.add.text(window.innerWidth/2,window.innerHeight*2/7, "Select a player", {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center');
        
        this.btn_left = this.add.image(0,window.innerHeight/2, "btn_left").setOrigin(0,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_left.on('pointerdown', () => {this.back()});
        
        this.btn_right = this.add.image(window.innerWidth,window.innerHeight/2, "btn_right").setOrigin(1,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_right.on('pointerdown', () => {this.next()});

        this.btn_player = this.add.image(window.innerWidth/2,window.innerHeight/2, this.player_names[this.player_index]).setOrigin(0.5,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_player.on('pointerdown', () => {this.selectPlayer(this.player_names[this.player_index])});
    },

    next: function(){
        this.destroyContinue();
        this.btn_player.destroy();
        this.player_index < 4 ? this.player_index+=1:this.player_index
        this.btn_player = this.add.image(window.innerWidth/2,window.innerHeight/2, this.player_names[this.player_index]).setOrigin(0.5,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_player.on('pointerdown', () => {this.selectPlayer(this.player_names[this.player_index])});
    },

    back: function(){
        this.destroyContinue();
        this.btn_player.destroy();
        this.player_index > 0 ? this.player_index-=1:this.player_index
        this.btn_player = this.add.image(window.innerWidth/2,window.innerHeight/2, this.player_names[this.player_index]).setOrigin(0.5,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_player.on('pointerdown', () => {this.selectPlayer(this.player_names[this.player_index])});
    },

    selectPlayer: function(player){
        this.game.global.player_sprite=player;
        this.btn_player.setScale(this.game.global.scaler*5)
        this.displayContinue();
    },

    displayContinue: function(){
        this.btn_continue = this.add.image(window.innerWidth/2, window.innerHeight*6/7, "btn_continue").setOrigin(0.5,0.5).setInteractive().setScale(this.game.global.scaler*3);
        this.btn_continue.on('pointerdown', () => {this.scene.start("mainmenu")});
    },

    destroyContinue: function(){
        if(this.btn_continue)
        {this.btn_continue.destroy();}
    }
});