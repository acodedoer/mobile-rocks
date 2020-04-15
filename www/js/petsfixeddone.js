var petsfixeddone = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function petsfixeddone ()
    {
        Phaser.Scene.call(this, { key: 'petsfixeddone' });
    },

    create: function () { 
        CameraPreview.hide()
        let score = window.localStorage.getItem('petsfixedscore');
        let time = this.toTime(window.localStorage.getItem('petsfixedtime'));
        let besttime = this.toTime(window.localStorage.getItem('petsfixedtime'));

        let score_y = window.innerHeight/2;
        let score_size = 200 * this.game.global.scaler;

        let time_y = score_y + score_size ;
        let time_size = 0.7 * score_size ;
        let besttime_y = time_y + time_size ;
        let besttime_size = time_size;

        new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        new MessageBoard({scene:this, x:window.innerWidth/2, y:window.innerHeight* 1/4, board:"message_board_thin", message:"Good Job!!!"}).setOrigin(0.5).setScale(this.game.global.scaler);
        
        let score_text = this.add.text(window.innerWidth/2, score_y, "score: "+score, {fontFamily: 'font_lapsus', color:"#000000",fontSize: score_size}).setOrigin(0.5).setAlign('center');
        let time_text = this.add.text(window.innerWidth/2, time_y, "time left: "+time, {fontFamily: 'font_lapsus', color:"#000000",fontSize: time_size}).setOrigin(0.5).setAlign('center');
        let besttime_text = this.add.text(window.innerWidth/2, besttime_y, "best time: "+besttime, {fontFamily: 'font_lapsus', color:"#000000",fontSize: besttime_size}).setOrigin(0.5).setAlign('center');

        //let test_text = this.add.text(window.innerWidth/2, window.innerHeight/2, "score: 20", {fontFamily: 'font_lapsus', color:"#000000",fontSize: 80}).setOrigin(0.5).setAlign('center');
        new ButtonLink({scene:this,x:window.innerWidth/2,y:window.innerHeight-10, sprite:"button_timed", link:"petsfixed"}).setScale(this.game.global.scaler).setOrigin(0.5,1);
      

    },

    toTime: function(value){
        return Math.floor(value/60)+':' + (value%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }
});