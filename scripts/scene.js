

class Scene { // any game object with sprites

    constructor(manager, superScene, addToSuperScene = true) {
        
        this.assets = []
        this.loaded = false
        this.manager = manager
        this.shouldUpdate = true
        this.scene = new Container()
        //this.scene.visible = false // default invisible?
        this.superScene = superScene
        this.sounds = {}

        if (addToSuperScene && this.superScene) { this.superScene.addChild(this.scene) }
    }

    createSprite(opt) {

        let url = opt.url
        let sprite

        if (url in resources) { sprite = new Sprite(resources[url].texture) }
        else { sprite = new PIXI.Sprite.fromImage(url) }
        

        if ('alpha'     in opt)         { sprite.alpha = opt.alpha}
        if ('anchor'    in opt)         { sprite.anchor.set(opt.anchor[0],opt.anchor[1]) }
        if ('name'      in opt)         { sprite.name = opt.name }
        if ('rotation'  in opt)         { sprite.rotation = opt.rotation }
        if ('scale'     in opt)         { sprite.scale.x = opt.scale, sprite.scale.y = opt.scale  }
        if ('visible'   in opt)         { sprite.visible = opt.visible }
        if ('x'         in opt)         { sprite.position.x = opt.x }
        if ('y'         in opt)         { sprite.position.y = opt.y }
        if ('z'         in opt)         { sprite.position.z = opt.z }
        
        
        if ('height' in opt) { 
            let scale = opt.height/sprite.height
            sprite.height *= scale 
            sprite.width *= scale 
        }
        if ('width' in opt) { 
            let scale = opt.width/sprite.width
            sprite.height *= scale 
            sprite.width *= scale 
        }

        if ('addToScene' in opt) { if (opt.addToScene) { this.addSprite(sprite)} }
        return sprite
    }



    addSprite(sprite) {
        if (!sprite) { console.log('ERROR no sprite to be added', this, sprite); return}
        this.scene.addChild(sprite)
        this.zSort()
    }


    createText(t, args) {
        let text = new PIXI.Text(t, args.style)
        // text.anchor.set(0.5,0.5)
        text.position.set(args.x, args.y)
        text.position.z = args.z
        if (args.anchor) { text.anchor.set(args.anchor[0],args.anchor[1])}
        this.addSprite(text)
        return text
    }

    createButton(args) {
        let btn = new PIXI.Graphics()
        btn.beginFill(0xFFFFFF)
        btn.drawRect(0, 0, args.width, args.height)
        btn.position.set(args.x, args.y)
        btn.position.z = args.z
        btn.interactive = true
        this.addSprite(btn)
        return btn
    }

    createGraphics(args) {
        let btn = new PIXI.Graphics()
        btn.beginFill(0xFFFFFF)
        btn.drawRect(0, 0, args.width, args.height)
        btn.position.set(args.x,args.y)
        btn.position.z = args.z
        btn.interactive = true
        // this.addSprite(btn)
        return btn
    }

    zSort() {
        let zSort = function(a,b) {
            if ( a.position.z === b.position.z ) { return 0 }
            else { return ( a.position.z < b.position.z ? -1 : 1) }
        }
        this.scene.children.sort(zSort)
    }


    load(callback) { // loads assets -> calls setup
        
        let setup = _=> { this.setup(callback) }
        let loadingProgress = (e,p) => { this.loadingProgress(e,p)}

        let assetsToLoad = []
        for (let a of this.assets) {
            if (a in PIXI.loader.resources || assetsToLoad.indexOf(a) != -1 ) { continue }
            assetsToLoad.push(a)
        }

        PIXI.loader
            .add(assetsToLoad)
            .on('progress', loadingProgress.bind(this))
            .load(setup.bind(this))
    } 

    setup(callback) { 
        this.zSort()
        this.loaded = true
        if (callback) { callback() } 
    }


    loadingProgress(e,p) { // called while loading
        if(this.manager) { this.manager.loadingProgress(e,p)}
    }

    update() {
        // update emitters, animations etc.
    }

    removeFromScene() { 
        if (!this.superScene) {return}
        this.superScene.removeChild(this.scene); 
        this.stopAllSounds()
    }    

    hide() { this.scene.visible = false}
    show() {this.scene.visible = true}

    stopAllSounds() { for (let key of Object.keys(this.sounds)) { this.sounds[key].stop() } }
}








