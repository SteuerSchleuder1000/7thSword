


class Hero extends Character {

    constructor(manager, superScene, combat) {

        super(manager, superScene, combat)
        this.scene.position.z = e_zIndex.hero
        this.name = 'Hero'
        this.playerControlled = true
        this.t_recoveryBlock = 1.0


        // STATS
        this.stats = new Stats({
            health: 100, 
            power: 30,
        })


        // Abilities
        this.abilities = [
            new Attack_Fireball(this, superScene, combat),
            new Attack_Swipe(this, superScene , combat), // 
            new Attack_Emberblade(this, superScene , combat),
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
                if (!b) { this.recover(this.t_recoveryBlock) }
                this.blockSfx.visible = false
                break;
        }
    } // block


    animateBlock(superBlock) {
        let animationTime = 1
        this.blockSfx.visible = true
        let b = this.blockSfx
        let callback = ()=>{b.visible = false}
        this.animations.scale(this.blockSfx,{time: animationTime, scale: 8, reset: true, easeOut: true})
        this.animations.alpha(this.blockSfx,{time: animationTime, alpha: 0, reset: true, callback: callback})
        //this.animations.move(this.blockSfx,{time: animationTime, y: HEIGHT*0.6, reset: true})
    } // animateBlock

    

    startRecovering() {
        if(this.sprite) {this.sprite.tint = 0xba27db}
    }

    startIdle() {
        if (this.sprite) {this.sprite.tint = 0xFFFFFF}
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

    }

    takeDamage(damage, ability, caster) {
        super.takeDamage(damage, ability, caster)
        this.animations.shake(this.healthbar.sprite, {time: 0.5, magnitude:10})
        
        if (this.state == e_combatStates.blocking) {
            let superBlock = (this.t <= this.t_superBlock)
            this.animateBlock(superBlock)
            //(superBlock) ? this.sounds.block_super.play() : this.sounds.block.play()
        } else {
            //this.sounds.takeDamage.play()
        }
    }// take Damage
}// hero









