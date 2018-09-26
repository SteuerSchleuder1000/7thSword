


let e_combatStates = {
    idle: 0,
    casting: 1,
    recovering: 2,
}



class Stats {

    constructor() {

        this.power_init = 10
        this.health_init = 100

        this.power = 10
        this.health = 100
    }

    reset() {
        this.power = this.power_init
        this.health = this.health_init
    }


} // stats





class Character extends Scene {
    constructor(manager, superScene, combat) {
        super(manager, superScene, false)

        this.combat = combat

        this.name = ''
        this.state = e_combatStates.idle
        

        this.sprite = null
        this.stats = new Stats()
        this.assets = [] // images
        this.abilities = []
        this.buffs = []

        this.t = 0 // cast bar
        this.t_recovery = 0.5 // normal recovery time
        this.target = null // in combat
        this.castingAbility = null // what ability is he casting?

    }

    animate() {}

    
    update(delta) {
        for (let a of this.abilities) { a.update(delta) }
        for (let b of this.buffs) { b.update(delta) }

    }

    recover() {
        this.state = e_combatStates.idle
        this.t
    }


    takeDamage(damage, ability, caster) {
        this.stats.health -= damage
        console.log('took damage',this.name, this.stats.health, damage,caster,ability)
    }

    reset() { 
        this.buffs = []
        this.stats.reset()
    }

    death() {}

    load(callback) {}
    setup(callback) {}
}

















