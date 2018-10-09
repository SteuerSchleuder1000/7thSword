
let e_levels = {
    lv_000: 0,
    lv_001: 1,
    lv_002: 2,
    lv_003: 3,
    lv_004: 4,
    lv_005: 5,

    init: {
        0: (m,s,args) => {return new Level_Test(m, s,args)},
        1: (m,s,args) => {return new Level_001(m, s,args)},
        2: (m,s,args) => {return new Level_002(m, s,args)},
        3: (m,s,args) => {return new Level_002(m, s,args)},
    },
}


let e_weather = {
    // rain: 0,
    // rain2: 1,
    // flame: 2,


    // properties: {
    //     0: { options: emitterOptions_rain, textures: ['assets/raindrop.png']},
    //     1: { options: emitterOptions_rain2, textures: ['assets/raindrop.png']},
    //     2: { options: emitterOptions_flame, textures: ['assets/flame.png','assets/solidCircle.png']}
    // },
}

// let e_levelStates = {
//     idle: 0,
//     waiting: 1,
// }

let textStyles = {
    normal: {fontFamily : 'Arial', fontSize: 24, align : 'center'},
    banner: {fontFamily : 'Arial', fontSize: 20, align : 'center', fill: 0xFFFFFF, fontWeight: 'bold'},
    damage: {fontFamily : 'Arial', fontSize: 30, align : 'center', fill: 0x960f0d, fontWeight: 'bold'},
}



class Progress { // state for statemachine
    constructor(args) {
        this.c = 0              // counter
        this.n =        args.n  // number of adds
        this.entry =    args.entry 
        this.exit =     args.exit  
        this.keyNext =  args.next // next key
        this.onTime =   args.onTime || false // if true -> eval will ++this.c

        if (!this.entry) {this.entry = ()=>{}}
        if (!this.exit)  {this.exit = ()=>{}}
    }

    add (c=1) { this.c += c } // progress
    eval (delta) { 
        if (this.onTime) { this.c += delta }
        return this.c >= this.n 
    }
}


class Level extends Stage {
    constructor(manager, superScene, args) {
        super(manager, superScene)

        this.bg = null
        this.characters = []
        this.complete = false
        this.phase = 0 // progression phase
        this.animations = new Animations()
        
        this.interface = null
        this.combat = null
        this.dialog = null

        // this.worldLayer = new PIXI.Container()
        // this.worldLayer.position.z = e_zIndex.bg
        // this.addSprite(this.worldLayer)

        // this.interfaceLayer = new PIXI.Container()
        // this.interfaceLayer.position.z = e_zIndex.interface
        // this.addSprite(this.interfaceLayer)

        // this.state = e_levelStates.idle
        // this.t = 0
    }

    update(delta) {
        super.update(delta)
        if (!this.shouldUpdate) { return }
        // switch (this.state) {
        //     case e_levelStates.watiting:
        //         thist.t -= delta
        //         if (this.t <= 0) { this.idle() }
        //         break
        // }
    }



    // wait (t) { 
    //     this.state = e_levelStates.waiting
    //     this.t = t
    // }

    // idle () {
    //     this.state = e_levelStates.idle
    //     this.t = 0
    // }
    



    onEntry() {
        if (!this.loaded) { this.concatAssets() }
        super.onEntry()
        // currentLevel = this
    }

    concatAssets() { // !!! more general implementation

        if(this.interface) { this.assets = this.assets.concat(this.interface.assets) }
        if(this.hero) { this.assets = this.assets.concat(this.hero.assets) }
        if(this.bg) { this.assets = this.assets.concat(this.bg.assets) }
        for (let e of this.characters) {
            if (!e) { console.log('ERROR character undefined'); continue }
            this.assets = this.assets.concat(e.assets)
        }

    }

    progress() {}

    event(eventID, options) {}

    start() {}
    end () {}

    restartLevel() {
        console.log('restart level')
        this.end()
        this.manager.restartLevel()
    }

    // weather(type, zIndex) {

    //     let layer = new Container()
    //     layer.position.z = zIndex
    //     this.addSprite(layer)

    //     let options = e_weather.properties[type].options
    //     let sprites = []
    //     let textureUrls = e_weather.properties[type].textures

    //     for (let url of textureUrls) {
    //         let sprite = PIXI.Texture.fromImage(url)
    //         sprites.push(sprite)
    //     }
    
    //     let emitter = new PIXI.particles.Emitter( layer, sprites, options )
    //     emitter.emit = true
    //     this.objects.push(emitter)
    // }

    shakeScreen(magnitude = 5) {
        this.animations.shake(this.scene,{time:0.5,magnitude:magnitude})
    }

    startCombat() {
        this.combat.start(); 
        this.interface.show()
        this.dialog.hide()
    }

    endCombat() {
        this.combat.end()
    }

    startDialog() {
        this.combat.end()
        this.interface.hide()
        this.dialog.show()
    }

    endDialog() {
        this.dialog.hide()
    }

    addBannerText(text) {
        this.bannerText = new PIXI.Text(text,textStyles.banner)
        let displacement = SETTINGS.ui.btnWidth *1.5
        this.bannerText.position.set(0.5*WIDTH, displacement)
        this.bannerText.position.z = e_zIndex.interface + 0.2
        this.bannerText.anchor.set(0.5,0)
        this.addSprite(this.bannerText)
    }

    updateBannerText(text) {
        if(this.bannerText) { this.bannerText.text = text }
    }

    damageText(damage) {
        let text = new PIXI.Text(damage, textStyles.damage)
        text.position.set(0.5*WIDTH,0.5*HEIGHT)
        text.position.z = e_zIndex.character +0.1
        this.addSprite(text)

        let callback = ()=> { this.superScene.removeChild(text)}
        let time = 2
        this.animations.move(text,{time:time, y: 0.2*HEIGHT, callback: callback.bind(this)})
        this.animations.alpha(text,{time:time, alpha: 0})
    }
}
















































