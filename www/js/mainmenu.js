var mainmenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainmenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
    },

    create: function ()
    {   
        CameraPreview.hide()
        let link_words = new ButtonLink({scene:this,x:innerWidth/2,y:innerHeight * 2/8, sprite:"title_words", link:"wordsmenu"}).setScale(this.game.global.scaler);
        let link_food = new ButtonLink({scene:this,x:innerWidth/2,y:innerHeight * 4/8, sprite:"title_food", link:"food"}).setScale(this.game.global.scaler);
        let link_pet = new ButtonLink({scene:this,x:innerWidth/2,y:innerHeight * 6/8, sprite:"title_pets", link:"selectpet"}).setScale(this.game.global.scaler);
    }
});