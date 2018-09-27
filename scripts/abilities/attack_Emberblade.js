



class Attack_Emberblade extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Attacks with a single strike'

        this.assets = [
            'assets/emberblade.png',     // normal
            'assets/emberbladeA.png',    // active
            'assets/emberbladeB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 10
        this.t_cast = 5
        this.t_perform = 0.5
        this.t_performAnimation = 1.0 // time for character animation
        this.t_recovery = 0.5
        this.t = 0

    }


    


    execute() { // only function to update!!!
        super.execute() // sets this.t = 0 and this.recover(this.t_recovery)
        
        this.combat.dealDamage(this.power, this.target, this, this.manager)
    }


    


}// basic attack

