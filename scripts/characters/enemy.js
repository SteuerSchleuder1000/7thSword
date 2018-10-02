


class Enemy extends Character {
    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)       
        this.healthbar = null
        this.t_recovery = 0.5
        this.playerControlled = false
    }


    

    setup() {
        super.setup()
        this.healthbar = new Healthbar_Enemy(this, this.scene, WIDTH*0.7, HEIGHT*0.39)
        console.log('setup',this.healthbar)
    }

    hideHealthbar() {this.healthbar.hide() }

    

}



