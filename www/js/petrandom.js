var petrandom = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function petrandom ()
    {
        Phaser.Scene.call(this, { key: 'petrandom' });
    },

    create: function ()
    {   
        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        this.button_scan = new ButtonFunction({scene:this,x:window.innerWidth/2,y:window.innerHeight-5, sprite:'button_scan', function:this.classifyImage}).setScale(this.game.global.scaler).setOrigin(0.5,1);
        this.btn_player = this.add.image(window.innerWidth/2, (window.innerHeight/2 + 200*this.game.global.scaler), this.game.global.player_sprite).setOrigin(0.5, 0).setScale(this.game.global.scaler*3);
        this.speech_bubble = new MessageBoard({scene:this, x:window.innerWidth/2, y:this.btn_player.y - (200*this.game.global.scaler), board:"speech_bubble", message:"I'm thirsty, can you get me some water?", size:0.5, wrap:true}).setOrigin(0.5).setScale(this.game.global.scaler*3);
    }
})