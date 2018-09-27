
/*
                                           execute(),
method:       cast()       perform()       recover()       idle()
                v              v              v              v
State:  idle    |   casting    |  performing  |  recovering  |   idle

*/

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
        this.t_perform = 0.5
        this.t_performAnimation = 1.0 // time for character animation
        this.t_recovery = 0.5

        this.t = 0 // used for all
        this.btn = null // only for hero

    }


    




    update(delta) {

        switch(this.state) {

            case e_abStates.idle:
                break;


            case e_abStates.casting:
                // check if target still valid
                // trigger hit animation
                this.t -= delta
                if (this.t <= 0) { this.perform() }
                break;

            case e_abStates.performing:
                this.t -= delta
                if (this.t <= 0) { this.execute()}
                break;

            case e_abStates.recovering:
                this.t -= delta
                if (this.t <= 0) { this.idle() } 
                break;
        }

        if (this.btn) { this.btn.update(delta) }
    }




    cast(target) {
        // console.log('attack cast')
        if (!target) { console.log('ERROR: No Target for Ability', this.name); return }
        if (this.state != e_abStates.idle) { console.log('ERROR: Ability not idle. State:', this.state, e_abStates); return}
        if (this.manager.state != e_combatStates.idle) { console.log('ERROR: Hero not idle. State:', this.manager.state, e_combatStates); return}
        // check if target valid

        this.target = target
        this.t = this.t_cast
        this.state = e_abStates.casting

        if( this.btn ) { this.btn.cast(this.t) }

        // animate stage

        this.manager.cast()
    }




    perform() {
        // console.log('attack perform')
        this.state = e_abStates.performing
        this.t = this.t_perform
        this.manager.perform(this.t_perform)

        if (this.btn) { this.btn.perform() }
    }

    execute() {
        // console.log('attack execute')
        this.t = 0
        this.combat.dealDamage(this.power, this.target, this, this.manager)
        this.recover(this.t_recovery)
    }


    recover(t = this.t_recovery) {
        // console.log('attack recover')
        this.state = e_abStates.recovering
        this.t = t

        if (this.btn) { this.btn.recover() }
    }

    idle() {
        // console.log('attack idle')
        this.state = e_abStates.idle
        this.t = 0

        if (this.btn) { this.btn.idle() }
    }


}// basic attack

