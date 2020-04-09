class MessageBoard extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.board, config.message);
        config.scene.add.existing(this);
        if(config.message!=""){
            this.text = config.scene.add.text(config.x, config.y, config.message, {fontFamily: 'font_lapsus', color:"#000000",fontSize: 180 * config.scene.game.global.scaler * config.size, wordWrap: { width: this.displayWidth * 3/4, useAdvancedWrap: true }}).setOrigin(0.5,1).setAlign('center');

            if(config.wrap == true){

            }
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