var gra = {
    _WIDTH: 640,
    _HEIGHT: 480
};
//bonus items chances of spowning (max and min)
var magnesMinChance = 1
var magnesMaxChance = 5
//sprites variables
var bg;
var bg2;
var player;
var enemy;
var whiteSplash;
var universeSpeed = 5;
var enemySpeed = 1;
var score  = 0;
var cash = 0;
var parsecDistanceLabel;
var tapToStart;
var coin;
var g = 300;
// var emitter;
var kaboom;
var distanceParsecOld = 0;
var distanceParsecNew = 0;

var downX;
var upX;

//sound
var sound;//soundOn, soundOff sprite
var soundBuffor = 0;
var music;
var coinSound;
//splashScene
var splashImage1;
var tween;

var menuTurnedOn = true;
var checkIfEnemyCreated = false;
var checkIfScreenWasTouchedInMenu = false;
var isGameOverScreenOn = false;
var distanceLabelGameOverScreen;

var zwrotnosc = 600;
gra.Boot = function(game) {};
gra.Boot.prototype = {

    create: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preload');
    }
};