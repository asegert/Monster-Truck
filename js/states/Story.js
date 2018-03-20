var MonsterTruck = MonsterTruck || {};

MonsterTruck.StoryState = {
    create: function ()
    {
        /*var g1 = this.add.video('gif');
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
        
        this.add.sprite(40, 0, 'logo');*/
        
        //Enter the monster dome button
        
        
        this.start = true;
        this.add.image(0, 0, 'hill');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.sprite = this.add.sprite(160, 580, 'player');
        this.sprite.animations.add('walk');

        this.sprite.animations.play('walk', 5, true);
        
        this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.checkCollision.up = false;
	    this.sprite.body.checkCollision.down = false;

        this.pedal = this.add.sprite(600, 400, 'gas');
        this.pedal.inputEnabled = true;
        this.pedal.events.onInputDown.add(function()
        {
            this.sprite.body.velocity.x=60.5;
            this.sprite.body.velocity.y=-50;
        }, this);
        this.pedal.events.onInputUp.add(function()
        {
            this.start = false;
            this.sprite.body.velocity.x=-60.5;
            this.sprite.body.velocity.y=50;
        }, this);
        
        this.sprite.angle=-40;
    },
    update: function ()
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
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/