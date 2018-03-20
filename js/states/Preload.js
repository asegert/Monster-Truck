var MonsterTruck = MonsterTruck || {};

MonsterTruck.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

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
        
        
        this.load.spritesheet('player', 'assets/images/player.png', 117, 59, 5);
        this.load.spritesheet('cars', 'assets/images/cars.png', 40, 60, 5);
        this.load.spritesheet('carsCrushed', 'assets/images/carsCrushed.png', 40, 60, 5);
        
        
        this.load.spritesheet('carsUp', 'assets/images/carsUp.png', 60, 60, 3);
        this.load.spritesheet('carsDown', 'assets/images/carsDown.png', 60, 60, 3);
        this.load.spritesheet('carsLeft', 'assets/images/carsLeft.png', 60, 60, 3);
        this.load.spritesheet('carsRight', 'assets/images/carsRight.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedUp', 'assets/images/carsCrushedUp.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedDown', 'assets/images/carsCrushedDown.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedLeft', 'assets/images/carsCrushedLeft.png', 60, 60, 3);
        this.load.spritesheet('carsCrushedRight', 'assets/images/carsCrushedRight.png', 60, 60, 3);
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