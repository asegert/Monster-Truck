var MonsterTruck = MonsterTruck || {};

MonsterTruck.GameState = {
    create: function ()
    {
        this.playerRotation = 0;
        this.enemyRotation = 0;
        this.over = false;
        this.jumping = false;
        this.disable = false;
        //Adds horn sound
        //MonsterTruck.audio.volume = 0.3;
        var sound = this.add.audio('horn');
        sound.play();
        sound.onStop.add(function()
        {
            //MonsterTruck.audio.volume = 1;
        }, this);
        //Get variable values
        this.allData = JSON.parse(this.game.cache.getText('monsterData'));
        this.startBattleOne();
    },
    startBattleOne: function()
    {
        //Boolean to track whether the climb has begun or not
        this.start = true;
        //Hill to climb
        this.add.image(0, 0, 'hill');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Truck to climb up
        this.sprite = this.add.sprite(250, 420, 'player');
        //this.sprite.animations.add('walk');
        
        //this.sprite.animations.play('walk', 5, true);
        this.sprite.scale.setTo(-0.3, 0.3);
        
        this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.checkCollision.up = false;
	    this.sprite.body.checkCollision.down = false;
        //Instructions
        this.ins = this.add.sprite(0, 0, 'battle1Ins');
        //Gas pedal to 'fuel' the car on it's climb
        this.gas = this.add.sprite(750, 530, 'gas');
        this.gas.anchor.setTo(0.5, 0.5);
        this.gas.inputEnabled = true;
        this.gas.events.onInputDown.add(function()
        {
            //Remove the instructions
            this.ins.alpha=0;
            //Show that pedal is active
            this.gas.alpha=0.8;
            this.gas.rotation = -0.2;
            //Pause the flashing text
            this.alertTween.pause();
            this.alert.alpha=0;
            //Move the car
            this.sprite.body.velocity.x=217.8;
            this.sprite.body.velocity.y=-180;
        }, this);
        this.gas.events.onInputUp.add(function()
        {
            //Resume previous pedal and text
            this.gas.alpha=1;
            this.gas.rotation = 0;
            this.alertTween.resume();
            this.start = false;
            //Reverse velocity so truck 'falls downhill'
            this.sprite.body.velocity.x=-242;
            this.sprite.body.velocity.y=200;
        }, this);
        //Alert to hit the gas
        this.alert = this.add.sprite(700, 350, 'alertMain');
        this.alert.scale.setTo(0.5, 0.5);
        this.alert.alpha=0;
        this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        //Angle the truck travels on the hill
        this.sprite.angle=-40;
        this.world.bringToTop(this.ins);
    },
    startBattleTwo: function()
    {
        //Pull away from the opponent
        this.battleArena = this.add.sprite(-1920, 0, 'battleArenaHorizontal');
        
        this.chain = this.add.sprite(320, 440, 'chain');            
        this.battlePlayer = this.add.sprite(50, 500, 'player');
        this.battleEnemy = this.add.sprite(900, 500, 'enemy3');
        this.battlePlayer.scale.setTo(0.5, 0.5);
        this.battleEnemy.scale.setTo(-0.5, 0.5);
                    
        this.battlePlayer.anchor.setTo(0.1, 0.5);
        this.battleEnemy.anchor.setTo(0.1, 0.5);
        this.cord = new Phaser.Line(this.battlePlayer.x, this.battlePlayer.y, this.battleEnemy.x, this.battleEnemy.y);
                        
        this.ins = this.add.sprite(0, 0, 'battle3Ins');
                    
        this.gas = this.add.button(460, 420, 'gas', function()
        {
            if(this.ins!=undefined)
            {
                this.ins.alpha=0;
                this.ins=undefined;
                                
                this.time.events.loop(Phaser.Timer.SECOND, function()
                {
                    if(!this.over)
                        this.add.tween(this.battleArena).to({x: this.battleArena.x - (Math.round(Math.random()*50))}, 100, "Linear", true);
                }, this);
            }
            if(!this.over)
                this.add.tween(this.battleArena).to({x: this.battleArena.x + 30}, 100, "Linear", true);
         }, this);
         //Alert to hit the gas
         this.alert = this.add.sprite(400, 420, 'alertBattle');
         this.alert.scale.setTo(0.5, 0.5);
         this.alert.alpha=0;
         this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
         this.world.bringToTop(this.ins);
    },
    startBattleThree: function()
    {
        //Jump
        this.battleArena = this.add.sprite(0, 0, 'battleArenaJump');
        this.physics.enable(this.battleArena, Phaser.Physics.ARCADE);
                    
        this.battlePlayer = this.add.sprite(100, 500, 'player');
        //this.battleEnemy = this.add.sprite(900, 250, 'enemy2');
        this.battlePlayer.scale.setTo(-0.5, 0.5);
        //this.battleEnemy.scale.setTo(-0.5, 0.5);
                    
        this.battlePlayer.anchor.setTo(0.9, 0.5);
        //this.battleEnemy.anchor.setTo(0.1, 0.5);
                        
        this.ins = this.add.sprite(0, 0, 'battle2Ins');
                    
        this.gas = this.add.button(460, 420, 'gas', function()
        {
            if(this.ins!=undefined)
            {
                this.ins.alpha=0;
                this.ins=undefined;
            } 
            if(!this.disable)
                this.battleArena.body.velocity.x-=10;
        }, this);
        //Alert to hit the gas
        this.alert = this.add.sprite(400, 420, 'alertBattle');
        this.alert.scale.setTo(0.5, 0.5);
        this.alert.alpha=0;
        this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        this.world.bringToTop(this.ins);
        
        this.jump1 = this.add.sprite(1380, 600, 'jump');
        this.physics.enable(this.battlePlayer, Phaser.Physics.ARCADE);
        this.physics.enable(this.jump1, Phaser.Physics.ARCADE);
    },
    update: function()
    {
        //Checks that the truck has not hit the top or bottom of the hill and reacts accordingly if so
        if(!this.start && this.sprite.y >= 420)
        {
            this.sprite.body.velocity.x=0;
            this.sprite.body.velocity.y=0;
            this.start = true;
        }
        if(this.sprite.x > 900)
        {
            console.log('end');
        }
        /*if(this.battleArena.x >= -50)
            {
                console.log('player win');
                this.over = true;
            }
            else if(this.battleArena.x <=-3750)
            {
                console.log('player lose');
                this.over = true;
            }*/
        /*if(this.battleArena.x<-900 && this.battleArena.x >-2050 && !this.jumping)
        {
            this.disable = true;
            this.jumping = true;
            var rot = this.add.tween(this.battlePlayer).to({angle: -30}, (0.001 * this.battleArena.body.velocity.x), "Linear", true);
            rot.onComplete.add(function()
            {
                this.add.tween(this.battlePlayer).to({x: 300, y: 250}, (3 * this.battleArena.body.velocity.x), "Linear", true);
            }, this);
        }
        if(this.battleArena.x < -3500 && this.over)
        {
            this.over = false;
            this.battleArena.body.velocity.x=0;
            var rotate = this.add.tween(this.battlePlayer).to({angle: 20}, (2 * this.battleArena.body.velocity.x), "Linear", true);
            rotate.onComplete.add(function()
            {
                this.add.tween(this.battlePlayer).to({angle: 0}, (0.2 * this.battleArena.body.velocity.x), "Linear", true);
            }, this);
            this.add.tween(this.battlePlayer).to({x: 1000, y: 500}, (2.8 * this.battleArena.body.velocity.x), "Linear", true);
        }
        if(this.battleArena.x<-2050 && this.jumping)
        {
            this.jumping = false;
            this.over = true;
            this.add.tween(this.battlePlayer).to({angle: -10}, (1 * this.battleArena.body.velocity.x), "Linear", true);
        }*/
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/