gra.SplashScene = function(game) {};
gra.SplashScene.prototype = {
    create: function() {
        this.stage.backgroundColor = "#f94d9e";
        splashImage1 = this.add.sprite(this.world.width/2, this.world.height/2, 'splash1');
        splashImage1.anchor.setTo(0.5);
        splashImage1.scale.setTo(0.7);

        splashImage1.alpha = 0;

        tween = this.add.tween(splashImage1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        this.time.events.add(Phaser.Timer.SECOND * 4, this.stopStart, this);
    },
    update: function() {
    },
    stopStart: function(){
        tween.stop();
        this.startGame();
    },
    startGame:function(){
        this.state.start('Game');
    }

}