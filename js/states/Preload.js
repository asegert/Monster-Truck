var MonsterTruck = MonsterTruck || {};

MonsterTruck.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('logo', 'assets/images/main-logo.png');
        this.load.image('mainButton', 'assets/images/main-start-button.png');
        this.load.image('story', 'assets/images/menu-background.jpg');
        this.load.image('alertMain', 'assets/images/press-the-pedal.png');
        this.load.image('coupon', 'assets/images/monsterTruck_coupon.jpg');
        this.load.image('scoreboard', 'assets/images/scoreboard.png');
        
        this.load.image('mainIns', 'assets/images/menu-instructions.png');
        this.load.image('battle1Ins', 'assets/images/battle1-instructions.png');
        this.load.image('battle2Ins', 'assets/images/battle2-instructions.png');
        this.load.image('battle3Ins', 'assets/images/battle3-instructions.png');
        
        
        this.load.image('player', 'assets/images/truck.png');
        this.load.image('battleTruck', 'assets/images/battle-trigger-truck.png');
        
        this.load.image('enemy1', 'assets/images/enemy-one-top.png');
        this.load.image('enemy2', 'assets/images/enemy-two-top.png');
        this.load.image('enemy3', 'assets/images/enemy-three-top.png');
        this.load.image('enemy1crushed', 'assets/images/enemy-one-crushed.png');
        this.load.image('enemy2crushed', 'assets/images/enemy-two-crushed.png');
        this.load.image('enemy3crushed', 'assets/images/enemy-three-crushed.png');
        
        this.load.image('battleArena', 'assets/images/battleArena.png');
        this.load.image('arena', 'assets/images/arena.png');
        this.load.image('hill', 'assets/images/hill.png');
        this.load.image('barrelBlue', 'assets/images/barrel_blue.png');
        this.load.image('barrelRed', 'assets/images/barrel_red.png');
        this.load.image('raceRed', 'assets/images/barrier_red_race.png');
        this.load.image('raceWhite', 'assets/images/barrier_white_race.png');
        this.load.image('cone', 'assets/images/cone_straight.png');
        this.load.image('oil', 'assets/images/oil.png');
        this.load.image('gas', 'assets/images/gas.png');
        this.load.image('ramp', 'assets/images/ramp.png');
        this.load.image('ramp2', 'assets/images/ramp2.png');
        this.load.image('blockerWidth', 'assets/images/blockerWidth.png');
        this.load.image('blockerHeight', 'assets/images/blockerHeight.png');
        this.load.image('blockerMid', 'assets/images/blockerMid.png');
        this.load.image('winner', 'assets/images/winner.png');
        
        
        this.load.spritesheet('monster', 'assets/images/player.png', 117, 59, 5);
        
        
        this.load.spritesheet('carsUp', 'assets/images/carsUp.png', 60, 60, 3);
        this.load.spritesheet('carsDown', 'assets/images/carsDown.png', 60, 60, 3);
        this.load.spritesheet('carsLeft', 'assets/images/carsLeft.png', 60, 60, 3);
        this.load.spritesheet('carsRight', 'assets/images/carsRight.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedUp', 'assets/images/carsCrushedUp.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedDown', 'assets/images/carsCrushedDown.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedLeft', 'assets/images/carsCrushedLeft.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedRight', 'assets/images/carsCrushedRight.png', 60, 60, 3);
        
        this.load.text('monsterData', 'assets/data/monsterTruck.json');
        
        this.load.audio('horn', ['assets/audio/stadiumHorn.mp3', 'assets/audio/stadiumHorn.m4a', 'assets/audio/stadiumHorn.ogg']);
        this.load.audio('sunday', ['assets/audio/Sunday.mp3', 'assets/audio/Sunday.m4a', 'assets/audio/Sunday.ogg']);
        this.load.audio('background', ['assets/audio/monsterTruckBackground.mp3', 'assets/audio/monsterTruckBackground.m4a', 'assets/audio/monsterTruckBackground.ogg']);
        
        this.load.video('gif', 'assets/video/gif.mp4');
        this.load.video('gif1', 'assets/video/gif1.mp4');
        this.load.video('gif2', 'assets/video/gif2.mp4');
        this.load.video('gif3', 'assets/video/gif3.mp4');
        this.load.video('gif4', 'assets/video/gif4.mp4');
    },
    create: function ()
    {
        this.state.start('Story');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/