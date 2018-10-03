


class Hero extends Character {

    constructor(manager, superScene, combat) {

        super(manager, superScene, combat)
        this.scene.position.z = e_zIndex.hero
        this.name = 'Hero'
        this.playerControlled = true
        this.t_recoveryBlock = 1.0
        this.interface = null

        // STATS
        this.stats = new Stats({
            health: 100, 
            power: 30,
        })


        // Abilities
        this.abilities = [
            new Attack_Fireball(this, superScene, combat),
            new Attack_Swipe(this, superScene , combat), // 
            //new Attack_Emberblade(this, superScene , combat),
            new Attack_Choice(this, superScene , combat),
        ]


        // Animation
        this.frames = {
            idle:               'assets/images/hero/hero01.png',
            casting_melee:      'assets/images/hero/hero02.png',
            casting_spell:      'assets/images/hero/hero06.png',
            performing_melee:   'assets/images/hero/hero03.png',
            performing_spell:   'assets/images/hero/hero07.png',
            blocking:           'assets/images/hero/hero04.png',
            front:              'assets/images/hero/hero05.png',

            // sfx assets
            blockSfx:           'assets/shieldcomb.png',
        }


        // Sounds
        let volume = SETTINGS.sound.volume
        this.sounds = {
            cast:                   new Howl({src: 'assets/sounds/hero/grunt3.ogg', volume: volume}),
            perform:                new Howl({src: 'assets/sounds/hero/attack1.ogg', volume: volume}),
            execute:                new Howl({src: 'assets/sounds/hero/grunt1.ogg', volume: volume}),
            takeDamage:             new Howl({src: ['assets/sounds/hero/wound1.ogg','assets/sounds/hero/wound4.ogg'], volume: volume}),
            block:                  new Howl({src: 'assets/sounds/block1.ogg', volume: volume}),
            block_super:            new Howl({src: 'assets/sounds/clank.wav', volume: volume}),
            armor:                  new Howl({src: 'assets/sounds/armor1.ogg', volume: volume}),
            death:                  new Howl({src: 'assets/sounds/hero/death1.ogg', volume: volume}),

        }
              

        for (let key of Object.keys(this.frames)) { this.assets.push(this.frames[key]) }
    } // constructor



    


    block(b) {
        switch(this.state) {
            case e_combatStates.idle:
                if (b) { super.block() }
                this.blockSfx.visible = true
                break;

            case e_combatStates.blocking:
                if (!b) { 
                    this.interface.greyOut(true)
                    this.recover(this.t_recoveryBlock) 
                }
                this.blockSfx.visible = false
                break;
        }
    } // block


    animateBlock(superBlock) {

        let b = this.blockSfx
        b.visible = true
        let callback = ()=>{b.visible = false}

        let scale = superBlock ? 10 : 2
        let animationTime = superBlock ? 0.8 : 1
        this.animations.scale(this.blockSfx,{time: animationTime, scale: scale, reset: true, easeOut: true})
        this.animations.alpha(this.blockSfx,{time: animationTime, alpha: 0, reset: true, callback: callback})
        console.log(b)
    } // animateBlock


    startPerforming() {
        this.interface.greyOut(true)
    }
    

    startRecovering() {
        if(this.sprite) {this.sprite.tint = 0xba27db}
        
    }

    startIdle() {
        if (this.sprite) {this.sprite.tint = 0xFFFFFF}
        this.interface.greyOut(false)
        if (this.blockSfx.visible) { this.blockSfx.visible = false }
        this.setTarget() 
    }

    setup() {

        this.blockSfx = this.createSprite({
            name: 'shield',
            url: 'assets/shieldcomb.png',
            anchor: [0.5,0.5],
            scale: 0.5,
            x: WIDTH*0.45, 
            y: HEIGHT*0.7, 
            z: this.z-0.1,
            addToScene: true,
            visible: false,
        })


        this.sprite = this.createSprite({
            name: this.name,
            url: this.assets[0],
            anchor: [0.5, 1],
            x: this.x, y: this.y, z: this.z,
            addToScene: true,
        })

        this.animations.breathing(this.sprite)
    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        
        if (this.state == e_combatStates.blocking) {
            let superBlock = (this.t <= this.t_superBlock)
            this.animateBlock(superBlock)
            if (superBlock) { this.changeComboBy(1)}

        } 
    }// take Damage

    setTarget() {
        if (!this.combat) { return }
        let idx = this.combat.enemies.indexOf(this.target)
        if (idx == -1) { 
            let enemies = this.combat.enemies
            // console.log('set target, idx:',idx, 'target:',this.target, 'enemies',enemies, 'enemies.length',enemies.length)

            if (enemies.length > 0) { this.target = this.combat.enemies[0] }
            else { this.target = null }
            // console.log('new target:',this.target)
        }
    }
}// hero









