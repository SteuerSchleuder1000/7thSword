
class Enemy_Knight extends Enemy {

    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        this.name = 'Knight'
        this.assets = [
            //'assets/abKnight00.png',
            'assets/abKnight01.png', // 0: idle
            'assets/abKnight02.png', // 1: casting
            'assets/abKnight03.png', // 2: performing
            'assets/abKnight01.png', // 3: blocking
        ]

        this.abilities = [
            new Attack_Basic(this, superScene, combat),
            new Attack_Basic(this, superScene, combat),
        ]

        this.state = e_combatStates.idle

    }

    //update(delta) {} // do nothing

    cancelAttack() {}


    decide() {
        this.target = this.combat.hero
        this.abilities[0].cast(this.target)
    }
}