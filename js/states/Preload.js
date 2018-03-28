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
        this.load.image('alertBattle', 'assets/images/tap-the-pedal.png');
        this.load.image('coupon', 'assets/images/monsterTruck_coupon.jpg');
        
        this.load.image('mainIns', 'assets/images/menu-instructions.png');
        this.load.image('battle1Ins', 'assets/images/battle1-instructions.png');
        this.load.image('battle2Ins', 'assets/images/battle2-instructions.png');
        this.load.image('battle3Ins', 'assets/images/battle3-instructions.png');
        this.load.image('chain', 'assets/images/chain.png');
        
        
        this.load.spritesheet('player', 'assets/images/monsterTruckSpritesheet.png', 700, 420, 8);
        this.load.image('battleTruck', 'assets/images/battle-trigger-truck.png');
        
        this.load.spritesheet('enemy1', 'assets/images/monsterTruckSpritesheetblue.png', 700, 420, 8);
        this.load.spritesheet('enemy2', 'assets/images/monsterTruckSpritesheetpurple.png', 700, 420, 8);
        this.load.spritesheet('enemy3', 'assets/images/monsterTruckSpritesheetred.png', 700, 420, 8);
        
        this.load.image('battleArena', 'assets/images/battleArena.png');
        this.load.image('battleArenaHorizontal', 'assets/images/battleArenaHorizontal.png');
        this.load.image('battleArenaJump', 'assets/images/battleArenaJump.png');
        this.load.image('arena', 'assets/images/arena.png');
        this.load.image('hill', 'assets/images/hill.png');
        this.load.image('gas', 'assets/images/gas.png');
        this.load.image('winner', 'assets/images/winner.png');
        
        this.load.image('jump', 'assets/images/jump.png');
        
        
        this.load.spritesheet('monster', 'assets/images/player.png', 117, 59, 5);

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
        this.state.start('Game');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/