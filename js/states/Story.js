var MonsterTruck = MonsterTruck || {};

MonsterTruck.StoryState = {
    create: function ()
    {
        //Background for both story screens
        this.background = this.add.sprite(0, 0, 'story');
        //If the player should not be entering the dome
        //Audio
        MonsterTruck.audio = this.add.audio('background');
        MonsterTruck.audio.play('', 0, 1, true);
        MonsterTruck.audio.volume = 0.3;
        var sound = this.add.audio('sunday');
        sound.play();
        sound.onStop.add(function()
        {
            MonsterTruck.audio.volume = 1;
        }, this);
        //Video
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
        
        //Logo
        this.add.sprite(100, 0, 'logo');
        
        //Enter the monster dome button
        this.button = this.add.button(100, 350, 'mainButton', function()
        {
            MonsterTruck.Level=0;
            this.state.start('Game');
        }, this);
        this.button.alpha = 0;
        this.add.tween(this.button).to({alpha: 1}, 500, "Linear", true, 0, -1);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/