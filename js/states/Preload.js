var MonsterTruck = MonsterTruck || {};

MonsterTruck.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('hill', 'assets/images/hill.png');
        this.load.image('gas', 'assets/images/gas.png');
        
        this.load.spritesheet('player', 'assets/images/player.png', 117, 59, 5);
        this.load.spritesheet('cars', 'assets/images/cars.png', 40, 60, 5);
        this.load.spritesheet('carsCrushed', 'assets/images/carsCrushed.png', 40, 60, 5);
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