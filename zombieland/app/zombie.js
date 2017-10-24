const chance = require("chance").Chance()

const RANKS = [
]

class Zombie {

  constructor() {
    console.log("Construction d'un zombie")    
  }

  show() {
    console.log("je suis un zombie")
  }
}

module.exports = Zombie