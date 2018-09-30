
let e_levels = {
    lv_000: 0,
    lv_001: 1,
    lv_002: 2,
    lv_003: 3,
    lv_004: 4,
    lv_005: 5,

    init: {
        0: (m,s) => {return new Level_Test(m, s)},
        1: (m,s) => {return new Level_001(m, s)},
        2: (m,s) => {return new Level_002(m, s)},
        3: (m,s) => {return new Level_002(m, s)},
    },
}





class Level extends Stage {
    constructor(manager, superScene) {
        super(manager, superScene)

        this.interface = null
        this.bg = null
        this.characters = []
        this.complete = false

    }

    update(delta) {
        super.update(delta)
        
    }
    
    onEntry() {
        if (!this.loaded) { this.concatAssets() }
        super.onEntry()
        currentLevel = this
    }

    concatAssets() { // !!! more general implementation

        if(this.interface) { this.assets = this.assets.concat(this.interface.assets) }
        if(this.hero) { this.assets = this.assets.concat(this.hero.assets) }
        if(this.bg) { this.assets = this.assets.concat(this.bg.assets) }
        for (let e of this.characters) {
            this.assets = this.assets.concat(e.assets)
        }

    }

    event(eventID, options) {}

}
















































