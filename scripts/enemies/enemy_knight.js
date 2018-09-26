
class Enemy_Knight extends Enemy {

    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        console.log('this is knight',this)
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



    update(delta) {
        //console.log('why no update???',delta)
        if (delta == undefined) {return}
        super.update(delta)
        //console.log('update',delta.toFixed(3), this)

        switch (this.state) {

            case e_combatStates.idle: 
                this.decide()
                break;

            case e_combatStates.casting:
                break;

            case e_combatStates.recovering:
                
                this.t -= delta
                if (this.t <= 0) { this.recover() }

                break;


        }
    }

    cancelAttack() {}

    recover() {
        this.state = e_combatStates.idle
        this.t = 0
        console.log('knight recoverd',this)
    }

    decide() {
        this.target = this.combat.hero
        this.abilities[0].run(this.target)
        console.log('knight decided',this)
    }
}