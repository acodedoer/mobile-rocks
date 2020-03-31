var test = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function test ()
    {
        Phaser.Scene.call(this, { key: 'test' });
    },

    create: function ()
    {
        this.board = new MessageBoard({scene:this,x:innerWidth/2,y:100, board:"message_board_thin", message:"welcome"});
        this.time.delayedCall(1000, this.onClick, [], this)
        let test = new ButtonLink({scene:this,x:innerWidth/2,y:innerHeight/2, sprite:"btn_continue", link:"school"});
    },

    onClick: function(){
        this.board.appear(false);
        this.time.delayedCall(1000, this.onClick1, [], this)
    },

    onClick1: function(){
        this.board.appear(true);
        this.time.delayedCall(1000, this.onClick, [], this)
    }
})