


class Hero extends Character {

    constructor(manager, superScene, combat) {

        super(manager, superScene, combat)

        this.name = 'Hero'

        this.abilities = [
            new Attack_Basic(this, superScene , combat),
            new Attack_Basic(this, superScene , combat),
            new Attack_Basic(this, superScene , combat),
        ]


        this.assets = [
            'assets/heroback00.png',
            'assets/herobackBlocking.png',
            'assets/heroFront.png',
        ]

        

        
    }

    
}