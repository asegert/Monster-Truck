var MonsterTruck = MonsterTruck || {};

MonsterTruck.GameState = {
    create: function ()
    {
        this.carsCrushed = 0;
        this.speed = 0;
        this.start = true;
        this.onRamp = false;
        this.cars = this.add.group();
        this.obstacles = this.add.group();
        this.blockers = this.add.group();
        this.add.sprite(0, 0, 'arena');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.ramp1=this.createRamps(290, 270, 'ramp');
        this.ramp2=this.createRamps(570, 270, 'ramp2');
        
        this.sprite = this.add.sprite(100, 560, 'player');
        this.sprite.animations.add('walk');

        this.sprite.animations.play('walk', 5, true);
        
        this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.collideWorldBounds = true;
        this.sprite.body.checkCollision.up = false;
	    this.sprite.body.checkCollision.down = false;
        
        this.sprite.inputEnabled = true;

        // Make this item draggable.
        this.sprite.input.enableDrag(false);
        //this.sprite.input.dragOffset = new Phaser.Point(-100, 100);
        
        this.createCars(100,150, true);
        this.createCars(80, 150, false);
        this.createCars(300, 100, true);
        this.createCars(400, 100, false);
        this.world.bringToTop(this.cars);
        this.createObstacles(450, 270, 'oil');
        this.createObstacles(500, 20, 'raceRed');
        this.createObstacles(500, 121, 'raceWhite');
        this.createObstacles(500, 416, 'raceRed');
        this.createObstacles(500, 517, 'raceWhite');
        
        //this.createObstacles(50, 50, 'cone');
        //this.createObstacles(30, 500, 'cone');
        //this.createObstacles(90, 500, 'barrelRed');
        this.createObstacles(150, 500, 'barrelBlue');
        //this.createObstacles(210, 500, 'barrelBlue');
        //this.createObstacles(270, 500, 'barrelRed');
        //this.createObstacles(330, 500, 'cone');
        //this.createObstacles(30, 100, 'cone');
        //this.createObstacles(90, 100, 'cone');
        this.createObstacles(150, 100, 'barrelRed');
        //this.createObstacles(210, 100, 'cone');
        //this.createObstacles(270, 100, 'barrelBlue');
        //this.createObstacles(330, 100, 'cone');
        //this.createObstacles(450, 220, 'barrelBlue');
        //this.createObstacles(390, 220, 'cone');
        //this.createObstacles(330, 220, 'barrelRed');
        //this.createObstacles(270, 220, 'barrelRed');
        //this.createObstacles(210, 220, 'cone');
        //this.createObstacles(150, 200, 'cone');
        //this.createObstacles(450, 380, 'barrelRed');
        //this.createObstacles(390, 380, 'cone');
        this.createObstacles(330, 380, 'cone');
        //this.createObstacles(270, 380, 'barrelBlue');
        //this.createObstacles(210, 380, 'cone');
        //this.createObstacles(150, 380, 'barrelRed');
        
        this.createBlockers(0, 0, false);
        this.createBlockers(0, 640, false);
        this.createBlockers(0, 0, true);
        this.createBlockers(960, 0, true);
        this.createBlockers(480, 0, true);
        
        this.world.bringToTop(this.obstacles);
        this.world.bringToTop(this.sprite);
        this.world.bringToTop(this.blockers);
        
        this.time.events.loop(Phaser.Timer.SECOND, this.changeDirection, this);
    },
    createBlockers: function(x, y, height)
    {
        if(height)
        {
            var block = this.add.sprite(x, y, 'blockerHeight');
        }
        else
        {
            var block = this.add.sprite(x, y, 'blockerWidth');
        }
        this.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.collideWorldBounds = true;
	    block.body.checkCollision.up = false;
	    block.body.checkCollision.down = false;
	    block.body.immovable = true;
        
        this.blockers.add(block);
    },
    createCars: function(x, y, horizontal)
    {
        if(horizontal)
        {
            var car = this.add.sprite(x, y, 'carsRight', Math.floor(Math.random()*5));
            this.physics.enable(car, Phaser.Physics.ARCADE);
            car.body.collideWorldBounds = true;
	        car.body.checkCollision.up = false;
	        car.body.checkCollision.down = false;
	        car.body.immovable = true;
            car.body.velocity.x = 100;
        }
        else
        {
            var car = this.add.sprite(x, y, 'carsDown', Math.floor(Math.random()*5));
            this.physics.enable(car, Phaser.Physics.ARCADE);
            car.body.collideWorldBounds = true;
	        car.body.checkCollision.up = false;
	        car.body.checkCollision.down = false;
	        car.body.immovable = true;
            car.body.velocity.y = 100;
        }
        
        this.cars.add(car);
    },
    createObstacles: function(x, y, ob)
    {
        var obstacle = this.add.sprite(x, y, ob);
        
        this.physics.enable(obstacle, Phaser.Physics.ARCADE);
        obstacle.body.collideWorldBounds = true;
	    obstacle.body.checkCollision.up = false;
	    obstacle.body.checkCollision.down = false;
	    obstacle.body.immovable = true;
        
        this.obstacles.add(obstacle);
    },
    createRamps: function(x, y, ramp)
    {
        var newRamp = this.add.sprite(x, y, ramp);
        
        this.physics.enable(newRamp, Phaser.Physics.ARCADE);
        newRamp.body.collideWorldBounds = true;
	    newRamp.body.checkCollision.up = false;
	    newRamp.body.checkCollision.down = false;
	    newRamp.body.immovable = true;
        
        return newRamp;
    },
    reverseCar: function(obstacle, car)
    {
        if(car.body.velocity.x!= 0)
        {
            if(car.body.velocity.x > 0)
            {
                car.loadTexture('carsRight', car._frame.index);
            }
            else
            {
                car.loadTexture('carsLeft', car._frame.index);
            }
            
            car.body.velocity.x=-car.body.velocity.x;
        }
        else if(car.body.velocity.y!= 0)
        {
            if(car.body.velocity.y > 0)
            {
                car.loadTexture('carsUp', car._frame.index);
            }
            else
            {
                car.loadTexture('carsDown', car._frame.index);
            }
            
            car.body.velocity.y=-car.body.velocity.y;
        }
    },
    changeDirection: function()
    {
        for(var i=0, len=this.cars.length; i<len; i++)
        {
            var rand = Math.floor(Math.random() * 10);
            
            if(rand < 5)
            {
                var car=this.cars.children[i];
                if(car.body.velocity.x!= 0)
                {
                    car.body.velocity.y=car.body.velocity.x;
                    car.body.velocity.x=0;
                    
                    if(car.body.velocity.y > 0)
                    {
                        car.loadTexture('carsUp', car._frame.index);
                    }
                    else
                    {
                        car.loadTexture('carsDown', car._frame.index);
                    }
                }
                else if(car.body.velocity.y!= 0)
                {
                    car.body.velocity.x=car.body.velocity.y;
                    car.body.velocity.y=0;
                    
                    if(car.body.velocity.x > 0)
                    {
                        car.loadTexture('carsRight', car._frame.index);
                    }
                    else
                    {
                        car.loadTexture('carsLeft', car._frame.index);
                    }
                }
            }
        }
    },
    resetTruck: function(truck, obstacle)
    {
        truck.input.disableDrag();
        truck.x = 100;
        truck.y = 560;
        truck.input.enableDrag(false);
    },
    flipTruck: function(ramp, truck)
    {
        if(this.onRamp === false)
        {
            this.onRamp = true;
            truck.input.disableDrag();
        
            if(ramp === this.ramp1)
            {
                truck.body.enable = false;
                var firstTween = this.add.tween(truck).to({x: 300}, 1000, "Linear", true);
                firstTween.onComplete.add(function()
                {
                    this.add.tween(truck).to({x: 600}, 2000, "Linear", true);
                    var jumpTween = this.add.tween(this.sprite.scale).to({x: 1.5, y: 1.5}, 1000, "Linear", true);
                    jumpTween.onComplete.add(function()
                    {
                        var flipTween = this.add.tween(truck).to({rotation: 3}, 1000, "Linear", true);
                        flipTween.onComplete.add(function()
                        {
                            this.add.tween(truck).to({rotation: 0}, 1000, "Linear", true);
                            var fallTween = this.add.tween(truck.scale).to({x: -1, y: 1}, 1000, "Linear", true);
                            fallTween.onComplete.add(function()
                            {
                                var lastTween = this.add.tween(truck).to({x: 850}, 1000, "Linear", true);
                    
                                lastTween.onComplete.add(function()
                                {
                                    this.onRamp = false;
                                    truck.input.enableDrag(false);
                                    truck.body.enable = true;
                                }, this);
                            }, this);
                        }, this);
                    }, this);
                }, this);
            }
            else if(ramp === this.ramp2)
            {
                truck.body.enable = false;
                var firstTween = this.add.tween(truck).to({x: 600}, 1000, "Linear", true);
                firstTween.onComplete.add(function()
                {
                    this.add.tween(truck).to({rotation: 3}, 1000, "Linear", true);
                    var jumpTween = this.add.tween(truck.scale).to({x: 1.5, y: 1.5}, 1000, "Linear", true);
                    jumpTween.onComplete.add(function()
                    {
                        var flipTween = this.add.tween(truck).to({rotation: 0}, 1000, "Linear", true);
                        flipTween.onComplete.add(function()
                        {
                            this.add.tween(truck).to({x: 300}, 2000, "Linear", true);
                            var fallTween = this.add.tween(truck.scale).to({x: 1, y: 1}, 1000, "Linear", true);
                            fallTween.onComplete.add(function()
                            {
                                var lastTween = this.add.tween(truck).to({x: 100}, 1000, "Linear", true);
                    
                                lastTween.onComplete.add(function()
                                {
                                    this.onRamp = false;
                                    truck.input.enableDrag(false);
                                    truck.body.enable = true;
                                }, this);
                            }, this);
                        }, this);
                    }, this);
                }, this);
            }
        }
    },
    crusher: function(truck, car)
    {
        car.body.velocity.x=0;
        car.body.velocity.y=0;
        car.body.enable = false;
        if(car.key === 'carsUp')
        {
            car.loadTexture('carsCrushedUp', car._frame.index);
        }
        else if(car.key === 'carsDown')
        {
            car.loadTexture('carsCrushedDown', car._frame.index);
        }
        else if(car.key === 'carsLeft')
        {
            car.loadTexture('carsCrushedLeft', car._frame.index);
        }
        else if(car.key === 'carsRight')
        {
            car.loadTexture('carsCrushedRight', car._frame.index);
        }
        this.carsCrushed++;
    },
    update: function ()
    {
        this.game.physics.arcade.collide(this.ramp1, this.cars, this.reverseCar, null, this);
        this.game.physics.arcade.collide(this.ramp2, this.cars, this.reverseCar, null, this);
        this.game.physics.arcade.collide(this.ramp1, this.sprite, this.flipTruck, null, this);
        this.game.physics.arcade.collide(this.ramp2, this.sprite, this.flipTruck, null, this);
        this.game.physics.arcade.collide(this.blockers, this.cars, this.reverseCar, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.cars, this.reverseCar, null, this); 
        this.game.physics.arcade.overlap(this.sprite, this.obstacles, this.resetTruck, null, this); 
        this.game.physics.arcade.overlap(this.sprite, this.cars, this.crusher, null, this); 
        if(this.carsCrushed == this.cars.length)
        {
            console.log('Game Over');
        }
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/