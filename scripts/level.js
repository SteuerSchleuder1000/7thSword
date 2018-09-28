
let e_levels = {
    lv_000: 0,
    lv_001: 1,
    lv_002: 2,
    lv_003: 3,
    lv_004: 4,
    lv_005: 5,

    init: {
        0:_=> {},
        1: (m,s) => {return new Level_001(m, s)},
        2: (m,s) => {return new Level_002(m, s)},
        3: (m,s) => {return new Level_003(m, s)},
    },
}





class Level extends Stage {
    constructor(manager, superScene) {
        super(manager, superScene)

        this.interface = null
        this.characters = []

    }
    
    onEntry() {
        if (!this.loaded) { this.concatAssets() }
        super.onEntry()
        currentLevel = this
    }

    concatAssets() { // !!! more general implementation

        if(this.interface) { this.assets = this.assets.concat(this.interface.assets) }
        if(this.hero) { this.assets = this.assets.concat(this.hero.assets) }
        for (let e of this.characters) {
            this.assets = this.assets.concat(e.assets)
        }

    }

    event(eventID, options) {}

}
















































