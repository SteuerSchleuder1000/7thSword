



class Manager extends Stage {

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
    onExit() { this.scene.visible = false }

    progress(e,p) { 
        //console.log('progress',e.progress) 
    } // called while loading

    update(delta) { this.state.update(delta) }

    transition() {}

}