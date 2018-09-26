


class Enemy extends Character {
    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)       
        this.healthbar = null 
    }


    

    setup() {
        super.setup()
        this.healthbar = new Healthbar_Enemy(this,this.sprite)
    }


    decide() {}
    update(delta) {
        super.update(delta) // updates all abilites && buffs

        switch (this.state) {

            case e_combatStates.idle: 
                this.decide()
                break;

            case e_combatStates.casting:
                break;

            case e_combatStates.recovering:
                this.t -= delta
                if (this.t <= 0) { this.recover() }
                break;

        }
    }
}



