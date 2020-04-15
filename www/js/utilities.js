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

    setScore(score, time=0, mode, done, ){
        let score_key = mode+"score"
        let best_score_key = mode+"bestscore"

        if(done == true && time != 0){
            let time_key = mode + "time"
            let best_time_key = mode + "besttime"

            window.localStorage.setItem(time_key, time);
            if(window.localStorage.getItem(best_time_key)<time){
                window.localStorage.setItem(best_time_key, time);
            }
        }

        window.localStorage.setItem(score_key, score);
        if(window.localStorage.getItem(best_score_key)<score){
            window.localStorage.setItem(best_score_key, score);
        };
        
    }
}