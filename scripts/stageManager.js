



class StageManager extends Stage { // StageManager

    constructor(manager, superScene) {
        super(manager, superScene)
        this.manager = manager
        this.scene = new Container()
        this.state = new Statemachine()
        this.superScene = superScene

        this.scene.visible = false

        this.superScene.addChild(this.scene)
    }

    onEntry() { this.scene.visible = true } // when focus changes to this manager
    onExit() { 
        // if( this.state.current ) { this.state.current.onExit() }
        this.scene.visible = false }

    loadingProgress(e,p) { 
        //console.log('progress',e.progress) 
    } // called while loading

    update(delta) { this.state.update(delta) }

    transition() {}

}