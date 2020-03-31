var splashscreen = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function splashscreen ()
    {
        Phaser.Scene.call(this, { key: 'splashscreen' });
    },

    create: function ()
    {   this.add.image(window.innerWidth/2, window.innerHeight/2, "game_title").setOrigin(0.5).setScale(this.game.global.scaler);
        this.time.delayedCall(700, this.nextScene, [], this)
    },

    nextScene: function(){
        this.scene.start('mainmenu');
    }

});