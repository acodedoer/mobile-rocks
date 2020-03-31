var wordsmenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function wordsmenu ()
    {
        Phaser.Scene.call(this, { key: 'wordsmenu' });
    },

    create: function ()
    {   
        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        let button_countdown = new ButtonLink({scene:this,x:window.innerWidth/4,y:window.innerHeight/2, sprite:'button_countdown', link:"wordscountdown"}).setScale(this.game.global.scaler).setOrigin(0.5);
        let button_timed = new ButtonLink({scene:this,x:window.innerWidth * 3/4,y:window.innerHeight/2, sprite:'button_timed', link:"wordstimed"}).setScale(this.game.global.scaler).setOrigin(0.5);
    }
})