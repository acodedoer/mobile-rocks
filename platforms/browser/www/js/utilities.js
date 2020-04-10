class Utilities extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
    }

    shuffle (array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}