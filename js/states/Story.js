var MonsterTruck = MonsterTruck || {};

MonsterTruck.StoryState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'story');
        
        if(MonsterTruck.Climb === undefined)
        {
            var g1 = this.add.video('gif');
            g1.play(true);
            g1.addToWorld(0, 0, 0.1, 0.1, 0.7, 0.7);
        
            var g2 = this.add.video('gif2');
            g2.play(true);
            g2.addToWorld(960, 0, 0.9, 0.1, 1.3, 1.3);
        
            var g3 = this.add.video('gif4');
            g3.play(true);
            g3.addToWorld(0, 640, 0.1, 0.9, 0.8, 0.8);
        
            var g4 = this.add.video('gif1');
            g4.play(true);
            g4.addToWorld(960, 640, 0.9, 0.9);
        
            var g5 = this.add.video('gif3');
            g5.play(true);
            g5.addToWorld(480, 320, 0.5, 0.5, 0.7, 0.7);
        
            this.add.sprite(40, 0, 'logo');
        
            //Enter the monster dome button
            this.button = this.add.button(100, 350, 'mainButton', function()
            {
                MonsterTruck.Climb=true;
                this.state.start('Story');
            }, this);
        }
        else
        {
            this.start = true;
            this.add.image(0, 0, 'hill');
            this.physics.startSystem(Phaser.Physics.ARCADE);
        
            this.sprite = this.add.sprite(160, 580, 'monster');
            this.sprite.animations.add('walk');

            this.sprite.animations.play('walk', 5, true);
        
            this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	        this.sprite.body.checkCollision.up = false;
	        this.sprite.body.checkCollision.down = false;

            this.ins = this.add.sprite(0, 0, 'mainIns');
            
            this.pedal = this.add.sprite(700, 420, 'gas');
            this.pedal.inputEnabled = true;
            this.pedal.events.onInputDown.add(function()
            {
                this.ins.alpha=0;
                this.alertTween.pause();
                this.alert.alpha=0;
                this.sprite.body.velocity.x=108.9;
                this.sprite.body.velocity.y=-90;
            }, this);
            this.pedal.events.onInputUp.add(function()
            {
                this.ins.alpha=1;
                this.alertTween.resume();
                this.start = false;
                this.sprite.body.velocity.x=-145.2;
                this.sprite.body.velocity.y=120;
            }, this);
            
            this.alert = this.add.sprite(700, 350, 'alertMain');
            this.alert.scale.setTo(0.5, 0.5);
            this.alert.alpha=0;
            this.alertTween = this.add.tween(this.alert).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        
            this.sprite.angle=-40;
        }
    },
    update: function ()
    {
        if(MonsterTruck.Climb)
        {
            if(!this.start && this.sprite.y >= 581)
            {
                this.sprite.body.velocity.x=0;
                this.sprite.body.velocity.y=0;
                this.start = true;
            }
            if(this.sprite.x > 960)
            {
                this.state.start('Game');
            }
        }
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/