

class Buff extends Scene{ // scene?

    constructor(target, superScene, combat, creator) {
        super(target, superScene)
        this.target = target
        this.combat = combat
        this.creator = creator

        this.t_tick = 0
        this.n_ticks = 0
        this.t = 0
        this.n = 0

        target.addBuff(this)
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
}




class Buff_Burn extends Buff{

    constructor(target, superScene, combat, creator) {
        super(target, superScene, combat, creator)



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






