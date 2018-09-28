
/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/



class Attack_Fireball extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Attacks with a single strike'

        this.assets = [
            'assets/burning-dot.png',     // normal
            'assets/burning-dotA.png',    // active
            'assets/burning-dotB.png',    // cooldown
            'assets/flame.png',           // flame element
            'assets/drawnCircle0.png',     // fireball element
        ]

        this.state = e_abStates.idle
        this.power = 5
        this.t_cast = 2
        this.t_perform = 3
        this.t_performAnimation = 3 // time for character animation
        this.t_recovery = 3
        this.t = 0


        this.flames = null
        this.fireball = null

    }

    startCasting() {

        let emitter = new PIXI.particles.Emitter(

            this.superScene, // container
            [PIXI.Texture.fromImage('assets/flame.png')], // images
          
            {   
                alpha: {
                    list: [
                        {
                            value: 0.8,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                scale: {
                    list: [
                        {
                            value: 1,
                            time: 0
                        },
                        {
                            value: 0.3,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                color: {
                    list: [
                        {
                            value: "fb1010",
                            time: 0
                        },
                        {
                            value: "f5b830",
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                speed: {
                    list: [
                        {
                            value: 200,
                            time: 0
                        },
                        {
                            value: 100,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                startRotation: {
                    min: 0,
                    max: 360
                },
                rotationSpeed: {
                    min: 0,
                    max: 0
                },
                lifetime: {
                    min: 0.1,
                    max: 1
                },
                frequency: 0.008,
                spawnChance: 1,
                particlesPerWave: 1,
                emitterLifetime: 10,
                maxParticles: 100,
                pos: {
                    x: 0,
                    y: 0
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: this.manager.sprite.position.x,
                    y: this.manager.sprite.position.y,
                    r: 3
                }
            }

        )

        emitter.emit = true
        this.sfxElements.push(emitter)
        this.flames = emitter

    }


    startPerforming() {
        
        if (this.flames) {
            this.sfxElements = this.sfxElements.filter(item => item !== this.flames)
            this.flames.destroy()
        }

        this.fireball = PIXI.Sprite.from('assets/drawnCircle0.png');
        this.fireball.tint = 0xffd12b
        this.fireball.anchor.set(0.5)
        this.fireball.position.set(WIDTH*0.25,HEIGHT*0.6)
        this.fireball.position.z = e_zIndex.hero - 0.1
        this.fireball.height = HEIGHT/4
        this.fireball.width = HEIGHT/4
        this.superScene.addChild(this.fireball)


        this.animations.rotate(this.fireball, {time: this.t_perform, speed: 5})
        this.animations.move(this.fireball,{time: this.t_perform, x: WIDTH*0.7, y: HEIGHT*0.5})

        this.manager.manager.zSort()

    }
    


    startExecuting () {
        this.superScene.removeChild(this.fireball)
        this.combat.dealDamage(this.power, this.target, this, this.manager)
    }
    


    


}// basic attack

