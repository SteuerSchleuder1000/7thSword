


class Enemy extends Character {
    constructor(manager, args) {
        super(manager, args)       
        this.healthbar = null
        this.t_recovery = 0.5
        this.playerControlled = false
        

        this.kp = {
            overhead: {x: 0, y: 0.8},
            head: {x:0, y: 0.6 },
            middle: {x: 0, y: 0.4},
        }
    }
    

    addToScene(args) {
        super.addToScene(args)
        let point = this.keyPoints.overhead()
        this.healthbar = new Healthbar_Enemy(this, this.scene, point.x, point.y)
        this.healthbar.hide()
    }

    hideHealthbar() {this.healthbar.hide() }

    setTarget() { 
        if (this.combat.hero) { 
            this.target = this.combat.hero
            if (this.castingAbility) { this.castingAbility.target = this.target }
        }
    }

}



