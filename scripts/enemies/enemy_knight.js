
class Enemy_Knight extends Enemy {

    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        this.name = 'Knight'
        this.assets = [
            'assets/abKnight00.png',
            'assets/abKnight01.png',
            'assets/abKnight02.png',
            'assets/abKnight03.png',
        ]

        this.abilities = [
            new Attack_Basic(this, superScene, combat),
            new Attack_Basic(this, superScene, combat),
        ]

        this.state = e_combatStates.idle

    }



    cancelAttack() {}


    decide() {
        this.target = this.combat.hero
        this.abilities[0].run(this.target)
        console.log('knight decided')
    }
}