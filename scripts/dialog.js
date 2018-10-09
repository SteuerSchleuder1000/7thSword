

class Dialog { // not really extension needed

    constructor(manager, superScene) {
        this.manager = manager
        this.bubbles = []
        this.nodes = {}
    }

    addNode(node) {
        let nodeID = node.id
        this.nodes[nodeID] = node
    }


    displayNode(nodeID, callback) {
        if (!(nodeID in this.nodes)) {console.log('ERROR nodeID not in dialog tree:', nodeID); return}
        let node = this.nodes[nodeID]

        if (node.choice) {} // TODO: implement choice
        if (node.time) {} // TODO: implement timed
        // TODO: correct callback
            
        this.clear()
        let bubble = this.speechBubble(node.text, node.style, node.position)
        this.superScene.addChild(bubble)
        this.superScene.interactive = true

        let nextNodeID = node.next
        // let callback = ()=>{}

        if (nextNodeID) {
            let self = this
            callback = callback ? callback : ()=>{ self.displayNode(nextNodeID) }
            this.superScene.once('pointerdown', callback)
        }

        else {
            let manager = this.manager
            callback = callback ? callback : ()=>{ manager.event(e_eventIDs.dialog) }
            this.superScene.once('pointerdown', callback)
        }
        

    }


    addToScene(args) {
        this.superScene = args.scene
    }

    clear() { for (let b of this.bubbles) { this.superScene.removeChild(b) }; }
    reset() {this.clear(); this.bubbles = []; this.nodes = {}}

    // display(text, style) {
    //     this.clear()
    //     let bubble = this.speechBubble(text, style)
    //     this.superScene.addChild(bubble)

    //     this.superScene.interactive = true
    //     let callback = ()=> {this.manager.event(e_eventIDs.dialog)}
    //     this.superScene.on('pointerdown', callback.bind(this))
        
    // }

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

    hide() { for (let obj of this.bubbles) {obj.visible = false} }
    show() { for (let obj of this.bubbles) {obj.visible = true} }

    update(delta) { }


}