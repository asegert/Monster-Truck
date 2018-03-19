var MonsterTruck = MonsterTruck || {};

MonsterTruck.StoryState = {
    create: function ()
    {
        this.speed = 0;
        this.start = true;
        this.add.image(0, 0, 'hill');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.sprite = this.add.sprite(160, 580, 'player');
        this.sprite.animations.add('walk');

        this.sprite.animations.play('walk', 5, true);
        
        this.add.sprite(100, 100, 'cars', 4);
        this.add.sprite(200, 100, 'cars', 0);
        this.add.sprite(300, 100, 'cars', 1);
        this.grey = this.add.sprite(400, 100, 'cars', 3);
        //this.add.sprite(0, 0, 'carsCrushed');
        this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.checkCollision.up = false;
	    this.sprite.body.checkCollision.down = false;
        this.physics.enable(this.grey, Phaser.Physics.ARCADE);
        this.grey.body.collideWorldBounds = true;
	    this.grey.body.checkCollision.up = false;
	    this.grey.body.checkCollision.down = false;
	    this.grey.body.immovable = true;
        
        
        this.sprite.inputEnabled = true;

        // Make this item draggable.
        this.sprite.input.enableDrag();
        
        this.pedal = this.add.sprite(600, 400, 'gas');
        this.pedal.inputEnabled = true;
        this.pedal.events.onInputDown.add(function()
        {
            this.sprite.body.velocity.x=60.5;
            this.sprite.body.velocity.y=-50;
            console.log('speed = ' + this.speed);//use a boolean to use update to add and on input up end it
        }, this);
        this.pedal.events.onInputUp.add(function()
        {
            this.start = false;
            this.sprite.body.velocity.x=-60.5;
            this.sprite.body.velocity.y=50;
            console.log('speed = ' + this.speed);//use a boolean to use update to add and on input up end it
        }, this);
        
        this.sprite.angle=-40;
    },
    update: function ()
    {
        this.physics.arcade.collide(this.sprite, this.grey, function()
        {
            this.grey.loadTexture('carsCrushed', 3);
        }, null, this);
        
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