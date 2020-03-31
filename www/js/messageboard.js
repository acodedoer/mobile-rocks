class MessageBoard extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.board, config.message);
        config.scene.add.existing(this);
        if(config.message!=""){
            this.text = config.scene.add.text(config.x, config.y, config.message, {fontFamily: 'font_lapsus', color:"#000000",fontSize: 180 * config.scene.game.global.scaler}).setOrigin(0.5).setAlign('center');
        }
    }

    appear(state){
        if (state===true){
            this.text.visible=true;
            this.visible=true;
        }
        else{
            this.text.visible=false;
            this.visible=false;
        }
    }
}