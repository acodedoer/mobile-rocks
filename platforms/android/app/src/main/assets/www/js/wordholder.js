class WordHolder extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y,"word_holder");
        config.scene.add.existing(this);
        this.letter=""
        this.letter_text = config.scene.add.text(config.x, config.y, this.letter, {fontFamily: 'font_lapsus', color:"#000000",fontSize: 40}).setOrigin(0.5).setAlign('center');
        this.setInteractive();
    }

    setLetter(l){
        this.letter=l;
        this.updateLetter()
    }

    updateLetter(){
        this.letter_text.setText(this.letter);
    }

    removeLetter(){
        this.letter=""
        this.updateLetter()
    }

    getLetter(){
        return this.letter;
    }

    destroyBtn(){
        this.letter_text.destroy()
        this.destroy()
    }
}