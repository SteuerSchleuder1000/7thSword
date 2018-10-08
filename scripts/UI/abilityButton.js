
class AbilityButton extends Scene {
    constructor(ability, interfaceScene, sprite, hero) {
        super(ability, interfaceScene) // manager = heroAbility
        this.ability = ability
        this.ability.btn = this

        this.scene.visible = true
        this.sprite = sprite
        this.hero = hero
        this.addSprite(sprite)
        this.sprite.interactive = true
        this.sprite.on('pointerdown', this.buttonEvent.bind(this) )

        this.line = new Graphics()
        this.line.position.z = 100
        this.addSprite(this.line) 

        let path = 'assets/sounds/'
        let volume = SETTINGS.sound.volume
        this.sounds = {
            click: new Howl({src: path+'click.ogg', volume: volume*2})
        }

        this.emitters = [] // sparks
        this.sparksEmitter = null
        loadJSON('assets/json/sparks4.json',this.setupEmitter.bind(this))
    }

    loadingBar(delta) {

        let t = this.ability.t
        let duration

        switch (this.ability.state) {
            case e_abStates.idle:
                return
                break;

            case e_abStates.casting:
                duration = this.ability.t_cast
                t = duration - t
                break;

            case e_abStates.performing:
                return
                break;

            case e_abStates.recovering:
                duration = this.ability.t_recovery
                break
        }



        let progress = Math.max((t % duration)/duration,0)
        let x = this.sprite.position.x
        let y = this.sprite.position.y
        let w = this.sprite.width
        let lineWidth = 10

        this.line.clear()        
        this.line.lineStyle(lineWidth, 0xFFFFFF, 1);
        this.line.moveTo(x,y);


        if (progress > 0.25) { this.line.lineTo(x,y+w) }
        else { 
            let w0 = w*(progress)/0.25
            this.line.lineTo(x, y+w0) 
            return
        }

        if (progress > 0.5) { this.line.lineTo(x+w,y+w) }
        else { 
            let w0 = w*(progress-0.25)/0.25
            this.line.lineTo(x+w0,y+w)
            return
        }

        if (progress > 0.75) { 
            let w0 = w - w*(progress-0.75)/0.25 - lineWidth*0.5
            this.line.lineTo(x+w,y) 
            this.line.lineTo(x+w0,y)
        } else { 
            let w0 = w - w*(progress-0.5)/0.25
            this.line.lineTo(x+w,y+w0) 
            return
        }

        
    }// castbar



    cast() {
        let url = this.ability.assets[1]
        let texture = resources[url].texture
        this.sprite.texture = texture
        this.line.alpha = 1
        if(this.sparksEmitter) { this.sparksEmitter.playOnce() }
        this.sounds.click.play()
    }

    perform() {
        // let url = this.ability.assets[1]
        // let texture = resources[url].texture
        // this.sprite.texture = texture
        this.line.clear()
    }

    recover() {
        let url = this.ability.assets[2]
        let texture = resources[url].texture
        this.sprite.texture = texture
        this.line.alpha = 0.5
    }

    idle() {
        let url = this.ability.assets[0]
        let texture = resources[url].texture
        this.sprite.texture = texture
        this.line.clear()
    }

    update(delta) { 
        this.loadingBar(delta)
        for (let e of this.emitters) { e.update(delta) }
        // update castBar
    }

    flash() {
        // special effects
    }

    buttonEvent(e) {
        this.ability.cast(this.hero.target)
    }

    setupEmitter(options) {
        let emitterSprites = ['assets/images/particles/pixel100px.png'] // ['assets/solidCircle.png']
        let btnWidth = this.sprite.width
        let layer = new Container()
        this.addSprite(layer)

        layer.position.z = e_zIndex.interface - 0.1
        options.pos.x = this.sprite.position.x //+ 0.5*btnWidth //WIDTH/2
        options.pos.y = this.sprite.position.y //+ 0.5*btnWidth //HEIGHT/2
        options.spawnRect.w = btnWidth*1.2
        options.spawnRect.h = btnWidth*1.2
        options.emitterLifetime = 0.2
        this.sparksEmitter = new PIXI.particles.Emitter( 
            layer, 
            emitterSprites, 
            options,//emitterOptions_sparks
            )
        this.sparksEmitter.emit = false
        this.emitters.push(this.sparksEmitter)
        this.emitterOptions = options
        this.zSort()
    }
}
