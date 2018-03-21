var MonsterTruck = MonsterTruck || {};

MonsterTruck.GameState = {
    create: function ()
    {
        this.carsCrushed = 0;
        this.trucksCrushed = 0;
        this.totalCrush = 0;
        this.speed = 0;
        this.playerRotation = 0;
        this.enemyRotation = 0;
        this.currEnemy = null;
        this.start = true;
        this.battling = false;
        this.onRamp = false;
        this.cars = this.add.group();
        this.enemies = this.add.group();
        this.obstacles = this.add.group();
        this.blockers = this.add.group();
        this.add.sprite(0, 0, 'arena');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.ramp1=this.createRamps(290, 270, 'ramp');
        this.ramp2=this.createRamps(570, 270, 'ramp2');
        
        this.sprite = this.add.sprite(100, 550, 'player');
        this.sprite.anchor.setTo(0.5, 0.5);
        
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
        
        this.createCars(600,150, true);
        this.createCars(580, 150, false);
        this.createCars(800, 100, true);
        this.createCars(720, 500, false);
        
        this.world.bringToTop(this.cars);
        this.createObstacles(450, 270, 'oil');
        this.createObstacles(500, 20, 'raceRed');
        this.createObstacles(500, 121, 'raceWhite');
        this.createObstacles(500, 416, 'raceRed');
        this.createObstacles(500, 517, 'raceWhite');
        
        this.createObstacles(550, 50, 'cone');
        this.createObstacles(100, 450, 'barrelBlue');
        this.createObstacles(150, 100, 'barrelRed');
        this.createObstacles(750, 150, 'barrelBlue');
        this.createObstacles(330, 380, 'cone');
        this.createObstacles(850, 450, 'barrelRed');
        
        this.createBlockers(0, 0, false);
        this.createBlockers(0, 640, false);
        this.createBlockers(0, 0, true);
        this.createBlockers(960, 0, true);
        this.createBlockers(480, 0, true);
        this.createBlockers(290, 270, null);
        
        this.createEnemies(100, 40, 'enemy1', true);
        this.createEnemies(780, 60, 'enemy2', false);
        this.createEnemies(780, 500, 'enemy3', false);
        
        this.world.bringToTop(this.obstacles);
        this.world.bringToTop(this.sprite);
        this.world.bringToTop(this.enemies);
        this.world.bringToTop(this.blockers);
        
        this.scoreCars = this.add.text(200, 0, `Cars Crushed: ${this.carsCrushed}`);
        this.scoreTrucks = this.add.text(600, 0, `Trucks Crushed: ${this.trucksCrushed}`);
        
        this.time.events.loop(Phaser.Timer.SECOND, this.changeDirection, this);
    },
    createBlockers: function(x, y, height)
    {
        if(height)
        {
            var block = this.add.sprite(x, y, 'blockerHeight');
        }
        else if(height === false)
        {
            var block = this.add.sprite(x, y, 'blockerWidth');
        }
        else
        {
           var block = this.add.sprite(x, y, 'blockerMid');
        }
        this.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.collideWorldBounds = true;
	    block.body.checkCollision.up = false;
	    block.body.checkCollision.down = false;
	    block.body.immovable = true;
        
        this.blockers.add(block);
    },
    createEnemies: function(x, y, enemy, stayTrue)
    {
        var enemy = this.add.sprite(x, y, enemy);
        
        this.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.collideWorldBounds = true;
	    enemy.body.checkCollision.up = false;
	    enemy.body.checkCollision.down = false;
	    enemy.body.immovable = true;
        
        if(!stayTrue)
        {
            enemy.scale.setTo(-1, 1);
            enemy.body.velocity.x = -100;
        }
        else
        {
            enemy.body.velocity.x = 100;
        }
        
        this.enemies.add(enemy);
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
    reverseEnemy: function(obstacle, enemy)
    {
        if(enemy.body.velocity.x!= 0)
        {
            if(enemy.body.velocity.x > 0)
            {
                //enemy.loadTexture('carsRight', car._frame.index);
            }
            else
            {
                //enemy.loadTexture('carsLeft', car._frame.index);
            }
            
            enemy.body.velocity.x=-enemy.body.velocity.x;
        }
        else if(enemy.body.velocity.y!= 0)
        {
            if(enemy.body.velocity.y > 0)
            {
                //enemy.loadTexture('carsUp', car._frame.index);
            }
            else
            {
                //enemy.loadTexture('carsDown', car._frame.index);
            }
            
            enemy.body.velocity.y=-enemy.body.velocity.y;
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
        
        for(var i=0, len=this.enemies.length; i<len; i++)
        {
            var rand = Math.floor(Math.random() * 10);
            
            if(rand < 5)
            {
                var enemy=this.enemies.children[i];
                if(enemy.body.velocity.x!= 0)
                {
                    enemy.body.velocity.y=enemy.body.velocity.x;
                    enemy.body.velocity.x=0;
                    
                    if(enemy.body.velocity.y > 0)
                    {
                        //car.loadTexture('carsUp', car._frame.index);
                    }
                    else
                    {
                        //car.loadTexture('carsDown', car._frame.index);
                    }
                }
                else if(enemy.body.velocity.y!= 0)
                {
                    enemy.body.velocity.x=enemy.body.velocity.y;
                    enemy.body.velocity.y=0;
                    
                    if(enemy.body.velocity.x > 0)
                    {
                        //car.loadTexture('carsRight', car._frame.index);
                    }
                    else
                    {
                        //car.loadTexture('carsLeft', car._frame.index);
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
                truck.rotation = 0;
                var firstTween = this.add.tween(truck).to({x: 300}, 1000, "Linear", true);
                firstTween.onComplete.add(function()
                {
                    this.add.tween(truck).to({x: 600}, 2000, "Linear", true);
                    var jumpTween = this.add.tween(this.sprite.scale).to({x: 1.5, y: 1.5}, 1000, "Linear", true);
                    jumpTween.onComplete.add(function()
                    {
                        var flipTween = this.add.tween(truck).to({rotation: 6.3}, 1000, "Linear", true);
                        flipTween.onComplete.add(function()
                        {
                            //this.add.tween(truck).to({rotation: 0}, 1000, "Linear", true);
                            var fallTween = this.add.tween(truck.scale).to({x: 1, y: 1}, 1000, "Linear", true);
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
                truck.rotation = 3.1;
                var firstTween = this.add.tween(truck).to({x: 600}, 1000, "Linear", true);
                firstTween.onComplete.add(function()
                {
                    this.add.tween(truck.scale).to({x: 1.5, y: 1.5}, 1000, "Linear", true);
                    this.add.tween(truck).to({x: 300}, 2000, "Linear", true);
                    var flipTween = this.add.tween(truck).to({rotation: 9.4}, 1000, "Linear", true);
                    flipTween.onComplete.add(function()
                    {
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
            }
        }
    },
    crusher: function(truck, car)
    {
        if(!this.battling && car.body.enable && truck.body.enable)
        {
            car.body.enable = false;
            console.log(truck.key);
            if(truck.key === 'player')
            {
                this.carsCrushed++;
            }
            else
            {
                console.log('enemy');
            }
            car.body.velocity.x=0;
            car.body.velocity.y=0;
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
            this.totalCrush++;
        }
    },
    startBattle: function(truck, enemy)
    {
        if(!this.battling)
        {
            this.battling = true;
            this.left=this.add.sprite(-100, 500, 'monster');
            this.right=this.add.sprite(1060, 500, 'monster');
            this.left.scale.setTo(5, 5);
            this.right.scale.setTo(-5, 5);
            this.left.anchor.setTo(0.1, 0.9);
            this.right.anchor.setTo(0.1, 0.9);
        
            this.add.tween(this.left).to({x: 205}, 2000, "Linear", true);
            this.add.tween(this.right).to({x: 805}, 2000, "Linear", true);
            this.time.events.add(Phaser.Timer.SECOND * 0.5, function()
            {
                this.add.tween(this.left).to({rotation: -0.9}, 1500, "Linear", true);
                var truckTween = this.add.tween(this.right).to({rotation: 0.9}, 1500, "Linear", true);
                truckTween.onComplete.add(function()
                {
                    //Round 1
                    if(enemy.key === 'enemy1')
                    {
                        this.currEnemy = 0;
                        this.playerRotation = 0;
                        this.enemyRotation = 0;
                        this.battleArena = this.add.sprite(0, 0, 'battleArena');
                    
                        this.battlePlayer = this.add.sprite(250, 250, 'player');
                        this.battleEnemy = this.add.sprite(600, 250, enemy.key);
                    
                        this.battlePlayer.anchor.setTo(0.1, 0.5);
                        this.battleEnemy.anchor.setTo(0.1, 0.5);
                    
                        this.ins = this.add.sprite(0, 0, 'battle1Ins');
                        
                        this.gas = this.add.button(460, 400, 'gas', function()
                        {
                            if(this.ins!=undefined)
                            {
                                this.ins.alpha=0;
                                this.ins=undefined;
                                
                                this.playerRotation = 0.1;
                                this.enemyRotation = 0.15;
                                this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                                {
                                    if(this.currEnemy === 1)
                                    {
                                        this.enemyRotation+=0.05;
                                    }
                                }, this);
                            }
                            
                            this.playerRotation+=0.01;
                        }, this);
                    }
                    //Round 2
                    else if(enemy.key === 'enemy2')
                    {
                        this.currEnemy = 1;
                        this.battleArena = this.add.sprite(0, 0, 'battleArena');
                    
                        this.battler = true;
                        this.battlePlayer = this.add.sprite(50, 250, 'player');
                        this.physics.enable(this.battlePlayer, Phaser.Physics.ARCADE);
                        this.battlePlayer.body.collideWorldBounds = true;
	                    this.battlePlayer.body.checkCollision.up = false;
                        this.battlePlayer.body.checkCollision.down = false;
                        this.battlePlayer.body.immovable = true;
                        this.battlePlayer.body.velocity.x=20;
                    
                        this.battleEnemy = this.add.sprite(900, 250, enemy.key);
                        this.physics.enable(this.battleEnemy, Phaser.Physics.ARCADE);
                        this.battleEnemy.body.collideWorldBounds = true;
                        this.battleEnemy.body.checkCollision.up = false;
                        this.battleEnemy.body.checkCollision.down = false;
                        this.battleEnemy.body.immovable = true;
                        this.battleEnemy.body.velocity.x=-20;
                    
                        this.battlePlayer.anchor.setTo(0.1, 0.5);
                        this.battleEnemy.anchor.setTo(0.1, 0.5);
                        this.battleEnemy.scale.setTo(-1, 1);
                    
                        this.gas = this.add.button(460, 400, 'gas', function()
                        {
                            if(this.ins!=undefined)
                            {
                                this.ins.alpha=0;
                                this.ins=undefined;
                                
                                this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                                {
                                    if(this.battleEnemy!= undefined || this.currEnemy === 2)
                                    {
                                        this.battleEnemy.body.velocity.x-=20;
                                    }
                                }, this);
                            }
                            
                            this.battlePlayer.body.velocity.x+=20;
                        }, this);
                    }
                    //Round 3
                    else
                    {
                        this.currEnemy = 2;
                        this.battleArena = this.add.sprite(0, 0, 'battleArena');
                    
                        this.battlePlayer = this.add.sprite(480, 250, 'player');
                        this.physics.enable(this.battlePlayer, Phaser.Physics.ARCADE);
                        this.battlePlayer.body.collideWorldBounds = true;
	                    this.battlePlayer.body.checkCollision.up = false;
                        this.battlePlayer.body.checkCollision.down = false;
                        this.battlePlayer.body.immovable = true;
                        this.battlePlayer.body.velocity.x=20;
                    
                        this.battleEnemy = this.add.sprite(480, 250, enemy.key);
                        this.physics.enable(this.battleEnemy, Phaser.Physics.ARCADE);
                        this.battleEnemy.body.collideWorldBounds = true;
	                    this.battleEnemy.body.checkCollision.up = false;
                        this.battleEnemy.body.checkCollision.down = false;
	                    this.battleEnemy.body.immovable = true;
                        this.battleEnemy.body.velocity.x=-20;
                    
                        this.battlePlayer.anchor.setTo(0.1, 0.5);
                        this.battleEnemy.anchor.setTo(0.1, 0.5);
                        this.battleEnemy.scale.setTo(-1, 1);
                        this.cord = new Phaser.Line(this.battlePlayer.x, this.battlePlayer.y, this.battleEnemy.x, this.battleEnemy.y);
                    
                        this.enemyBlocker = this.add.sprite(0, 0, 'blockerHeight');
                        this.physics.enable(this.enemyBlocker, Phaser.Physics.ARCADE);
                        this.enemyBlocker.body.collideWorldBounds = true;
	                    this.enemyBlocker.body.checkCollision.up = false;
                        this.enemyBlocker.body.checkCollision.down = false;
                        this.enemyBlocker.body.immovable = true;
                    
                        this.playerBlocker = this.add.sprite(960, 0, 'blockerHeight');
                        this.physics.enable(this.playerBlocker, Phaser.Physics.ARCADE);
                        this.playerBlocker.body.collideWorldBounds = true;
	                    this.playerBlocker.body.checkCollision.up = false;
                        this.playerBlocker.body.checkCollision.down = false;
                        this.playerBlocker.body.immovable = true;
                    
                        this.gas = this.add.button(460, 400, 'gas', function()
                        {
                            this.battlePlayer.body.velocity.x+=5
                        }, this);
                    
                        this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                        {
                            if(this.battleEnemy!= undefined || this.currEnemy === 2)
                            {
                                this.battleEnemy.body.velocity.x-=5;
                            }
                        }, this);
                    }
                }, this);
            }, this);
        }
    },
    update: function ()
    {
        this.scoreCars.setText(`Cars Crushed: ${this.carsCrushed}`);
        this.scoreTrucks.setText(`Trucks Crushed: ${this.trucksCrushed}`);
        
        this.game.physics.arcade.collide(this.ramp1, this.sprite, this.flipTruck, null, this);
        this.game.physics.arcade.collide(this.ramp2, this.sprite, this.flipTruck, null, this);
        this.game.physics.arcade.collide(this.blockers, this.cars, this.reverseCar, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.cars, this.reverseCar, null, this); 
        this.game.physics.arcade.overlap(this.sprite, this.obstacles, this.resetTruck, null, this); 
        this.game.physics.arcade.overlap(this.sprite, this.cars, this.crusher, null, this); 
        
        this.game.physics.arcade.collide(this.blockers, this.enemies, this.reverseEnemy, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.enemies, this.reverseEnemy, null, this); 
        this.game.physics.arcade.overlap(this.enemies, this.cars, this.crusher, null, this);
        this.game.physics.arcade.overlap(this.sprite, this.enemies, this.startBattle, null, this);
        if(this.totalCrush === (this.cars.length + this.enemies.length))
        {
            this.totalCrush++;
            
            this.left=this.add.sprite(-100, 500, 'monster');
            this.right=this.add.sprite(1060, 500, 'monster');
            this.left.scale.setTo(5, 5);
            this.right.scale.setTo(-5, 5);
            this.left.anchor.setTo(0.1, 0.9);
            this.right.anchor.setTo(0.1, 0.9);
        
            this.add.tween(this.left).to({x: 205}, 2000, "Linear", true);
            this.add.tween(this.right).to({x: 805}, 2000, "Linear", true);
            this.time.events.add(Phaser.Timer.SECOND * 0.5, function()
            {
                this.add.tween(this.left).to({rotation: -0.9}, 1500, "Linear", true);
                this.add.tween(this.right).to({rotation: 0.9}, 1500, "Linear", true);
            }, this);
        }
        if(!this.onRamp)
        {
            this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        } 
        if(this.battling && this.battleEnemy != undefined)
        {
            //Round 1
            if((this.currEnemy+1)%3 === 1)
            {
                this.battlePlayer.rotation += this.playerRotation;
                this.battleEnemy.rotation += this.enemyRotation;
            
                if(this.battlePlayer.rotation > this.battleEnemy.rotation)
                {
                    console.log('player wins');
                    this.battlePlayer.destroy();
                    this.battlePlayer = undefined;
                    this.battleEnemy.destroy();
                    this.battleEnemy = undefined;
                    this.gas.destroy();
                    this.gas = undefined;
                    this.battleArena.destroy();
                    this.battleArena = undefined;
                    this.left.destroy();
                    this.left = undefined;
                    this.right.destroy();
                    this.right = undefined;
                    this.enemies.children[this.currEnemy].body.enable = false;
                    this.enemies.children[this.currEnemy].body.velocity.x=0;
                    this.enemies.children[this.currEnemy].body.velocity.y=0;
                    //change texture
                    this.currEnemy = null;
                    this.trucksCrushed++;
                    this.battling = false;
                    this.totalCrush++;
                }
                else if(this.battleEnemy.rotation > 100)
                {
                    console.log('player lose');
                    this.battlePlayer.destroy();
                    this.battlePlayer = undefined;
                    this.battleEnemy.destroy();
                    this.battleEnemy = undefined;
                    this.gas.destroy();
                    this.gas = undefined;
                    this.battleArena.destroy();
                    this.battleArena = undefined;
                    this.left.destroy();
                    this.left = undefined;
                    this.right.destroy();
                    this.right = undefined;
                    //change texture
                    this.currEnemy = null;
                    this.battling = false;
                }
            }
            //Round 2
            if((this.currEnemy+1)%3 === 2)
            {
                this.game.physics.arcade.collide(this.battlePlayer, this.battleEnemy, function()
                {
                    this.battlePlayer.body.velocity.x = 0;
                    this.battleEnemy.body.velocity.x = 0;
                    console.log('player wins');
                    this.battlePlayer.destroy();
                    this.battlePlayer = undefined;
                    this.battleEnemy.destroy();
                    this.battleEnemy = undefined;
                    this.gas.destroy();
                    this.gas = undefined;
                    this.battleArena.destroy();
                    this.battleArena = undefined;
                    this.left.destroy();
                    this.left = undefined;
                    this.right.destroy();
                    this.right = undefined;
                    this.enemies.children[this.currEnemy].body.enable = false;
                    this.enemies.children[this.currEnemy].body.velocity.x=0;
                    this.enemies.children[this.currEnemy].body.velocity.y=0;
                    this.currEnemy = null;
                    this.trucksCrushed++;
                    this.battling = false;
                    this.totalCrush++;
                }, null, this);
            }
            //Round 3
            if((this.currEnemy+1)%3 === 0)
            {
                this.cord.fromSprite(this.battlePlayer, this.battleEnemy, false);
                this.game.physics.arcade.collide(this.battlePlayer, this.playerBlocker, function()
                {
                    console.log('enemy wins');
                    this.battlePlayer.destroy();
                    this.battlePlayer = undefined;
                    this.battleEnemy.destroy();
                    this.battleEnemy = undefined;
                    this.gas.destroy();
                    this.gas = undefined;
                    this.battleArena.destroy();
                    this.battleArena = undefined;
                    this.left.destroy();
                    this.left = undefined;
                    this.right.destroy();
                    this.right = undefined; 
                    this.cord=undefined;
                    this.graphics.clear();
                    this.graphics = undefined;
                    this.enemies.children[this.currEnemy].body.enable = false;
                    this.enemies.children[this.currEnemy].body.velocity.x=0;
                    this.enemies.children[this.currEnemy].body.velocity.y=0;
                    this.currEnemy = null;
                    this.trucksCrushed++;
                    this.battling = false;
                    this.totalCrush++;
                }, null, this)
                this.game.physics.arcade.collide(this.enemyBlocker, this.battleEnemy, function()
                {
                    console.log('player wins');
                    this.battlePlayer.destroy();
                    this.battlePlayer = undefined;
                    this.battleEnemy.destroy();
                    this.battleEnemy = undefined;
                    this.gas.destroy();
                    this.gas = undefined;
                    this.battleArena.destroy();
                    this.battleArena = undefined;
                    this.left.destroy();
                    this.left = undefined;
                    this.right.destroy();
                    this.right = undefined;
                    this.cord=undefined;
                    this.graphics.clear();
                    this.graphics = undefined;
                    this.currEnemy = null;
                    this.battling = false;
                }, null, this);
            }
        }
    },
    render: function() 
    {

        if(this.battling && this.cord != undefined)
        {
            if(this.graphics!=undefined)
                this.graphics.clear();
            this.graphics=this.game.add.graphics(0,0);
            this.graphics.lineStyle(10, 0x654321, 1);
            this.graphics.moveTo(this.cord.start.x,this.cord.start.y);
            this.graphics.lineTo(this.cord.end.x,this.cord.end.y);
            this.graphics.endFill();
            this.world.bringToTop(this.battlePlayer);
            this.world.bringToTop(this.battleEnemy);

        }

}
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/