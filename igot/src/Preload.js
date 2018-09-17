//laduje pliki multimedialne do pamieci
gra.Preload = function(game) {};
gra.Preload.prototype = {
    preload: function() {
        //sprite statyczne(nie animowane)
        this.load.image('enemy', 'img/stone.png');
        this.load.image('bg', 'img/bg.png');
        this.load.image('bg2', 'img/bg.png');
        this.load.image('splash1', 'img/splash2.png');
        this.load.image('soundOn','img/soundOn.png');
        this.load.image('soundOff','img/soundOff.png');
        this.load.image('tapToStart','img/tapToStartTheGame.png');
        this.load.image('smallCoin','img/star.png');
        this.load.image('whiteSplash','img/whiteSplash.png');
        this.load.image('goldParticle', 'img/goldParticle.png');
        this.load.image('whiteParticle','img/whiteParticle.png');
        this.load.image('redParticle','img/redParticle.png');
        this.load.image('blueParticle','img/blueParticle.png');
        this.load.image('blackParticle','img/blackParticle.png');
        this.load.image('girl1', 'img/star.png');
        this.load.image('magnes','img/magnes.png');

        //animation
        this.load.image('coin','img/star.png');
        this.load.image('coin2','img/girl2.png');
        this.load.image('coin3','img/girl3.png');
        // this.load.image('coin','img/coinAnimation.png', 400 , 400 , 4);
        this.load.spritesheet('player','img/danwalking.png', 225, 420 , 3);

        //music
        this.load.audio('musicUniverse', 'assets/sound.mp3');
        this.load.audio('coinPicking', 'assets/coinPicking.mp3');

},
    create: function() {
        this.state.start('SplashScene');
    }

};