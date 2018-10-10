



class Attack_Choice extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'CHOICE'
        this.description = 'Attacks with a single strike. Adds 1 combo'
        this.animationType = e_animationTypes.melee

        let path = 'assets/images/abilities/'
        this.assets = [
            path+'choice.png',     // normal
            path+'choiceA.png',    // active
            path+'choiceB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 1.0
        this.t_cast = 1
        this.t_perform = 0.5
        this.t_performAnimation = 1.0 // time for character animation
        this.t_recovery = 0.5
        this.t = 0

    }


    


    startExecuting() {
        let comboPoints = this.manager.stats.combo
        let damage = parseInt(this.power*this.manager.stats.power)

        if (Math.random() < 0.1*comboPoints || comboPoints == 5) {
            this.manager.changeComboBy(-comboPoints) // gain 1 combo
            this.manager.heal(comboPoints*this.power)
        } 
        else {this.manager.changeComboBy(1)}
        
        this.combat.dealDamage(damage, this.target, this, this.manager)
    }


}// basic attack

