var preload = new Phaser.Class({

    Extends: Phaser.Scene,

//function that loads assests
preload: function  ()
    {
        let images_array = [
            ['game_title', 'assets/gametitle.png'],
            ['message_board_thin', 'assets/board.png'],
            ['title_food', 'assets/rockmyfood.png'],
            ['title_words', 'assets/rockmywords.png'],
            ['title_pets', 'assets/rockmypet.png'],
            ['button_home', 'assets/button_home.png'],
            ['button_next', 'assets/button_next.png'],
            ['button_back', 'assets/button_back.png'],
            ['button_scan', 'assets/button_scan.png'],
            ['button_confirm', 'assets/button_confirm.png'],
            ['button_clear', 'assets/button_clear.png'],
            ['button_timed', 'assets/button_timed.png'],
            ['button_countdown', 'assets/button_countdown.png'],
            ['letter_holder', 'assets/letter_holder.png'],
            ['word_holder', 'assets/word_holder.png'],
            ['coin', 'assets/coin.png']
        ]

        images_array.forEach(function(item){
            this.game.scene.keys.default.load.image(item[0], item[1])
        })

        // this.load.image('next', 'assets/next.png');
        // this.load.audio("wrong", "assets/wrong.mp3");
        // this.load.spritesheet('optionBox', 'assets/optionBox.png', { frameWidth: 1632, frameHeight: 362});
        // this.load.bitmapFont('yellowFont', 'assets/fonts/bitmap/yellowfont.png', 'assets/fonts/bitmap/yellowfont.fnt');
        // this.load.json('Mode1', 'js/Mode1.json ');
    },
    
    //function that creates game objects after preload
    create: function ()
    {
        this.startClassifier()
        this.scene.start('splashscreen');
    },

    startClassifier: async function(){
        let started = await kickstartClassifier()
        console.log("started classifier")
    }
});