

class Loot extends Scene{

    constructor(manager, superScene) {
        super(manager, superScene)

        this.animations = new Animations()
        this.bag = new PIXI.Sprite.fromImage('')
        this.bag.ineractive = true
        this.bag.on('pointerdown', this.clickBag.bind(this))

        this.items = []

    }



    update(delta) {
        this.animations.update(delta)
    }


    fillBag(items) {
        if (!items || items == 'random') {
            let path = 'assets/images/items/'
            let imageUrl = randChoice([
                path+'coin.png',
                path+'exp.png',
            ])

            let item = new PIXI.Sprite.fromImage(imageUrl)
        } 

        else { this.items = items }

        for (let item of this.items) {
            item.interactive = true
            item.id = this.items.indexof(item)
            item.position.set(WIDTH/2,HEIGHT/2)
            item.position.z = e_zIndex.loot +0.2
            item.visible = false
            item.on('pointerdown', this.grabItem.bind(this))
            this.addSprite(item)
        }
    }



    grabItem(e) {
        let idx = parseInt(e.id)
        let item = this.items[idx]
        item.visible = false
        // do other stuff like gain gold, sound effect etc.
    }


    clickBag() {
        let callback = ()=>{ this.openBag() }
        this.animations.shake(this.bag,{time: 2, magnitude: 10, callback: callback.bind(this)})

    }

    openBag() {
        // change texture
        for (let item of this.items) {
            let x = 0
            let y = 0
            let time = 0
            item.visible = true
            this.animations.move(item, {time: time, x: x, y: y,})
        }
    }


} // loo