class ButtonLink extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.sprite, config.link);
        config.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown',function(){this.alpha-=.1;config.scene.scene.start(config.link)},this);
    }
}