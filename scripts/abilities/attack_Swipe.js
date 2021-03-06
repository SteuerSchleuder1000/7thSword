



class Attack_Swipe extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Uses up all combo points and deals that much damage'
        this.animationType = e_animationTypes.melee

        let path = 'assets/images/abilities/'
        this.assets = [
            path+'swipe.png',     // normal
            path+'swipeA.png',    // active
            path+'swipeB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 10
        this.t_cast = 3
        this.t_perform = 0.5
        this.t_performAnimation = 0.2 // time for character animation
        this.t_recovery = 5.0
        this.t = 0

    }


    


    startExecuting() {
        let combopoints = this.manager.stats.combo
        this.manager.changeComboBy(-combopoints) // gain 1 combo
        let damage = combopoints*this.power + this.power
        this.combat.dealDamage(damage, this.target, this, this.manager)
    }


    


}// basic attack

