
class Enemy_Knight extends Enemy {

    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        this.name = 'Knight'


        this.stats = new Stats({health: 200, power: 30})
        this.assets = [
            //'assets/abKnight00.png',
            'assets/abKnight01.png', // 0: idle
            'assets/abKnight02.png', // 1: casting
            'assets/abKnight03.png', // 2: performing
            'assets/abKnight01.png', // 3: blocking
        ]

        let volume = SETTINGS.sound.volume
        this.hitSound = new Howl({src: 'assets/sounds/mechDamage.ogg', volume: volume*0.5})
        this.atkSound = new Howl({src: 'assets/sounds/mechTrigger.ogg', volume: volume*0.5})

        this.abilities = [
            new Attack_Basic(this, superScene, combat),
            new Attack_Basic(this, superScene, combat),
        ]

        this.state = e_combatStates.idle

    }

    //update(delta) {} // do nothing

    cancelAttack() {}

    startPerforming() {
        this.atkSound.play()
    }


    decide() {
        this.target = this.combat.hero
        this.abilities[0].cast(this.target)
    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        this.hitSound.play()
    }
}