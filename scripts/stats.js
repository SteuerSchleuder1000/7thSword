


class Stats {

    constructor() {

        this.power_init = 10
        this.power = 10


        this.health_init = 100
        this.health = 100

        this.combo_max = 5
        this.combo_init = 0
        this.combo = 0

        
        
        
        this.energy = 0
    }

    reset() {
        this.power = this.power_init
        this.health = this.health_init
    }

    changeCombo(d) {
        //console.log('change combo',d)
        if (!d) {return}
        this.combo += d
        this.combo = Math.max(this.combo, 0)
        this.combo = Math.min(this.combo, this.combo_max)
    }
    


} // stats

