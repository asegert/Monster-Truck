var MonsterTruck = MonsterTruck || {};

MonsterTruck.GameState = {
    create: function ()
    {
        this.playerRotation = 0;
        this.enemyRotation = 0;
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
        this.startBattleTwo();
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
        this.battleArena = this.add.sprite(0, 0, 'battleArenaHorizontal');
                    
        this.battlePlayer = this.add.sprite(500, 500, 'player');
        this.battleEnemy = this.add.sprite(460, 500, 'enemy3');
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
                                
                this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                {
                    if(this.battleEnemy!= undefined && this.currEnemy === 2 && this.battleEnemy.body!=null)
                    {
                        
                    }
                }, this);
            }
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
        this.battleArena = this.add.sprite(0, 0, 'battleArenaHorizontal');
                    
        this.battlePlayer = this.add.sprite(50, 250, 'player');
        this.battleEnemy = this.add.sprite(900, 250, 'enemy2');
                    
        this.battlePlayer.anchor.setTo(0.1, 0.5);
        this.battleEnemy.anchor.setTo(0.1, 0.5);
                        
        this.ins = this.add.sprite(0, 0, 'battle2Ins');
                    
        this.gas = this.add.button(460, 420, 'gas', function()
        {
            if(this.ins!=undefined)
            {
                this.ins.alpha=0;
                this.ins=undefined;
                                
                this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                {
                    
                }, this);
            }
                            
        }, this);
        //Alert to hit the gas
        this.alert = this.add.sprite(400, 420, 'alertBattle');
        this.alert.scale.setTo(0.5, 0.5);
        this.alert.alpha=0;
        this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        this.world.bringToTop(this.ins);
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
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/