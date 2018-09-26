

class Ability extends Scene {
    constructor(character, stageScene, combat) { // manager == character

        super(character, stageScene, false)
        this.combat = combat
        this.target = null

    }

    update() {}
    run() {} // start ability
    cast() {} // ability executes

}




let e_abStates = {
    idle: 0,
    casting: 1,
    recovering: 2,
}


// generic class that should fit all btns
class AbilityIcon extends Scene {
    constructor(manager, interfaceScene) {
        super(manager, interfaceScene) // manager = heroAbility

    }

    run() {}
    cast() {}
    recover() {}
    flash() {}

}







class Attack_Basic extends Ability {


    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        
        this.name = 'Basic Attack'
        this.description = 'Attacks with a single strike'

        this.assets = ['assets/swipe.png', 'assets/swipeA.png']

        this.state = e_abStates.idle
        this.power = 10
        this.t_cast = 2
        this.t_recovery = 0.5

        this.t = 0 // used for all
        this.btn = null // only for hero

    }


    run(target) {
        
        if (!target) { console.log('ERROR: No Target for Ability', this.name); return }
        if (this.state != e_abStates.idle) { console.log('ERROR: Ability not idle. State:', this.state)}
        // check if target still valid

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
    }


    cast() {

        this.combat.dealDamage(
            damage = this.power, 
            target = this.target, 
            ability = this,
            caster = this.manager
        )

        this.state = e_abStates.recovering
        this.t = this.t_recovery

        if( this.btn ) { this.btn.cast() }

        // animate stage

        this.manager.state = e_combatStates.recovering
        this.manager.t = this.manager.t_recovery
        // animate manager
    }


    recover() {
        this.state = e_abStates.idle
        this.t = 0

        if (this.btn) { this.btn.recover() }
    }


}// basic attack





















