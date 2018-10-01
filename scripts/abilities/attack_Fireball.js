
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

        this.emitterOptions = loadJSON('assets/json/fire2.png')

    }

    startCasting() {

        let options = this.emitterOptions
        options.pos.x = this.manager.sprite.position.x
        options.pos.y = this.manager.sprite.position.y


        let emitter = new PIXI.particles.Emitter(

            this.superScene, // container
            [PIXI.Texture.fromImage('assets/solidCircle.png')], // images
            options

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

