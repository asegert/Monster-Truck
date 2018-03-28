var MonsterTruck = MonsterTruck || {};

MonsterTruck.GameState = {
    create: function ()
    {
        this.playerRotation = 0;
        this.enemyRotation = 0;
        this.over = false;
        this.jumping = false;
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
        this.startBattleThree();
    },
    startBattleOne: function()
    {
        this.battleArena = this.add.sprite(0, 0, 'battleArena');
                    
        this.battlePlayer = this.add.sprite(250, 250, 'player');
        this.battleEnemy = this.add.sprite(600, 250, 'enemy1');
                    
        this.battlePlayer.anchor.setTo(0.9, 0.5);
        this.battleEnemy.anchor.setTo(0.9, 0.5);
                    
        this.ins = this.add.sprite(0, 0, 'battle1Ins');
        
        this.gas = this.add.button(460, 420, 'gas', function()
        {
            if(this.ins!=undefined)
            {
                this.ins.alpha=0;
                this.ins=undefined;
                                
                this.playerRotation = 0.1;
                this.enemyRotation = 0.15;
                this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                {
                    this.enemyRotation+=0.05;
                }, this);
            }
                            
            this.playerRotation+=0.01;
        }, this);
        
        //Alert to hit the gas
        this.alert = this.add.sprite(400, 420, 'alertBattle');
        this.alert.scale.setTo(0.5, 0.5);
        this.alert.alpha=0;
        this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
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
            this.battleArena.body.velocity.x+=-10;
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
        /*this.battlePlayer.rotation += this.playerRotation;
        this.battleEnemy.rotation += this.enemyRotation;
        if(this.battlePlayer.rotation > this.battleEnemy.rotation)
        {
            console.log('player wins');
        }
        else if(this.battleEnemy.rotation > 100)
        {
            console.log('player lose');
        }*/
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
        console.log(this.battleArena.x);
        if(this.battleArena.x<-990 && !this.jumping)
        {
            this.jumping = true;
            this.add.tween(this.battlePlayer).to({rotation: -0.5}, 580/this.battleArena.body.velocity.x, "Linear", true);
            this.add.tween(this.battlePlayer).to({y: 300}, 900/this.battleArena.body.velocity.x, "Linear", true);
        }
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/