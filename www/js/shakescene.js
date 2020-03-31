var shakescene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function shakescene ()
    {
        Phaser.Scene.call(this, { key: 'shakescene' });
    },

    create: function ()
    {   
        getShakeCallBack(this.errorFunc,this.nextScene)
    
        this.add.text(window.innerWidth/2,window.innerHeight/2, "Shake to get a challenge", {fontFamily: 'font_lapsus', color:"#000000",fontSize: 120*this.game.global.scaler}).setOrigin(0.5,0.5).setAlign('center').setWordWrapWidth(window.innerWidth-20); 

    },

    // update: function()
    // {
    //     console.log(classes)
    // },

    errorFunc: function(error){
        console.log(error)
    },

    successFunc: function(result){
        //vibrate
        this.nextScene()
    },

    nextScene: function(x){
        x.scene.start('outside');
    }
});