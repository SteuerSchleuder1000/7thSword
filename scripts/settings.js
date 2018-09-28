



let Settings = {
    sound: {
        volume: 1.0,
    },


}


let rainOptions = { // 700 in 1 second
    "alpha": {
        "start": 0.5,
        "end": 0.5
    },
    "scale": {
        "start": 0.1,
        "end": 0.1,
        "minimumScaleMultiplier": 0.1
    },
    "color": {
        "start": "#ffffff",
        "end": "#e4f9ff"
    },
    "speed": {
        "start": 1000,
        "end": 1000,
        "minimumSpeedMultiplier": 0.7
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 89,
        "max": 100
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.25,
        "max": 0.7
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 100,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": {
        "x": 0,
        "y": 0,
        "w": WIDTH*1.1,
        "h": 1
    }
}