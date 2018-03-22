var MonsterTruck = MonsterTruck || {};

MonsterTruck.GameState = {
    create: function ()
    {
        //Adds horn sound
        MonsterTruck.audio.volume = 0.3;
        var sound = this.add.audio('horn');
        sound.play();
        sound.onStop.add(function()
        {
            MonsterTruck.audio.volume = 1;
        }, this);
        //Get variable values
        this.allData = JSON.parse(this.game.cache.getText('monsterData'));
        //Counts the number of cars crushed by the player
        this.carsCrushed = 0;
        //Counts the number of trucks crushed by the player
        this.trucksCrushed = 0;
        //Total vehicles crushed by ALL trucks -> when all are crushed game ends
        this.totalCrush = 0;
        //Stores the rotation of the player and enemy for battle 1
        this.playerRotation = 0;
        this.enemyRotation = 0;
        //Stores the current enemy being battled
        this.currEnemy = null;
        //Boolean for whether or not a battle is occuring
        this.battling = false;
        //Boolean for whether or not a battle is ending
        this.ending = false;
        //Boolean for whether or not the truck is on a ramp
        this.onRamp = false;
        //Groups
        this.cars = this.add.group();
        this.enemies = this.add.group();
        this.obstacles = this.add.group();
        this.blockers = this.add.group();
        //Create the arena
        this.add.sprite(0, 0, 'arena');
        //Start physics
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Build the ramps
        this.ramp1=this.createRamps(this.allData.ramp[0][0], this.allData.ramp[0][1], this.allData.ramp[0][2]);
        this.ramp2=this.createRamps(this.allData.ramp[1][0], this.allData.ramp[1][1], this.allData.ramp[1][2]);
        //Create the player
        this.sprite = this.add.sprite(this.allData.truckPos[0], this.allData.truckPos[1], 'player');
        this.sprite.anchor.setTo(0.5, 0.5);
        //Add physics
        this.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	    this.sprite.body.collideWorldBounds = true;
        this.sprite.body.checkCollision.up = false;
	    this.sprite.body.checkCollision.down = false;
        //Allow input on the player
        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag(false);
        //Create the cars
        for(let i=0, len=this.allData.cars.length; i<len; i++)
        {
            this.createCars(this.allData.cars[i][0], this.allData.cars[i][1], this.allData.cars[i][2]);
        };
        //Create the obstacles
        for(let i=0, len=this.allData.obstacles.length; i<len; i++)
        {
            this.createObstacles(this.allData.obstacles[i][0], this.allData.obstacles[i][1], this.allData.obstacles[i][2]);
        };
        //Create the blockers
        for(let i=0, len=this.allData.blockers.length; i<len; i++)
        {
            this.createBlockers(this.allData.blockers[i][0], this.allData.blockers[i][1], this.allData.blockers[i][2]);
        };
        //Create the enemies
        for(let i=0, len=this.allData.enemies.length; i<len; i++)
        {
            this.createEnemies(this.allData.enemies[i][0], this.allData.enemies[i][1], this.allData.enemies[i][2], this.allData.enemies[i][3]);
        };
        //Bring all items up
        this.world.bringToTop(this.obstacles);
        this.world.bringToTop(this.blockers);
        this.world.bringToTop(this.cars);
        this.world.bringToTop(this.sprite);
        this.world.bringToTop(this.enemies);
        //Create the score board
        for(let i=0, len=this.allData.scoreboards.length; i<len; i++)
        {
            this.add.sprite(this.allData.scoreboards[i][0], this.allData.scoreboards[i][1], 'scoreboard');
        };
        //Add text to the scoreboard
        this.scoreCars = this.add.text(this.allData.scoreText[0][0], this.allData.scoreText[0][1], `Cars Crushed: ${this.carsCrushed}`, {fill: '#FFFFFF'});
        this.scoreTrucks = this.add.text(this.allData.scoreText[1][0], this.allData.scoreText[1][1], `Trucks Crushed: ${this.trucksCrushed}`, {fill: '#FFFFFF'});
        //Change direction evey second
        this.time.events.loop(Phaser.Timer.SECOND, this.changeDirection, this);
    },
    createBlockers: function(x, y, height)
    {
        console.log('new');//Chooses which type of blocker should be used
        if(height)
        {
            console.log('h');
            var block = this.add.sprite(x, y, 'blockerHeight');
        }
        else if(height === false)
        {
            console.log('w');
            var block = this.add.sprite(x, y, 'blockerWidth');
        }
        else
        {
           console.log('m');
            var block = this.add.sprite(x, y, 'blockerMid');
        }
        //Add physics
        this.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.collideWorldBounds = true;
	    block.body.checkCollision.up = true;
	    block.body.checkCollision.down = true;
	    block.body.immovable = true;
        //Add to group
        this.blockers.add(block);
    },
    createEnemies: function(x, y, enemy, stayTrue)
    {
        //Add enemy
        var enemy = this.add.sprite(x, y, enemy);
        //Add physics
        this.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.collideWorldBounds = true;
	    enemy.body.checkCollision.up = false;
	    enemy.body.checkCollision.down = false;
	    enemy.body.immovable = true;
        //If the enemy does not stay true to its direction reverse
        if(!stayTrue)
        {
            enemy.scale.setTo(-1, 1);
            enemy.body.velocity.x = -this.allData.enemyVelocity;
        }
        else
        {
            enemy.body.velocity.x = this.allData.enemyVelocity;
        }
        //Add to group
        this.enemies.add(enemy);
    },
    createCars: function(x, y, horizontal)
    {
        //If the cars should start horizontal or vertical
        if(horizontal)
        {
            var car = this.add.sprite(x, y, 'carsRight', Math.floor(Math.random()*5));
            this.physics.enable(car, Phaser.Physics.ARCADE);
            car.body.collideWorldBounds = true;
	        car.body.checkCollision.up = false;
	        car.body.checkCollision.down = false;
	        car.body.immovable = true;
            car.body.velocity.x = this.allData.carVelocity;
        }
        else
        {
            var car = this.add.sprite(x, y, 'carsDown', Math.floor(Math.random()*5));
            this.physics.enable(car, Phaser.Physics.ARCADE);
            car.body.collideWorldBounds = true;
	        car.body.checkCollision.up = false;
	        car.body.checkCollision.down = false;
	        car.body.immovable = true;
            car.body.velocity.y = this.allData.carVelocity;
        }
        
        this.cars.add(car);
    },
    createObstacles: function(x, y, ob)
    {
        //Create the obstacles
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
        //Return the ramp -> no group
        return newRamp;
    },
    reverseCar: function(car, obstacle)
    {
        //Check if the car is moving along the x or y axis, then flip along that axis
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
    reverseEnemy: function(enemy, obstacle)
    {
        if(enemy.body.velocity.x===0 && enemy.body.velocity.y===0)
        {
            //enemy.body.velocity.x = 100;
        }
        //Reverse direction of the enemy
        else if(enemy.body.velocity.x!= 0)
        {
            enemy.body.velocity.x=-enemy.body.velocity.x;
        }
        else if(enemy.body.velocity.y!= 0)
        {  
            enemy.body.velocity.y=-enemy.body.velocity.y;
        }
    },
    changeDirection: function()
    {
        for(var i=0, len=this.cars.length; i<len; i++)
        {
            //Chose a random number between 0 and 10
            var rand = Math.floor(Math.random() * 10);
            //If on the lower half change the direction -> appears more random
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
                }
                else if(enemy.body.velocity.y!= 0)
                {
                    enemy.body.velocity.x=enemy.body.velocity.y;
                    enemy.body.velocity.y=0;
                }
            }
        }
    },
    resetTruck: function(truck, obstacle)
    {
        //Do not allow dragging, reset to original position and allow dragging
        truck.input.disableDrag();
        truck.x = this.allData.truckPos[0];
        truck.y = this.allData.truckPos[1];
        truck.input.enableDrag(false);
    },
    flipTruck: function(ramp, truck)
    {
        //Check that the truck is on a ramp
        if(this.onRamp === false)
        {
            //Set it to on a ramp and disable drag
            this.onRamp = true;
            truck.input.disableDrag();
            //If the ramp is the first one move to the other side with a spin
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
        //If there is not a battle happening(therefore nothing should be crushed and both the truck and car are active)
        if(!this.battling && car.body.enable && truck.body.enable)
        {
            //Disable the car
            car.body.enable = false;
            //If the player hit increase the score
            if(truck.key === 'player')
            {
                this.carsCrushed++;
            }
            //Stop the cars movement
            car.body.velocity.x=0;
            car.body.velocity.y=0;
            //Change the texture to the crushed texture
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
            //Increase the total crush
            this.totalCrush++;
        }
    },
    startBattle: function(truck, enemy)
    {
        //If a battle is not in progress begin one
        if(!this.battling)
        {
            MonsterTruck.audio.volume = 0.3;
            var sound = this.add.audio('horn');
            sound.play();
            sound.onStop.add(function()
            {
                MonsterTruck.audio.volume = 1;
            }, this);
            
            this.battling = true;
            //Enter the battle animation
            this.left=this.add.sprite(-600, 600, 'battleTruck');
            this.right=this.add.sprite(1560, 600, 'battleTruck');
            this.left.scale.setTo(-1, 1);
            this.left.anchor.setTo(0.9, 0.9);
            this.right.anchor.setTo(0.9, 0.9);
        
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
                        //Out rotate the opponent
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
                        //Crash into the opponent
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
                        
                        this.ins = this.add.sprite(0, 0, 'battle2Ins');
                    
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
                        //Pull away from the opponent
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
                        
                        this.ins = this.add.sprite(0, 0, 'battle3Ins');
                    
                        this.gas = this.add.button(460, 400, 'gas', function()
                        {
                            if(this.ins!=undefined)
                            {
                                this.ins.alpha=0;
                                this.ins=undefined;
                                
                                this.time.events.repeat(Phaser.Timer.SECOND * 2, 10, function()
                                {
                                    if(this.battleEnemy!= undefined && this.currEnemy === 2 && this.battleEnemy.body!=null)
                                    {
                                        this.battleEnemy.body.velocity.x-=5;
                                    }
                                }, this);
                            }
                            this.battlePlayer.body.velocity.x+=5;
                        }, this);
                    }
                }, this);
            }, this);
        }
    },
    update: function ()
    {
        //Update the scores
        this.scoreCars.setText(`Cars Crushed: ${this.carsCrushed}`);
        this.scoreTrucks.setText(`Trucks Crushed: ${this.trucksCrushed}`);
        //Check for collisions and overlaps
        this.game.physics.arcade.collide(this.ramp1, this.sprite, this.flipTruck, null, this);
        this.game.physics.arcade.collide(this.ramp2, this.sprite, this.flipTruck, null, this);
        this.game.physics.arcade.overlap(this.sprite, this.obstacles, this.resetTruck, null, this); 
        this.game.physics.arcade.overlap(this.sprite, this.cars, this.crusher, null, this); 
        
        this.game.physics.arcade.collide(this.ramp1, this.enemies, this.reverseEnemy, null, this);
        this.game.physics.arcade.collide(this.ramp2, this.enemies, this.reverseEnemy, null, this);
        this.game.physics.arcade.collide(this.ramp1, this.cars, this.reverseCar, null, this);
        this.game.physics.arcade.collide(this.ramp2, this.cars, this.reverseCar, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.cars, this.crusher, null, this);
        this.game.physics.arcade.overlap(this.sprite, this.enemies, this.startBattle, null, this);
        this.enemies.forEach(function(e)
        {
            this.game.physics.arcade.overlap(e, this.blockers, this.reverseEnemy, null, this);
            this.game.physics.arcade.collide(e, this.obstacles, this.reverseEnemy, null, this); 
        }, this);
        this.cars.forEach(function(c)
        {
            this.game.physics.arcade.overlap(c, this.blockers, this.reverseCar, null, this);
            this.game.physics.arcade.collide(c, this.obstacles, this.reverseCar, null, this); 
        }, this);
        //Check if game should end
        if(this.totalCrush === (this.cars.length + this.enemies.length))
        {
            this.totalCrush++;
            //Show animation and go to end screen
            this.left=this.add.sprite(-600, 600, 'battleTruck');
            this.right=this.add.sprite(1560, 600, 'battleTruck');
            this.left.scale.setTo(-1, 1);
            this.left.anchor.setTo(0.9, 0.9);
            this.right.anchor.setTo(0.9, 0.9);
        
            this.add.tween(this.left).to({x: 205}, 2000, "Linear", true);
            this.add.tween(this.right).to({x: 805}, 2000, "Linear", true);
            this.time.events.add(Phaser.Timer.SECOND * 0.5, function()
            {
                this.add.tween(this.left).to({rotation: -0.9}, 1500, "Linear", true);
                var endTween = this.add.tween(this.right).to({rotation: 0.9}, 1500, "Linear", true);
                endTween.onComplete.add(function()
                {
                    this.state.start('End');
                }, this);
            }, this);
        }
        //Update the rotation of the truck
        if(!this.onRamp)
        {
            this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        } 
        //If a battle is active update accordingly
        if(this.battling && this.battleEnemy != undefined)
        {
            //Round 1
            if((this.currEnemy+1)%3 === 1)
            {
                this.battlePlayer.rotation += this.playerRotation;
                this.battleEnemy.rotation += this.enemyRotation;
                //If the battle is over clear the battle
                if(this.battlePlayer.rotation > this.battleEnemy.rotation && !this.ending)
                {
                    this.ending = true;
                    var win = this.add.sprite(480, 100, 'winner');
                    win.scale.setTo(0.1, 0.1);
                    win.anchor.setTo(0.5, 0.5);
                    var winTween = this.add.tween(win.scale).to({x: 1, y: 1}, 2000, "Linear", true);
                    winTween.onComplete.add(function()
                    {
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
                        this.enemies.children[this.currEnemy].loadTexture(this.enemies.children[this.currEnemy].key + 'crushed');
                        this.currEnemy = null;
                        this.trucksCrushed++;
                        this.battling = false;
                        this.totalCrush++;
                        this.ending=false;
                        win.destroy();
                    }, this);
                }
                else if(this.battleEnemy.rotation > 100 && !this.ending)
                {
                    this.ending = true;
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
                    this.currEnemy = null;
                    this.battling = false;
                    this.ending=false;
                }
            }
            //Round 2
            if((this.currEnemy+1)%3 === 2)
            {
                //If the battle is over clear the battle
                this.game.physics.arcade.collide(this.battlePlayer, this.battleEnemy, function()
                {
                    if(!this.ending)
                    {
                        this.ending = true;
                        this.battlePlayer.body.velocity.x = 0;
                        this.battleEnemy.body.velocity.x = 0;
                    
                        var win = this.add.sprite(480, 100, 'winner');
                        win.scale.setTo(0.1, 0.1);
                        win.anchor.setTo(0.5, 0.5);
                        var winTween = this.add.tween(win.scale).to({x: 1, y: 1}, 2000, "Linear", true);
                        winTween.onComplete.add(function()
                        {
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
                            this.enemies.children[this.currEnemy].loadTexture(this.enemies.children[this.currEnemy].key + 'crushed');
                            this.currEnemy = null;
                            this.trucksCrushed++;
                            this.battling = false;
                            this.totalCrush++;
                            this.ending=false;
                            win.destroy();
                        }, this);
                    }
                }, null, this);
            }
            //Round 3
            if((this.currEnemy+1)%3 === 0)
            {
                this.cord.fromSprite(this.battlePlayer, this.battleEnemy, false);
                //If the battle is over clear the battle
                this.game.physics.arcade.collide(this.battlePlayer, this.playerBlocker, function()
                {
                    if(!this.ending)
                    {
                        this.ending=true;
                        var win = this.add.sprite(480, 100, 'winner');
                        win.scale.setTo(0.1, 0.1);
                        win.anchor.setTo(0.5, 0.5);
                        var winTween = this.add.tween(win.scale).to({x: 1, y: 1}, 2000, "Linear", true);
                        winTween.onComplete.add(function()
                        {
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
                            this.enemies.children[this.currEnemy].loadTexture(this.enemies.children[this.currEnemy].key + 'crushed');
                            this.currEnemy = null;
                            this.trucksCrushed++;
                            this.battling = false;
                            this.totalCrush++;
                            this.ending=false;
                            win.destroy();
                        }, this);
                    }
                }, null, this);
                this.game.physics.arcade.collide(this.enemyBlocker, this.battleEnemy, function()
                {
                    if(!this.ending)
                    {
                        this.ending=true;
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
                        this.ending=false;
                    }
                }, null, this);
            }
        }
    },
    render: function() 
    {
        //Render the rop for battle 3
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