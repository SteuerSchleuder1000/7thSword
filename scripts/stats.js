


class Stats {

    constructor(arg) {

        arg = arg || {}
        this.power_init = arg.power || 10
        this.health_init = arg.health || 100
        this.energy_init = 0
        this.combo_init = 0


        this.combo_max = 5


        
        this.reset()
        
    }

    reset() {
        this.power = this.power_init
        this.health = this.health_init
        this.combo = this.combo_init
    }

    changeCombo(d) {
        //console.log('change combo',d)
        if (!d) {return}
        this.combo += d
        this.combo = Math.max(this.combo, 0)
        this.combo = Math.min(this.combo, this.combo_max)
    }

    changeHealth(d) {
        if (!d) {return}
        this.health += d
    }
    


} // stats

