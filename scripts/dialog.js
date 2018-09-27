

class Dialog { // not really extension needed

    constructor(manager, superScene) {
        //super(manager, superScene)

        this.stuff = []

    }

    speechBubble(text,options) {

        let speechBubble = new Container()

        let padding = [1.1, 1.1]
        let speech = new PIXI.Text(text,options)
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
        this.stuff.push(speechBubble)
        return speechBubble
    }

    hide() {
        for (let obj of this.stuff) {obj.visible = false}
    }
    show() {
        for (let obj of this.stuff) {obj.visible = true}
    }

    displayNext() {}
    update(delta) {

    }


}