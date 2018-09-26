
class Attack_Basic extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Attacks with a single strike'

        this.assets = [
            'assets/swipe.png',     // normal
            'assets/swipeA.png',    // active
            'assets/swipeB.png',    // cooldown
        ]

        this.state = e_abStates.idle
        this.power = 10
        this.t_cast = 5
        this.t_recovery = 0.5

        this.t = 0 // used for all
        this.btn = null // only for hero

    }


    run(target) {
        
        if (!target) { console.log('ERROR: No Target for Ability', this.name); return }
        if (this.state != e_abStates.idle) { console.log('ERROR: Ability not idle. State:', this.state); return}
        if (this.manager.state != e_combatStates.idle) { console.log('ERROR: Hero not idle. State:', this.manager.state); return}
        // check if target valid

        this.target = target
        this.t = this.t_cast
        this.state = e_abStates.casting

        if( this.btn ) { this.btn.run() }

        // animate stage

        this.manager.castingAbility = this
        this.manager.state = e_combatStates.casting
        // animate manager

    }




    update(delta) {

        switch(this.state) {
            case e_abStates.idle:
                break;


            case e_abStates.casting:
                // check if target still valid
                this.t -= delta
                if (this.t <= 0) { this.cast() }
                break;


            case e_abStates.recovering:
                this.t -= delta
                if (this.t <= 0) { this.recover() } 
                break;
        }

        if (this.btn) { this.btn.update(delta) }
    }


    cast() {

        this.combat.dealDamage(this.power, this.target, this, this.manager)

        this.state = e_abStates.recovering
        this.t = this.t_recovery

        if( this.btn ) { this.btn.cast() }

        // animate stage

        this.manager.t = this.manager.t_recovery
        this.manager.state = e_combatStates.recovering
        
        // animate manager
    }


    recover() {
        this.state = e_abStates.idle
        this.t = 0

        if (this.btn) { this.btn.recover() }
    }


}// basic attack

