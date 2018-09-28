



class Attack_Emberblade extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Uses 2 combo points to cancel opponents attack and deal double damage'

        this.assets = [
            'assets/emberblade.png',     // normal
            'assets/emberbladeA.png',    // active
            'assets/emberbladeB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 20
        this.t_cast = 2
        this.t_perform = 0.5
        this.t_performAnimation = 1.0 // time for character animation
        this.t_recovery = 2
        this.t = 0

    }


    



    startExecuting() {
        let comboPoints = this.manager.stats.combo
        let damage = this.power

        if (comboPoints >= 2) {
            this.manager.changeCombo(-2) // loose 2 combo
            this.target.cancelAbility()
            damage *= 2
        }
        
        this.combat.dealDamage(damage, this.target, this, this.manager)
    }


}// basic attack

