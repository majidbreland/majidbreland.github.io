gra.Game = function(game) {};
gra.Game.prototype = {
    create: function() {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = g;

        bg = this.add.tileSprite(0, 0, 640, 480, 'bg');

        smallCoinIcon = this.add.sprite(60,76, 'smallCoin')
        smallCoinIcon.anchor.setTo(0.5);
        smallCoinIcon.scale.setTo(0.08)

        this.createNewPlayer();

        tapToStart = this.add.sprite(this.world.width/2, (this.world.height/10)*7, 'tapToStart');
        tapToStart.anchor.setTo(0.5);
        parsecDistanceLabel = this.add.text(440, 80);
        parsecDistanceLabel.text = "Distance in ft: 0";
        parsecDistanceLabel.anchor.setTo(0.5);
        parsecDistanceLabel.font = 'Press Start 2P';
        parsecDistanceLabel.fontSize = 20;
        parsecDistanceLabel.fill = '#FFFFFF';
        coinAmountLabel = this.add.text(120, 80);
        coinAmountLabel.text = cash;
        coinAmountLabel.anchor.setTo(0.5);
        coinAmountLabel.font = 'Press Start 2P';
        coinAmountLabel.fontSize = 20;
        coinAmountLabel.fill = '#FFFFFF'

        coinSound = this.add.audio('coinSound');
        coinSound.stop();

        coins = this.add.group();

	    this.time.events.loop(300, this.startSpawning, this);

        emitter = this.add.emitter(0, 0, 10);
        emitter.makeParticles('heartEyeEmoji');
        emitter.gravity = 2000;
        emitter.minParticleScale = 1;
        emitter.maxParticleScale = 4;
        emitter.bounce.setTo(0.5, 0.5);

        whiteEmitter = this.add.emitter(100, 0, 100);
        whiteEmitter.makeParticles('whiteParticle');
        whiteEmitter.minParticleScale = 1;
        whiteEmitter.maxParticleScale = 4;
        whiteEmitter.gravity = 100;

        redEmitter = this.add.emitter(0, 0, 100);
        redEmitter.makeParticles('redParticle');
        redEmitter.gravity = 1000;
        redEmitter.minParticleScale = 1;
        redEmitter.maxParticleScale = 4;

        blackEmitter = this.add.emitter(0,0, 100);
        blackEmitter.makeParticles('blackParticle');
        blackEmitter.gravity = 300;

        blueEmitter = this.add.emitter(0, 0, 100)
        blueEmitter.makeParticles('blueParticle')

        distanceLabelGameOverScreen = this.add.text(this.world.width/2, this.world.height/2);
        distanceLabelGameOverScreen.text = "GameOver";
        distanceLabelGameOverScreen.anchor.setTo(0.5);
        distanceLabelGameOverScreen.font = 'Press Start 2P';
        distanceLabelGameOverScreen.fontSize = 30;
        distanceLabelGameOverScreen.fill = '#000000'

        distanceLabelGameOverScreen.alpha = 0;


    },

    update: function() {

        this.physics.arcade.collide(enemy, player, this.collisionHandler, null, this);
        this.physics.arcade.collide(player, coins, this.coinCollisionHandler);
        bg.tilePosition.x -= 2;



        if(menuTurnedOn === true && this.game.input.pointer1.isDown === true && this.game.input.pointer1.y > this.world.height/2 && this.game.input.pointer1.y < (this.world.height/4)*3
              ||  this.input.activePointer.leftButton.isDown === true){
            menuTurnedOn = false;
        }

        if (menuTurnedOn === false && isGameOverScreenOn === false) {
            tapToStart.visible = false;

            parsecDistanceLabel.visible = true;
            coinAmountLabel.visible = true;
            smallCoinIcon.visible = true;

            this.playerMove(player);
            this.distanceTraveled();
            this.createEnemy();
            this.enemiesMove(enemy);
            this.destroyCoins();
            this.coinLabelTextFun(cash);

         } else {
            tapToStart.visible = true;
            // sound.visible = true;
            parsecDistanceLabel.visible = false;
            coinAmountLabel.visible = false;
            smallCoinIcon.visible = false;

        }

    },
    render: function(){

    },
    enemiesMove: function(sprite){
        sprite.y += enemySpeed;
        if(sprite.y >= this.world.height){
            this.enemyPositions(sprite);
            score +=  1;
        }
    },
    enemyPositions: function(sprite){
        sprite.body.velocity.y = g;
        sprite.y = 0-sprite.height/2;//make sure on canvas
        sprite.x = this.rnd.integerInRange(0+sprite.width/2, this.world.width-sprite.width/2);

        let randomX = this.rnd.integerInRange(0, 640);
        if (score >= 9){
            g += 10
        }
        if (sprite.x <= this.world.width/2){
            sprite.x = randomX;
        }
        else{
            sprite.x = randomX;
        }

    },
    playerMove: function(sprite){
    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        sprite.scale.x = -.3;
        player.animations.play('flying', 8 , true);
        sprite.x -= 10;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        sprite.scale.x = .3;
        player.animations.play('flying', 8 , true);
        sprite.x += 10;
    }

    if (this.input.pointer1.isDown)
    {
        if (this.input.pointer1.x > this.world.width/2) {
            sprite.scale.x = .3;
            player.animations.play('flying', 8 , true);
            sprite.x += 10;
        } else {
            sprite.scale.x = -.3;
            player.animations.play('flying', 8 , true);
            sprite.x -= 10;
        }
    }
    else {
        sprite.body.velocity.setTo(0, 0);
    }

    },
    distanceTraveled: function(){
        distanceParsecNew += 1;
        var pointsTween = this.add.tween(this);
		pointsTween.to({ distanceParsecOld: distanceParsecNew }, 1000, Phaser.Easing.Linear.None, true, 500);

        pointsTween.onUpdateCallback(function(){
			parsecDistanceLabel.setText('Distance in ft: ' + Math.floor(distanceParsecNew));
		}, this);

        distanceParsecOld = distanceParsecNew;
    },
    coinLabelTextFun: function(ilosc){
        coinAmountLabel.text =  ilosc;
    },
    collisionHandler: function() {
        whiteEmitter.x = player.x;
        whiteEmitter.y = player.y;

        redEmitter.x = player.x;
        redEmitter.y = player.y;

        this.camera.shake(0.025, 100);
        whiteEmitter.start(true, 400, null, 30);
        redEmitter.start(true, 400, null, 10);

        player.destroy();

        this.destroyEnemy(enemy);
        menuTurnedOn = true;

        this.gameOverScreen();
    },
    createEnemy: function(){
        if(checkIfEnemyCreated === false){

            cash = 0 ;

            enemy = this.add.sprite(0, -400, 'enemy');
            this.physics.arcade.enable(enemy);
            enemy.enableBody = true;
            enemy.body.immovable = true;
            enemy.scale.setTo(0.1);


            checkIfEnemyCreated = true;
        }
    },
    destroyEnemy: function(sprite){
        if(menuTurnedOn === true && checkIfEnemyCreated === true){
            sprite.destroy();
            checkIfEnemyCreated = false;
         }
    },
    spawnCoin: function(){
        if(menuTurnedOn === false){
            let random = this.rnd.integerInRange(0, 1);
            let randomCoin = this.rnd.integerInRange(0, 480);
            let rndGirl = this.rnd.integerInRange(0,2);

            if (rndGirl === 0) {
                coin = this.add.sprite(randomCoin, -100 ,'coin', 0);
            } else if (rndGirl === 1) {
                coin = this.add.sprite(randomCoin, -100 ,'coin2', 0);
            } else if(rndGirl === 2) {
                coin = this.add.sprite(randomCoin, -100 ,'coin3', 0);
            }

            this.physics.arcade.enable(coin);
            coin.enableBody = true;
            coin.scale.setTo(0.2);
            coin.anchor.setTo(0.5);
            rotating = coin.animations.add('rotating');
            coin.animations.play('rotating',10, true);
            coin.body.gravity.y = universeSpeed;

            coins.add(coin);
        }
   },
    startSpawning: function() {
        let random = this.rnd.integerInRange(1, 100)

        this.spawnCoin(this)
    },
    destroyCoins: function() {
        coins.forEach(function(object) {
            if(object.y >= this.world.height) {
                object.destroy();
            }
        }, this);
    },
    coinCollisionHandler: function(player, coins){
        coinSound.play('', 0, 1, false);

        emitter.x = coins.x;
        emitter.y = coins.y;

        coins.destroy();
        emitter.start(true, 400, null, 30);

        let increasingValue = 1;

        cash += increasingValue;
    },
    gameOverScreen: function(){
        isGameOverScreenOn = true;

        whiteSplash = this.add.sprite(this.world.width/2, this.world.height/2, 'whiteSplash');
        whiteSplash.anchor.setTo(0.5);

        whiteSplash.alpha = 0;

        var tween = this.add.tween(whiteSplash).to({alpha:1}, 2000, Phaser.Easing.Linear.None, true, 0);

        tween.onComplete.addOnce(function(){
            this.highScoreFunc();
        }, this);

    },
    resetFun: function(){
        distanceParsecOld = 0;
        distanceParsecNew = 0;
        cash = 0;
        g = 300;
    },
    highScoreFunc: function(){
        if(localStorage.getItem('highscore') === null){
            localStorage.setItem('highscore', distanceParsecNew);
        }
        else if(distanceParsecNew > localStorage.getItem('highscore')){
            localStorage.setItem('highscore', distanceParsecNew);
         }

        if(localStorage.getItem('money') === null){
            localStorage.setItem('money', cash);
        }
        else if(localStorage.getItem('money')!= null){
            var money = cash + localStorage.getItem('money');
            localStorage.setItem('money', money);
         }

        distanceEndGameLabel = this.add.text(this.world.width/2, this.world.height/2);
        distanceEndGameLabel.anchor.setTo(0.5);
        distanceEndGameLabel.font = 'Press Start 2P';
        distanceEndGameLabel.fontSize = 30;
        distanceEndGameLabel.fill = '#000000'

        coinAmountGameOverScreenLabel = this.add.text((this.world.width/2), (this.world.height/2)+100);
        coinAmountGameOverScreenLabel.anchor.setTo(0.5);
        coinAmountGameOverScreenLabel.font = 'Press Start 2P';
        coinAmountGameOverScreenLabel.fontSize = 20;
        coinAmountGameOverScreenLabel.fill = '#000000'

        var x = 0;

        var distanceTween = this.add.tween(this);
        distanceTween.to({ x: distanceParsecNew }, 2000, Phaser.Easing.Linear.None, true, 500);

        distanceTween.onUpdateCallback(function(){
            distanceEndGameLabel.setText('You ran: '+ Math.floor(this.x) +' ft');
        }, this);


        distanceTween.onComplete.addOnce(function() {
            blackEmitter.x = distanceEndGameLabel.x;
            blackEmitter.y = distanceEndGameLabel.y;

            this.camera.shake(0.025, 200);
            blackEmitter.start(true, 400, null, 15);

            var littleCoin = this.add.sprite((this.world.width/2)-200, (this.world.height/2)+100, 'coin');
            littleCoin.scale.setTo(0.3);
            littleCoin.anchor.setTo(0.5);

            var coin_amount = 0;

            var coinAmountTween = this.add.tween(this);
            coinAmountTween.to({coin_amount: cash }, 2000, Phaser.Easing.Linear.None, true, 500);

            coinAmountTween.onUpdateCallback(function(){
                coinAmountGameOverScreenLabel.setText('You got ' + Math.round(this.coin_amount) +' hoes');
            }, this);


                coinAmountTween.onComplete.addOnce(function(){
                    if (Math.round(this.coin_amount >= 5)) {
                        window.location.replace("http://youtube.com");
                    }
                var retry = this.add.text((this.world.width/2), (this.world.height/2)+300);
                retry.anchor.setTo(0.5);
                retry.text = "Do you want to play again?"
                retry.font = 'Press Start 2P';
                retry.fontSize = 45;
                retry.fill = '#000000';

                retry.destroy();
                littleCoin.destroy();
                coinAmountGameOverScreenLabel.destroy();
                distanceEndGameLabel.destroy();
                this.add.tween(whiteSplash).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0);

                this.createNewPlayer();
                this.resetFun();
                isGameOverScreenOn = false;
            }, this);
        }, this);


    },
    createNewPlayer: function(){
        player = this.add.sprite(160,310,'player');
        this.physics.arcade.enable(player);
        player.enableBody = true;
        player.body.gravity.y = - this.physics.arcade.gravity.y;
        player.body.immovable = true;
        player.scale.setTo(0.3);
        player.body.collideWorldBounds =true;
        player.anchor.setTo(0.5, 0);
        flying = player.animations.add('flying');
    }
}