class ButtonFunction extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.sprite, config.function);
        config.scene.add.existing(this);
        this.setInteractive();
        this.setScale(config.scene.game.global.scaler)
        this.on('pointerdown',function(){config.function()},this);
    }

    destroyBtn(){
        this.destroy()
    }
}