

class Character {
    constructor() {
        this.name = ''
        this.sprite = null
        this.assets = [] // images

    }

    update() {}
    load(callback) {}
    setup(callback) {}
}






class Hero extends Character {
    constructor() {
        super()

        this.name = 'Hero'
        this.sprite = null



    }
}