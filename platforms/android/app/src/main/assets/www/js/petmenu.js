var petmenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function petmenu ()
    {
        Phaser.Scene.call(this, { key: 'petmenu' });
    },

    create: function ()
    {   
        CameraPreview.hide()
        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        let button_countdown = new ButtonLink({scene:this,x:window.innerWidth/4,y:window.innerHeight/2, sprite:'button_countdown', link:"petsfixed"}).setScale(this.game.global.scaler).setOrigin(0.5);
        let button_timed = new ButtonLink({scene:this,x:window.innerWidth * 3/4,y:window.innerHeight/2, sprite:'button_timed', link:"petrandom"}).setScale(this.game.global.scaler).setOrigin(0.5);
    }
})