

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
        for (let i=0; i<this.scene.children;i++) {
            if (sprite.position.z > this.scene.children[i].position.z) {
                this.scene.addChildAt(sprite, i)
                return
            }
        }
        this.scene.addChild(sprite)
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


    // pause(b=true) { this.paused = b}

    loadingProgress(e,p) { // called while loading
        if(this.manager) { this.manager.loadingProgress(e,p)}
    }

    update() {
        // update emitters, animations etc.
    }

    removeFromScene() { 
        this.superScene.removeChild(this.scene); 
        this.stopAllSounds()
    }    

    hide() { this.scene.visible = false}
    show() {this.scene.visible = true}

    stopAllSounds() { for (let key of Object.keys(this.sounds)) { this.sounds[key].stop() } }
}








