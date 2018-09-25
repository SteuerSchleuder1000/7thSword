

class Scene {

    constructor(manager, superScene) {
        
        //this.anim = new Animation()
        this.assets = []
        this.loaded = false
        this.manager = manager
        this.paused = true
        this.scene = new Container()
        this.scene.visible = false
        this.superScene = superScene


        this.superScene.addChild(this.scene)
    }

    createSprite(opt) {
        //console.log('createSprite: ',opt)
        let url = opt.url
        if (!(url in resources)) { console.log('ERROR url not in resources', url, resources); return}
        let sprite = new Sprite(resources[url].texture)

        if ('anchor'    in opt)         { sprite.anchor.set(opt.anchor[0],opt.anchor[1]) }
        if ('name'      in opt)         { sprite.name = opt.name }
        if ('rotation'  in opt)         { sprite.rotation = opt.rotation }
        if ('scale'     in opt)         { sprite.scale = opt.scale }
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
            if ( a.z === b.z ) { return 0 }
            else { return ( a.z < b.z ? -1 : 1) }
        }
        this.scene.children.sort(zSort)
    }

    load(callback) { // loads assets -> calls setup
        
        let setup = _=> { this.setup(callback) }
        let progress = (e,p) => { this.progress(e,p)}

        let assetsToLoad = []
        for (let a of this.assets) {
            if (a in PIXI.loader.resources || assetsToLoad.indexOf(a) != -1 ) { continue }
            assetsToLoad.push(a)
        }

        PIXI.loader
            .add(assetsToLoad)
            .on('progress', progress.bind(this))
            .load(setup.bind(this))
    } 

    setup(callback) { 
        this.loaded = true
        if (callback) { callback() } 
    }

    onEntry() {
        if (this.loaded) { this.scene.visible = true }
        else { 
            let callback = _=> { this.onEntry() }
            this.load(callback)
        }
    }

    onExit() {
        this.scene.visible = false
    }



    pause(b=true) { this.paused = b}

    progress(e,p) { // called while loading
        if(this.manager) { this.manager.progress(e,p)}
    }

    update() {}

}


