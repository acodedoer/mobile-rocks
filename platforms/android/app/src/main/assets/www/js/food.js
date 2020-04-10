var food = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function food ()
    {
        Phaser.Scene.call(this, {key: 'food' });
    },

    create: function ()
    {
        this.score = 0;
        
        let button_home = new ButtonLink({scene:this,x:5,y:5, sprite:"button_home", link:"mainmenu"}).setScale(this.game.global.scaler).setOrigin(0,0);
        
        this.score_text = this.add.text(window.innerWidth/2, 5, '0', {fontFamily: 'font_lapsus', color:"#000000",fontSize: 150 * this.game.global.scaler}).setOrigin(0.5,0).setAlign('center');
       
        this.board = new MessageBoard({scene:this, x:window.innerWidth/2, y:window.innerHeight/2 + (200* this.game.global.scaler), board:"food_board"}).setOrigin(0.5).setScale(this.game.global.scaler);
     
        this.btn_pizza = new ButtonFunction({scene:this, x:this.board.x-(50*this.game.global.scaler), y:this.board.y-(20*this.game.global.scaler), sprite:'item_pizza', function:function(){}}).setScale(this.game.global.scaler).setOrigin(1);
        this.btn_juice = new ButtonFunction({scene:this, x:this.board.x-(50*this.game.global.scaler), y:this.board.y+(20*this.game.global.scaler), sprite:'item_juice', function:function(){}}).setScale(this.game.global.scaler).setOrigin(1,0);
        this.btn_milkshake = new ButtonFunction({scene:this, x:this.board.x+(50*this.game.global.scaler), y:this.board.y-(20*this.game.global.scaler), sprite:'item_milkshake', function:function(){}}).setScale(this.game.global.scaler).setOrigin(0,1);
        this.btn_shawarma = new ButtonFunction({scene:this, x:this.board.x+(50*this.game.global.scaler), y:this.board.y+(20*this.game.global.scaler), sprite:'item_shawarma', function:function(){}}).setScale(this.game.global.scaler).setOrigin(0);
    }
})