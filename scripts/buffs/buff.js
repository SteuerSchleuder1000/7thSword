

class Buff extends Scene{

    constructor(manager, superScene, combat, owner) {
        super(manager, superScene)
        this.combat = combat
        this.owner = owner

        this.t_tick = 0
        this.n_ticks = 0
        this.t = 0
        this.n = 0

        manager.addBuff(this)
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

    remove() { this.manager.removeBuff(this) }
}




class Buff_Burn extends Buff{

    constructor(manager, superScene, combat, owner) {
        super(manager, superScene, combat, owner)



        this.power = 5
        this.t_tick = 1.0 // time between triggers
        this.n_ticks = 3  // number of ticks

        this.t = this.t_tick  // countdown
        this.n = this.n_ticks

    }


    

    tick() {
        let damage = this.power
        this.manager.takeDamage(damage, this, this.owner)
    }


}// buff burn











