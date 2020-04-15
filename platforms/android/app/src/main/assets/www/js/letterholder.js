class LetterHolder extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y,"letter_holder",config.letter);
        config.scene.add.existing(this);
        this.letter_text = config.scene.add.text(config.x, config.y, config.letter, {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80}).setOrigin(0.5).setAlign('center');
        this.setInteractive();
        this.setAlpha(0.4);
        this.letter = config.letter
        this.letter_text.setAlpha(0.4);
        this.scaler = config.scene.game.global.scaler;
        this.selected = false;
        this.locked = false;
        this.scanned = false;
    }

    setScanned(){
        this.setAlpha(1);
        this.letter_text.setAlpha(1);
        this.scanned = true;
        this.removeListener('pointerdown', this.setScanned,this); 
        //this.on('pointerdown',this.setSelected,this);
    }

    getScanned(){
        return this.scanned;
    }

    setText(text){
        this.letter_text.setText(text)
    }

    setSelected(){
            this.setScale(1.1*this.scaler);
            this.selected = true;
        }
    
    unSelect(){
        this.setScale(1*this.scaler);
        this.selected = false
        console.log("unselected");
    }

    isSelected(){
        return this.selected;
    }

    getLetter(){
        return this.letter;
    }

    isAdded(){
        this.letter_text.setAlpha(0);
        this.locked = true;
    }

    unAdd(){
        this.letter_text.setAlpha(1);
        this.locked = false;
    }

    destroyBtn(){
        this.destroy()
    }
}