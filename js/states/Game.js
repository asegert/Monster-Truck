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
        MonsterTruck.audio.volume = 0.3;
        var sound = this.add.audio('horn');
        sound.play();
        sound.onStop.add(function()
        {
            MonsterTruck.audio.volume = 1;
        }, this);
        if(MonsterTruck.Level === 0)
        {
            this.startBattleOne();
        }
        else if(MonsterTruck.Level === 1)
        {
            this.startBattleTwo();
        }
        else if(MonsterTruck.Level === 2)
        {
            this.startBattleThree();
        }
        else
        {
            this.state.start('End');
        }
    },
    startBattleOne: function()
    {
        this.battleArena = this.add.sprite(0, 0, 'battleArenaHorizontal');
        //Boolean to track whether the climb has begun or not
        this.start = true;
        this.holding = false;
        //Hill to climb
        this.add.image(0, 0, 'hill');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.gauge = this.add.sprite(0, 0, 'gauge');
        this.hand = this.add.sprite(108, 110, 'hand');
        this.hand.anchor.setTo(0.5, 0.2);
        //Truck to climb up
        this.sprite = this.add.sprite(100, 550, 'playerRight');
        this.sprite.animations.add('walk');
        
        this.times = 10;
        this.countDown = this.add.text(200, 0, `Time: ${this.times}`, {fill: '#ff0000', font: '28px Arial', stroke: '#ffff00', strokeThickness: '3'});
        this.counting = false;
        
        this.sprite.animations.play('walk', 5, true);
        this.sprite.scale.setTo(0.3, 0.3);
        
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
            if(!this.counting)
            {
               this.counting = true;
                this.time.events.repeat(Phaser.Timer.SECOND, 11, function()
                {
                    this.times--;
                    if(this.times >= 0)
                        this.countDown.setText(`Time: ${this.times}`);
                    else
                    {
                        this.gas.destroy();
                        this.sprite.body.velocity.x+=-968;
                        this.sprite.body.velocity.y+=800;
                        this.countDown.setText(`You Lose`);
                        this.time.events.add(Phaser.Timer.SECOND, function()
                        {
                            MonsterTruck.Level++;
                            this.state.start('End');
                        }, this);
                    }
                 }, this);
            }//Remove the instructions
            this.ins.alpha=0;
            //Show that pedal is active
            this.gas.alpha=0.8;
            this.gas.rotation = -0.2;
            //Pause the flashing text
            this.alertTween.pause();
            this.alert.alpha=0;
            //Move the car
            this.sprite.body.velocity.x+=12.1;
            this.sprite.body.velocity.y+=-10;
            this.hand.rotation+=0.1;
        }, this);
        this.gas.events.onInputUp.add(function()
        {
            //Resume previous pedal and text
            this.gas.alpha=1;
            this.gas.rotation = 0;
            this.alertTween.resume();
            this.start = false;
        }, this);
        //Alert to hit the gas
        this.alert = this.add.sprite(700, 350, 'alertBattle');
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
        this.battleArena = this.add.tileSprite(0, 0, 960, 640, 'battleArenaHorizontal');
        this.insAlert = this.add.text(300, 0, `Tug-o-War`, {fill: '#ff0000', font: '64px Arial', stroke: '#ffff00', strokeThickness: '3'});
        this.distance = this.add.text(0, 0, `Distance: ${Math.abs(this.battleArena.x)}feet`, {fill: '#ffffff'});
        
        this.chain = this.add.sprite(320, 440, 'chain');            
        this.battlePlayer = this.add.sprite(50, 500, 'player');
        this.battleEnemy = this.add.sprite(600, 500, 'enemyRight');
        this.battlePlayer.scale.setTo(0.5, 0.5);
        this.battleEnemy.scale.setTo(0.5, 0.5);
                    
        this.battlePlayer.anchor.setTo(0.1, 0.5);
        this.battleEnemy.anchor.setTo(0.1, 0.5);
        this.cord = new Phaser.Line(this.battlePlayer.x, this.battlePlayer.y, this.battleEnemy.x, this.battleEnemy.y);
        this.battlePlayer.animations.add('walk');
        this.battlePlayer.animations.play('walk', 5, true);
        this.battleEnemy.animations.add('walk');   
        this.battleEnemy.animations.play('walk', 5, true);
        
        this.arrow = this.add.sprite(125, 250, 'arrow');
        this.arrow.alpha = 0;
        this.add.tween(this.arrow).to({alpha: 1}, 500, "Linear", true, 0, -1);
        
        this.pull=0.1;
                        
        this.ins = this.add.sprite(0, 0, 'battle3Ins');
        this.count = -1;          
        this.gas = this.add.button(460, 420, 'gas', function()
        {
            this.count++;
            if(this.ins!=undefined)
            {
                this.ins.alpha=0;
                this.ins=undefined;
                                
                this.time.events.loop(Phaser.Timer.SECOND, function()
                {
                    if(!this.over)
                        this.pull-=0.1;
                }, this);
            }
            else if(this.count >= 10)
                this.arrow.destroy();
            if(!this.over)
                this.pull+=0.05
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
        this.battleArena = this.add.tileSprite(0, 0, 960, 640, 'battleArenaHorizontal');//this.add.sprite(0, 0, 'battleArenaJump');
        this.physics.enable(this.battleArena, Phaser.Physics.ARCADE);
        
        this.powerText = this.add.text(0, 4, 'Speed: ', {fill: '#ffffff'});
        this.power = new Phaser.Line(50, 10, 51, 10);
                    
        this.battlePlayer = this.add.sprite(250, 500, 'playerRight');
        //this.battleEnemy = this.add.sprite(900, 250, 'enemy2');
        this.battlePlayer.scale.setTo(0.5, 0.5);
        //this.battleEnemy.scale.setTo(-0.5, 0.5);
                    
        this.battlePlayer.anchor.setTo(0.1, 0.5);
        this.battlePlayer.animations.add('walk');
        this.battlePlayer.animations.play('walk', 5, true);
                        
        this.ins = this.add.sprite(0, 0, 'battle2Ins');
        this.pull = 0;
                    
        this.gas = this.add.button(760, 420, 'gas', function()
        {
            if(this.ins!=undefined)
            {
                this.ins.alpha=0;
                this.ins=undefined;
            } 
            if(this.jump===undefined)
            {
                this.pull+=0.5;
                this.power = new Phaser.Line(50, 10, 50 + Math.abs(this.pull*10), 10);
            }
        }, this);
        //Alert to hit the gas
        this.alert = this.add.sprite(700, 420, 'alertBattle');
        this.alert.scale.setTo(0.5, 0.5);
        this.alert.alpha=0;
        this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        this.world.bringToTop(this.ins);
        
        this.physics.enable(this.battlePlayer, Phaser.Physics.ARCADE);
    },
    update: function()
    {
        if(MonsterTruck.Level === 0)
        {
            //Checks that the truck has not hit the top or bottom of the hill and reacts accordingly if so
            if(!this.start && this.sprite.y >= 600)
            {
                this.sprite.body.velocity.x=0;
                this.sprite.body.velocity.y=0;
                this.start = true;
            }
            if(this.sprite.x > 900)
            {
                MonsterTruck.Level++;
                this.state.start('End');
            }
        }
        else if(MonsterTruck.Level === 1)
        {
            this.distance.setText(`Distance: ${Math.round(this.battleArena.tilePosition.x)} feet`);
            this.battleArena.tilePosition.x+=this.pull;
            if(this.battleArena.tilePosition.x >= 900)
            {
                console.log('player win');
                MonsterTruck.Level++;
                this.state.start('End');
            }
            else if(this.battleArena.tilePosition.x <=-500)
            {
                console.log('player lose');
                MonsterTruck.Level++;
                this.state.start('End');
            }
        }
        else if(MonsterTruck.Level === 2)
        {
            this.battleArena.tilePosition.x-=this.pull;
            if(this.battleArena.tilePosition.x <= -900 && this.jump===undefined)
            {
                this.jump = this.add.sprite(960, 500, 'jump');
                this.moveTween = this.add.tween(this.jump).to({x: 450}, 1000, "Linear", true);
                this.moveTween.onComplete.add(function()
                {
                    this.add.tween(this.jump).to({x: -300}, 3000, "Linear", true);
                    var rot = this.add.tween(this.battlePlayer).to({angle: -30}, (1000), "Linear", true);
                    rot.onComplete.add(function()
                    {
                        var higher = this.add.tween(this.battlePlayer).to({x: 300, y: 250}, (1000), "Linear", true);
                        higher.onComplete.add(function()
                        {
                            var rotate = this.add.tween(this.battlePlayer).to({angle: -10}, 1000, "Linear", true);
                            
                            this.time.events.add(Phaser.Timer.SECOND * 3, function()
                            {
                                this.add.text(120, 200, `The Truck Jumped ${Math.round(Math.abs((this.pull * 10)))} feet`, {fill: '#ff0000', font: '64px Arial', stroke: '#ffff00', strokeThickness: '3'});
                                this.add.tween(this.battlePlayer).to({angle: 20}, 500, "Linear", true);
                                this.add.tween(this.battlePlayer).to({y: 500}, 2000, "Linear", true);
                                
                                this.jump = this.add.sprite(960, 500, 'jump');
                                this.jump.scale.setTo(-1, 1);
                                this.moveTweens = this.add.tween(this.jump).to({x: 650}, 1000, "Linear", true);
                                this.moveTweens.onComplete.add(function()
                                {
                                    this.add.tween(this.battlePlayer).to({angle: 0}, 2000, "Linear", true);
                                    var end = this.add.tween(this.jump).to({x: -300}, 3000, "Linear", true);
                                    end.onComplete.add(function()
                                    {
                                        MonsterTruck.Level++;
                                        this.state.start('End')
                                    }, this);
                                }, this);
                            }, this);
                        }, this);
                    }, this);
                }, this);
            }
        }
    },
    render: function() 
    {
        if(MonsterTruck.Level === 2 && this.power!=undefined)  
        {
            var graphics=this.game.add.graphics(10,0);
            var graphics=this.game.add.graphics(this.power.start.x,this.power.start.y);
            graphics.lineStyle(30, 0xff0000, 30);
            graphics.moveTo(this.power.start.x, this.power.start.y);
            graphics.lineTo(this.power.end.x, this.power.end.y);
            graphics.endFill();

        }

    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/