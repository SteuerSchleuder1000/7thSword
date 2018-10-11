


class Stats {

    constructor(args) {

        args = args || {}
        this.id = args.id
        this.manager = args.manager
        this.power_init = args.power || 10
        this.health_init = args.health || 100
        this.energy_init = 0
        this.combo_init = 0
        this.exp = 0
        this.level = args.level || 1
        this.modifiers = [] // objects like equipments, buffs, talents, or story


        this.combo_max = 5
        this.energy_max = 100


        this.scaleToLevel(this.level)
        this.reset()
        // for (let i=1; i<this.level; i++) { this.levelUp() }
        
    }

    init() {
        this.power = this.power_init
        this.health = this.health_init
        this.combo = this.combo_init   
    }


    reset() {
        this.power = this.power_init
        this.health = this.health_init
        this.combo = this.combo_init
    }

    changeComboBy(d) {
        if (!d) {return}
        this.combo += d
        this.combo = floorCeil(this.combo, 0, this.combo_max)
    }

    changeHealthBy(d) {
        if (!d) {return}
        this.health += d
        this.health = floorCeil(this.health, 0, this.health_init)
    }

    changeEnergyBy(d) {
        if (!d) {return}
        this.energy += d
        this.energy = floorCeil(this.energy, 0, this.energy_max)
    }

    gainExp(exp) {
        this.exp += exp
        let lvUp = false
        while (this.exp >= 100) {
            this.exp -= 100
            this.levelUp()
            lvUp = true
        }
        return lvUp
    }

    levelUp() {
        this.level += 1
        this.scaleToLevel(this.level)
        // this.health_init *= 1.1
        // this.power_init *= 1.1

        // this.health = this.health_init
        // this.power = this.power_init
    }

    scaleToLevel(lv) {
        this.level = lv
        this.health_init = parseInt(Math.pow(1.1,lv)*100)
        this.power_init = parseInt(Math.pow(1.1,lv)*10)
        this.speed_init = 1.0

        this.power = this.power_init
        this.health = this.health_init
        this.speed = this.speed_init
    }
    



    update() { // when to update? -> add buff, equipment, start combat, 
        
        let health = this.health
        this.scaleToLevel(this.level)

        for (let obj  of this.manager.buffs) { this.addStats(obj.stats) }
        for (let obj  of this.manager.equipments) { this.addStats(obj.stats) }
        for (let obj  of this.manager.talents) { this.addStats(obj.stats) }
        for (let obj  of this.manager.talents) { this.addStats(obj.stats) }

        this.health = health // reset
        
    }// update

    addStats(stats) {
        this.power += stats.power
    }







} // stats

