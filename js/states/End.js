var MonsterTruck = MonsterTruck || {};

MonsterTruck.EndState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'story');
        
        var g1 = this.add.video('gif');
        g1.play(true);
        g1.addToWorld(this.world.centerX-40, this.world.centerY-30, 0.9, 0.9, 0.67, 0.7);
        
        var g2 = this.add.video('gif2');
        g2.play(true);
        g2.addToWorld(this.world.centerX+70, this.world.centerY-30, 0.1, 0.9, 1.4, 1.5698);
        
        var g3 = this.add.video('gif4');
        g3.play(true);
        g3.addToWorld(this.world.centerX-40, this.world.centerY+45, 0.9, 0.1, 0.965, 0.8);
        
        var g4 = this.add.video('gif1');
        g4.play(true);
        g4.addToWorld(this.world.centerX+70, this.world.centerY+45, 0.1, 0.1, 0.932, 0.9856);
    
        //this.add.sprite(this.world.centerX, this.world.centerY, 'cone');
        
        var coupon=this.add.sprite(this.world.centerX+15, this.world.centerY+10, 'coupon');
        coupon.anchor.setTo(0.5, 0.5);
        coupon.scale.setTo(0.005, 0.005);
        this.add.tween(coupon.scale).to({x: 1, y:1}, 2000, "Linear", true);
        //coupon on click go to
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/