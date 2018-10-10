

class Buff { // scene?

    constructor(args){//target, superScene, combat, creator) {

        this.target = args.target
        this.combat = args.combat
        this.creator = args.creator

        this.target.addBuff(this)

        this.t_tick = 0
        this.n_ticks = 0
        this.t = 0
        this.n = 0

    }

    update(delta) {
        this.t -= delta
        if (this.t <= 0) {
            this.n -= 1
            this.tick()
            if (this.n <= 0) {
                return this.remove()
            }
            else { this.t = this.t_tick }
        }
    }

    tick() {}
    end() {}

    remove() { this.end(); this.target.removeBuff(this) }
    removeFromScene() {}
}


class Debuff_Stun extends Buff {
    constructor(args) {
        super(args)

        this.t = args.time || 0
        this.target.cancelAbility()
        this.target.state = e_combatStates.stunned

        let btnWidth = SETTINGS.ui.btnWidth
        let path = 'assets/images/abilities/'
        let x = this.target.healthbar.x
        let y = this.target.healthbar.y
        this.sprite = new PIXI.Sprite.fromImage(path+'stun.png')
        this.sprite.position.set(x,y)//0.5*WIDTH, 0.5*HEIGHT)
        this.sprite.width = btnWidth
        this.sprite.height = btnWidth

        

        this.target.scene.addChild(this.sprite)


    }


    end() {
        this.target.scene.removeChild(this.sprite)
        this.target.idle()
    }

    removeFromScene() { this.target.sprite.removeChild(this.sprite) }
} // Stun Debuff



class Buff_Burn extends Buff{

    constructor(args) {
        super(args)



        this.power = 5
        this.t_tick = 1.0 // time between triggers
        this.n_ticks = 3  // number of ticks

        this.t = this.t_tick  // countdown
        this.n = this.n_ticks

    }


    

    tick() {
        let damage = this.power
        this.target.takeDamage(damage, this, this.creator)
    }


}// buff burn




class Buff_Stun extends Buff {
    constructor() {
        super()
    }
}






