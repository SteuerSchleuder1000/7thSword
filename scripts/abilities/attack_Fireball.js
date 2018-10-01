
/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/



class Attack_Fireball extends Ability {


    constructor(manager, superScene, combat) { // superScene = stage
        super(manager, superScene, combat)
        
        this.name = 'fireball'
        this.scene.name = 'fireball'
        this.description = 'Attacks with a single strike'
        this.animationType = e_animationTypes.spell

        this.assets = [
            'assets/burning-dot.png',     // normal
            'assets/burning-dotA.png',    // active
            'assets/burning-dotB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 49
        this.t_cast = 2
        this.t_perform = 0.5
        this.t_performAnimation = 0.5 // time for character animation
        this.t_recovery = 3
        this.t = 0


        //this.sound = new Howl({src: 'assets/sounds/fireloop.mp3', loop: true, volume: 1})
        this.sounds = {
            cast:       new Howl({src: 'assets/sounds/fireLoop.ogg', volume: 1}),
            perform:    new Howl({src: 'assets/sounds/fireball_impact.ogg', volume: 1})
        }

        this.fireball = null
        this.fireballLayer = null
        this.emitterOptions = null
        loadJSON('assets/json/fireball.json',this.setupEmitter.bind(this))

    }

    startCasting() {


        this.fireballLayer.position.x = this.manager.sprite.position.x + 0.2*WIDTH
        this.fireballLayer.position.y = this.manager.sprite.position.y - 0.3*HEIGHT
        this.fireball.emit = true
        //this.sound.play()
        //this.animations.scale(this.fireballLayer,{time: this.t_cast, scale: 2})

    }


    startPerforming() {
        let fb = this.fireball
        let callback = ()=> {fb.emit = false}
        this.animations.move(this.fireballLayer,{time: this.t_perform, x: WIDTH*0.8, y: HEIGHT*0.5, reset: true, callback: callback})

    }
    


    startExecuting () {
        this.fireball.emit = false
        //this.sound.stop()
        this.combat.dealDamage(this.power, this.target, this, this.manager)
    }
    

    setupEmitter(options) {
        let emitterSprites = ['assets/pixel100px.png'] // ['assets/solidCircle.png']

        let layer = new Container()
        layer.position.z = e_zIndex.character + 0.1
        this.superScene.addChild(layer)
        layer.name = 'fireball layer'
        this.fireballLayer = layer

        
        options.pos.x = 0
        options.pos.y = 0
        options.emitterLifetime = -1
        this.fireball = new PIXI.particles.Emitter( 
            layer, 
            emitterSprites, 
            options,//emitterOptions_sparks
        )
        this.fireball.emit = false
        this.emitters.push(this.fireball)
        this.emitterOptions = options
        this.manager.manager.zSort()
    }
    


}// basic attack

