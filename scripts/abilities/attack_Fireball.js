
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
        this.description = 'Attacks with a single strike'
        this.animationType = e_animationTypes.spell

        let path = 'assets/images/abilities/'
        this.assets = [
            path+'burning-dot.png',     // normal
            path+'burning-dotA.png',    // active
            path+'burning-dotB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 49
        this.t_cast = 2
        this.t_perform = 0.5
        this.t_performAnimation = 0.5 // time for character animation
        this.t_recovery = 3
        this.t = 0


        //this.sound = new Howl({src: 'assets/sounds/fireloop.mp3', loop: true, volume: 1})
        let volume = SETTINGS.sound.volume
        this.sounds = {
            cast:       new Howl({src: 'assets/sounds/fireLoop.ogg', volume: volume}),
            execute:    new Howl({src: 'assets/sounds/fireball_impact.ogg', volume: volume})
        }

        this.fireball = null
        this.fireballLayer = null
        this.emitterOptions = null
        //loadJSON('assets/json/fireball.json',this.setupEmitter.bind(this))

    }

    startCasting() {


        // this.fireballLayer.position.x = this.manager.sprite.position.x + 0.2*WIDTH
        // this.fireballLayer.position.y = this.manager.sprite.position.y - 0.3*HEIGHT
        // this.fireball.emit = true
    }


    startPerforming() {
        let fb = this.fireball
        let callback = ()=> {fb.emit = false}
        let x = this.target.sprite.position.x
        let y = this.target.sprite.position.y - 0.15*HEIGHT
        // this.animations.move(this.fireballLayer,{time: this.t_perform, x: x, y: y, reset: true, callback: callback})

    }
    


    startExecuting () {
        // this.fireball.emit = false
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
        this.objects.push(this.fireball)
        this.emitterOptions = options
        this.manager.manager.zSort()
    }
    


}// basic attack

