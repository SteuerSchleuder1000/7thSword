





class Stage extends Scene { // stage for menues, levels etc.

    constructor(manager, superScene) {
        super(manager, superScene)
        this.animations = null
        this.objects = [] // all game objects
    }

    start() {}



    update(delta) {
        super.update(delta)
        if (this.paused) {return}
        if (this.animations) { this.animations.update(delta) }
        for (let o of this.objects) { o.update(delta) }
    }



    onEntry() {
        if (this.loaded) { 
            this.scene.visible = true; 
            this.start()
        }
        else { 
            let callback = _=> { this.onEntry() }
            this.load(callback)
        }
    }

    onExit() {
        this.scene.visible = false
    }


}
