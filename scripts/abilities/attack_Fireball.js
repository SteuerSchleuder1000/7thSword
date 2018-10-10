
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

        this.power = 4
        this.t_cast = 2
        this.t_perform = 0.5
        this.t_performAnimation = 0.5 // time for character animation
        this.t_recovery = 3
        this.t = 0


        let volume = SETTINGS.sound.volume
        this.sounds = {
            cast:       new Howl({src: 'assets/sounds/fireLoop.ogg', volume: volume}),
            execute:    new Howl({src: 'assets/sounds/fireball_impact.ogg', volume: volume})
        }


        this.fireball = null // = { emitter: __, layer: ___, options: ___}
        loadJSON('assets/json/fireball.json',this.setupEmitter.bind(this))

    }

    startCasting() {

        this.fireball.layer.position.x = this.manager.sprite.position.x + 0.2*WIDTH
        this.fireball.layer.position.y = this.manager.sprite.position.y - 0.3*HEIGHT
        this.fireball.emitter.emit = true
    }


    startPerforming() {
        let fb = this.fireball.emitter
        let callback = ()=> {fb.emit = false}
        let x = this.target.sprite.position.x
        let y = this.target.sprite.position.y - 0.15*HEIGHT
        this.animations.move(this.fireball.layer,{time: this.t_perform, x: x, y: y, reset: false, callback: callback})

    }
    


    startExecuting () {
        this.fireball.emitter.emit = false
        let damage = parseInt(this.power * this.manager.stats.power)
        this.combat.dealDamage(damage, this.target, this, this.manager)
    }
    
    addToScene(scene) { 
        this.superScene = scene
        this.superScene.addChild(this.fireball.layer)
    }

    setupEmitter(options) {
        let emitterSprites = ['assets/images/particles/pixel100px.png'] // ['assets/solidCircle.png']

        let layer = new PIXI.Container()
        layer.name = 'fireball layer'
        layer.position.z = e_zIndex.character + 0.1
        if (this.superScene) { this.superScene.addChild(layer) }
        

        
        options.pos.x = 0
        options.pos.y = 0
        options.emitterLifetime = -1


        let emitter = new PIXI.particles.Emitter( 
            layer, 
            emitterSprites, 
            options,//emitterOptions_sparks
        )
        emitter.emit = false


        this.fireball = { // SFX OBJECT
            emitter: emitter,
            layer: layer,
            options: options,
            update: (delta)=>emitter.update(delta)
        }

        this.objects.push(this.fireball)
    }
    


}// basic attack

