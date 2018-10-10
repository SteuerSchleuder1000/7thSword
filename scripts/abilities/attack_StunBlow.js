

/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/



class Attack_StunBlow extends Ability {


    constructor(manager, superScene, combat) { // superScene = stage
        super(manager, superScene, combat)
        
        this.name = 'Stunblow'
        this.description = 'Attacks for little damage but stuns the target for 2 seconds'
        this.animationType = e_animationTypes.spell

        let path = 'assets/images/abilities/'
        this.assets = [
            path+'burning-dot.png',     // normal
            path+'burning-dotA.png',    // active
            path+'burning-dotB.png',    // cooldown
        ]

        this.power = 0.5
        this.t_cast = 0.5
        this.t_perform = 0.3
        this.t_performAnimation = 0.5 // time for character animation
        this.t_recovery = 3
        this.t = 0


        let volume = SETTINGS.sound.volume
        this.sounds = {
            //cast:       new Howl({src: 'assets/sounds/fireLoop.ogg', volume: volume}),
            //execute:    new Howl({src: 'assets/sounds/fireball_impact.ogg', volume: volume})
        }


        // loadJSON('assets/json/fireball.json',this.setupEmitter.bind(this))

    }

    startCasting() {

        // this.fireball.layer.position.x = this.manager.sprite.position.x + 0.2*WIDTH
        // this.fireball.layer.position.y = this.manager.sprite.position.y - 0.3*HEIGHT
        // this.fireball.emitter.emit = true
    }


    startPerforming() {
        // let fb = this.fireball.emitter
        // let callback = ()=> {fb.emit = false}
        // let x = this.target.sprite.position.x
        // let y = this.target.sprite.position.y - 0.15*HEIGHT
        // this.animations.move(this.fireball.layer,{time: this.t_perform, x: x, y: y, reset: false, callback: callback})

    }
    


    startExecuting () {
        // this.fireball.emitter.emit = false

        let stunDebuff = new Debuff_Stun({target: this.target, creator: this, time: 2.0})

        let damage = parseInt(this.power * this.manager.stats.power)
        this.combat.dealDamage(damage, this.target, this, this.manager)
    }
    
    addToScene(scene) { 
        this.superScene = scene
    }

    
    


}// basic attack

