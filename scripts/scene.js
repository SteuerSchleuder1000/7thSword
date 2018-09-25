

class Scene {

    constructor(manager, superScene) {
        
        this.assets = []
        this.loaded = false
        this.manager = manager
        this.paused = true
        this.scene = new Container()
        this.scene.visible = false
        this.superScene = superScene


        this.superScene.addChild(this.scene)
    }

    load(callback) { // loads assets -> calls setup
        
        let setup = _=> { this.setup(callback) }
        let progress = (e,p) => { this.progress(e,p)}
        PIXI.loader
            .add(this.assets)
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


