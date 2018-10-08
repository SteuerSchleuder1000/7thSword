

class Dialog { // not really extension needed

    constructor(manager, superScene) {
        //super(manager, superScene)
        this.manager = manager
        this.bubbles = []

    }

    addToScene(args) {
        this.superScene = args.scene
    }

    clear() { for (let b of this.bubbles) { this.superScene.removeChild(b) } }


    display(text, style) {
        this.clear()
        let bubble = this.speechBubble(text, style)
        this.superScene.addChild(bubble)

        this.superScene.interactive = true
        let callback = ()=> {this.manager.event(e_eventIDs.dialog)}
        this.superScene.on('pointerdown', callback.bind(this))
        
    }

    speechBubble(text,style) {

        let speechBubble = new Container()

        let padding = [1.1, 1.1]
        let speech = new PIXI.Text(text,style)
        let width = speech.width*padding[0]
        let height = speech.height*padding[1]
        speech.position.x = speech.width*(padding[0]-1)/2
        speech.position.y = speech.height*(padding[1]-1)/2

        
        let bubble = new Graphics();
        bubble.beginFill(0xFFFFFF);
        bubble.drawRoundedRect(0, 0, width, height, 10)
        bubble.endFill();


        speechBubble.addChild(bubble)
        speechBubble.addChild(speech)
        speechBubble.position.z = 3
        speechBubble.position.set(WIDTH/2-0.5*width, HEIGHT*0.3)
        this.bubbles.push(speechBubble)
        return speechBubble
    }

    hide() {
        for (let obj of this.bubbles) {obj.visible = false}
    }
    show() {
        for (let obj of this.bubbles) {obj.visible = true}
    }

    displayNext() {}
    update(delta) {

    }


}