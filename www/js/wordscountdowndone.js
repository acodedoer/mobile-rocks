var wordscountdowndone = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function wordscountdowndone ()
    {
        Phaser.Scene.call(this, { key: 'wordscountdowndone' });
    },

    create: function () { 
        CameraPreview.hide()
        let score = window.localStorage.getItem('wordscountdownscore');
        let best = window.localStorage.getItem('wordscountdownbestscore');

        let score_y = window.innerHeight/2;
        let score_size = 200 * this.game.global.scaler;

        let best_y = score_y + score_size ;
        let best_size = 0.7 * score_size;
        new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        new MessageBoard({scene:this, x:window.innerWidth/2, y:window.innerHeight* 1/4, board:"message_board_thin", message:"Good Job!!!"}).setOrigin(0.5).setScale(this.game.global.scaler);
        
        let score_text = this.add.text(window.innerWidth/2, score_y, "score: "+score, {fontFamily: 'font_lapsus', color:"#000000",fontSize: score_size}).setOrigin(0.5).setAlign('center');
        let best_text = this.add.text(window.innerWidth/2, best_y, "best: "+best, {fontFamily: 'font_lapsus', color:"#000000",fontSize: best_size}).setOrigin(0.5).setAlign('center');

        //let test_text = this.add.text(window.innerWidth/2, window.innerHeight/2, "score: 20", {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80}).setOrigin(0.5).setAlign('center');
        new ButtonLink({scene:this,x:window.innerWidth/2,y:window.innerHeight-10, sprite:"button_countdown", link:"wordscountdown"}).setScale(this.game.global.scaler).setOrigin(0.5,1);
      

    }
});