



class Background extends Scene {
    constructor(manager, superScene, imgUrl) {
        super(manager, superScene)

        this.assets = [imgUrl]
        this.scene.position.z = e_zIndex.bg
        this.scene.visible = true
    }


    setup() {

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