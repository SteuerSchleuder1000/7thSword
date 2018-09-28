



class Attack_Choice extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Attacks with a single strike. Adds 1 combo'

        this.assets = [
            'assets/choice.png',     // normal
            'assets/choiceA.png',    // active
            'assets/choiceB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 10
        this.t_cast = 1
        this.t_perform = 0.5
        this.t_performAnimation = 1.0 // time for character animation
        this.t_recovery = 0.5
        this.t = 0

    }


    


    execute() { // only function to update!!!
        super.execute() // sets this.t = 0 and this.recover(this.t_recovery)
        
       
    }


    startExecuting() {
        let comboPoints = this.manager.stats.combo
        let damage = this.power

        if (Math.random() < 0.1*comboPoints || comboPoints == 5) {
            this.manager.changeCombo(-comboPoints) // gain 1 combo
            this.manager.changeHealth(comboPoints*this.power)
        } 
        else {this.manager.changeCombo(1)}
        
        this.combat.dealDamage(this.power, this.target, this, this.manager)
    }


}// basic attack

