var food = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function food ()
    {
        Phaser.Scene.call(this, {key: 'food' });
    },

    create: function ()
    {

        this.utilities = new Utilities({scene: this,x:0, y:0})
        let number_array = [1,2,3,4,5,6,7,8,9]

        this.add_array = this.getAddArray([5,5])
        this.mul_array = this.getMulArray([5,5])

        this.food_item = this.add.sprite(window.innerWidth/2, window.innerHeight/2, '').setScale(this.game.global.scaler).setOrigin(0.5)
        this.num1 = new LetterHolder({scene:this,x:window.innerWidth/5,y:window.innerHeight *4.5/6,letter:''}).setScale(this.game.global.scaler).setOrigin(0.5);
        this.num1.on('pointerdown',function(){
            this.classifyImage(this.num1, this.num2, this.operation.text, this.answer.text)},
            this);
        this.operation = this.add.text(window.innerWidth* 2/5, window.innerHeight*4.5/6, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');
        this.num2 = new LetterHolder({scene:this,x:window.innerWidth* 3/5,y:window.innerHeight*4.5/6,letter:''}).setScale(this.game.global.scaler).setOrigin(0.5);
        this.num2.on('pointerdown',function(){
            this.classifyImage(this.num2, this.num1, this.operation.text, this.answer.text)},
        this);
        this.answer = this.add.text(window.innerWidth* 4/5, window.innerHeight*4.5/6, '', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');

        let btn_del1 = new ButtonFunction({scene:this,x:this.num1.x,y:this.num1.y + (300 * this.game.global.scaler), sprite:'button_clear', function:function(){this.num1.setText(''); this.num1.setAlpha(0.4)}.bind(this)}).setScale(this.game.global.scaler).setOrigin(0.5);
        let btn_del2= new ButtonFunction({scene:this,x:this.num2.x,y:this.num1.y + (300 * this.game.global.scaler), sprite:'button_clear', function:function(){this.num2.setText(''); this.num2.setAlpha(0.4)}.bind(this)}).setScale(this.game.global.scaler).setOrigin(0.5);

        this.score = 0;
        this.time_left;
        this.count = 0;
        this.food_items_one = ['item_juice', 'item_pizza','item_milkshake','item_shawarma']
        this.food_items_two = ['item_juice', 'item_milkshake','item_shawarma','item_pizza']

        this.number_of_items = this.food_items_one.length + this.food_items_two.length

        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        this.score_text = this.add.text(window.innerWidth/2, 5, '0', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(0.5,0).setAlign('center');
        
        setupCamera('top');
        this.setQuestion()
       },

       classifyImage: async function(btn1, btn2, op, answer){
            btn1.setText(5)
            btn1.setAlpha(1)

            // this.classified = await takePictureAndClassify()
            // if(Number.isInteger(this.classified[0].label)){
            //     btn.setText(this.classified[0].label);
                if(btn2.getLetter()!=""){
                    let ans = 0;
                    let x = btn1.getLetter()
                    let y = btn2.getLetter()
                    if(op=="+"){
                        ans = x+y;
                    }
                    else if (op=="x"){
                        ans = x*y
                    }

                    if(ans == ((answer.split("")).slice(1)).join("")){
                        this.score+=1;
                        this.score_text.setText(this.score)
                        if(this.count< this.number_of_items-1){
                            this.count+=1;
                            this.setQuestion()
                            btn2.setText("")
                            btn1.setText("")
                            btn2.setAlpha(0.4)
                            btn1.setAlpha(0.4)
                        }else{
                            btn2.input.enabled = false
                            btn1.input.enabled = false
                            this.utilities.setScore(this.score,0,'food',true);
                            this.scene.start('fooddone')
                        }
                    }
                    else{
                        this.utilities.setScore(this.count,0,'food',false);
                        this.scene.start('foodgameover')
                    }
            //     }
            // }
    }},

    setQuestion: function(){
        let food_items;
        let count;
        let question_array;
        if(this.count<this.food_items_one.length){
            food_items = this.food_items_one
            count = this.count;
            question_array = this.add_array
            this.operation.setText('+')
        }
        else{
            food_items = this.food_items_two
            count = this.count - this.food_items_one.length
            question_array = this.mul_array
            this.operation.setText('x')
        }
        this.answer.setText("="+question_array[count])
        this.food_item.setTexture(food_items[count])


    },

    getAddArray: function(array){
        let arr = []
        for(let i = 0; i<4; i++){
            x = Math.floor(Math.random() * (Math.max(...array) - Math.min(...array) + 1) + Math.min(...array))
            y = Math.floor(Math.random() * (Math.max(...array) - Math.min(...array) + 1) + Math.min(...array))
            arr[i]= x + y;
        }
        return arr;
    },

    getMulArray: function(array){
        let arr = []
        for(let i = 0; i<4; i++){
            x = Math.floor(Math.random() * (Math.max(...array) - Math.min(...array) + 1) + Math.min(...array))
            y = Math.floor(Math.random() * (Math.max(...array) - Math.min(...array) + 1) + Math.min(...array))
            arr[i]= x * y;
        }
        return arr;
    }
})