



class Background extends Scene {
    constructor(manager, args) {
        super(manager)

        this.assets = args.assets
        this.scene.position.z = e_zIndex.bg
        this.scene.visible = true
        this.sprite = null
    }


    addToScene(args) {
        this.superScene = args.scene
        this.superScene.addChild(this.scene)

        this.sprite = this.createSprite({
            name: 'bg',
            url: this.assets[0],
            anchor: [0.5, 0],
            height: HEIGHT,
            x: WIDTH/2,
            y: 0,
            z: 0,
            addToScene: true,
        })
    }
}