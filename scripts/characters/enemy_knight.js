
class Enemy_Knight extends Enemy {

    constructor(manager, superScene, combat) {
        super(manager, superScene, combat)
        this.name = 'Knight'


        // Stats
        this.stats = new Stats({
            health: 100, 
            power: 30,
        })


        // Animation
        let path = 'assets/images/characters/'
        this.frames = {
            idle:               path+'knight01.png',
            casting_melee:      path+'knight02.png',
            casting_spell:      path+'knight02.png',
            performing_melee:   path+'knight03.png',
            performing_spell:   path+'knight03.png',
            blocking:           path+'knight04.png',
            front:              path+'knight01.png',

            // sfx assets
            blockSfx:           'assets/images/hero/shieldcomb.png',
        }


        // Sounds
        let volume = SETTINGS.sound.volume
        this.sounds = {
            cast:                   new Howl({src: 'assets/sounds/knight/aggro1.ogg', volume: volume}),
            perform:                new Howl({src: 'assets/sounds/knight/aggro2.ogg', volume: volume}),
            execute:                new Howl({src: 'assets/sounds/knight/attack1.ogg', volume: volume}),
            takeDamage:             new Howl({src: ['assets/sounds/knight/wound1.ogg','assets/sounds/knight/wound2.ogg'], volume: volume}),
            block:                  new Howl({src: 'assets/sounds/clank1.ogg', volume: volume}),
            block_super:            new Howl({src: 'assets/sounds/clank2.ogg', volume: volume}),
            armor:                  new Howl({src: 'assets/sounds/clank2.ogg', volume: volume}),
            death:                  new Howl({src: 'assets/sounds/knight/death1.ogg', volume: volume}),

        }


        // Abilities
        this.abilities = [
            new Attack_Basic(this, superScene, combat),
            new Attack_Firering(this, superScene, combat),
        ]



        this.state = e_combatStates.idle
        for (let key of Object.keys(this.frames)) { this.assets.push(this.frames[key]) } // concat assets

    } // constructor


    // setup() {
    //     super.setup()
    //     // this.animations.breathing(this.sprite) // find a better setup
    // }

    decide() {
        //console.log('decide', this.stats.combo)
        this.target = this.combat.hero
        let idle0 = this.abilities[0].state == e_abStates.idle
        let idle1 = this.abilities[1].state == e_abStates.idle

        if (this.stats.combo >= this.abilities[1].cost_combo && idle1) {
            this.abilities[1].cast(this.target)
        }
        else if (idle0) { this.abilities[0].cast(this.target); this.changeComboBy(1) }
        else { this.wait(1.0) }
    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        //this.hitSound.play()
    }
}