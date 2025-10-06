addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.55, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(4)
        if (hasUpgrade('p', 17)) mult = mult.times(upgradeEffect('p', 17))
        if (hasUpgrade('s', 11)) mult = mult.times(3.75)
        if (hasUpgrade('s', 14)) mult = mult.times(5.25)
        if (hasUpgrade('e', 11)) mult = mult.times(2)
        if (hasUpgrade('k', 11)) mult = mult.times(256)
        if (hasUpgrade('k', 14)) mult = mult.times(3000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
       11: {
            title: "Skill Boost",
            description: "Skill gain is multiplied by 3.",
            cost: new Decimal(2),
        },
        12: {
            title: "Skill Boost Again",
            description: "Skill gain is multiplied by 5.",
            cost: new Decimal(4),
        },
        13: {
            title: "A More Interesting Boost",
            description: "Skill gain is boosted based on Prestige Points.",
            cost: new Decimal(12),
            effect() {
                return player[this.layer].points.add(1).pow(0.525)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "More Prestige Points",
            description: "Prestige Point gain is multiplied by 4.",
            cost: new Decimal(55),
        },
        15: {
            title: "HUGE Skill Boost",
            description: "Skill gain is multiplied by 50.",
            cost: new Decimal(375),
            tooltip: "The next upgrade will cost 10,000 Prestige Points.",
        },
        16: {
            title: "Exponential",
            description: "Skill gain is boosted based on Prestige Points.",
            cost: new Decimal(70000),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        17: {
            title: "Prestige Point Boost",
            description: "Prestige Point gain is multiplied based on your Points.",
            cost: new Decimal(1.125e9),
            effect() {
                return player.points.add(1).pow(0.055)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Huge multipliers wont hurt, right?",
            description: "Skill gain is multiplied by 1,000.",
            currencyLocation() {return player.points},
            cost: new Decimal(9.375e17),
            
        },
        22: {
            title: "Huge multipliers wont hurt, right? 2",
            description: "Energy gain is multiplied by 30,000.",
            currencyLocation() {return player.points},
            cost: new Decimal(4.375e63),
            
        },
    },
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
})
addLayer("e", {
    name: "energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFF04F",
    requires: new Decimal(400000), // Can be a function that takes requirement increases into account
    resource: "energy", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.425, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 12)) mult = mult.times(1.5)
        if (hasUpgrade('s', 11)) mult = mult.times(2.25)
        if (hasUpgrade('p', 22)) mult = mult.times(30000)
        if (hasUpgrade('s', 14)) mult = mult.times(3)
        if (hasUpgrade('s', 12)) mult = mult.times(2)
        if (hasUpgrade('k', 11)) mult = mult.times(80)
        if (hasUpgrade('k', 13)) mult = mult.times(0.75)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
       11: {
            title: "2 of them?",
            description: "x5 Skill gain, x2 PP gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Energy Boost",
            description: "Energy gain is multiplied by 1.5.",
            cost: new Decimal(2),
        },
        13: {
            title: "Again?",
            description: "Skill gain is boosted based on Energy.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(2).pow(0.675)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        
    },
    hotkeys: [
        {key: "e", description: "E: Reset for e points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
})
addLayer("s", {
    name: "strength", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF1414",
    requires: new Decimal(18750000), // Can be a function that takes requirement increases into account
    resource: "strength", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.405, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       
        if (hasUpgrade('s', 11)) mult = mult.times(1.75)
        if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
        if (hasUpgrade('s', 14)) mult = mult.times(1.85)
        if (hasUpgrade('k', 11)) mult = mult.times(15)
        if (hasUpgrade('k', 12)) mult = mult.times(5)
        
        
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
       11: {
            title: "Strength Training I",
            description: "x1.75 Strengh gain, x4.5 Skill gain, x3.75 PP gain, x2.25 Energy gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Energy Boost II",
            description: "Energy gain is multiplied by 2.",
            cost: new Decimal(2),
        },
        13: {
            title: "Strength Training II",
            description: "Strength gain is boosted based on Points.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Large Boost I",
            description: "x1.85 Strength gain, x3 Energy gain, x5.25 PP gain, x16.5 Skill gain.",
            cost: new Decimal(35),
        },
        15: {
            title: "Skill Training I",
            description: "Skill gain is boosted based on Strength.",
            cost: new Decimal(80),
            effect() {
                return player[this.layer].points.add(1).pow(0.775)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
    
    hotkeys: [
        {key: "e", description: "E: Reset for e points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
})
addLayer("k", {
    name: "knowledge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#805000",
    requires: new Decimal(1e24), // Can be a function that takes requirement increases into account
    resource: "knowledge", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.333, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        if (hasUpgrade('k', 11)) mult = mult.times(1.3)
        if (hasUpgrade('k', 13)) mult = mult.times(2.5)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
       11: {
            title: "This is normal by now",
            description: "x1.3 Knowledge gain, x15 strength gain, x80 Energy gain, x256 PP gain, x500 Skill gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Punching Trees",
            description: "x5 strength gain, x1.25 Material gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "Reading Books",
            description: "x2.5 Knowledge gain, but x0.75 energy gain.",
            cost: new Decimal(4),
            
        },
        14: {
            title: "PP Boost",
            description: "x3,000 PP gain.",
            cost: new Decimal(4),
            
        },
        
    },
    hotkeys: [
        {key: "e", description: "E: Reset for e points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
})