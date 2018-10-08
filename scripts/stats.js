


class Stats {

    constructor(arg) {

        arg = arg || {}
        this.power_init = arg.power || 10
        this.health_init = arg.health || 100
        this.energy_init = 0
        this.combo_init = 0
        this.exp = 0
        this.level = 1


        this.combo_max = 5
        this.energy_max = 100


        
        this.reset()
        
    }

    reset() {
        this.power = this.power_init
        this.health = this.health_init
        this.health_max = this.health_init
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
        this.health = floorCeil(this.health, 0, this.health_max)
    }

    changeEnergyBy(d) {
        if (!d) {return}
        this.energy += d
        this.energy = floorCeil(this.energy, 0, this.energy_max)
    }

    gainExp(exp) {
        this.exp += exp
        if (this.exp >= 100) {
            console.log('LEVEL UP')
            this.levelUp()
        }
    }

    levelUp() {
        this.level += 1
        this.health_init *= 1.1
        this.power_init *= 1.1

        this.health = this.health_init
        this.power = this.power_init
    }
    


} // stats

