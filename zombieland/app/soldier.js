const chance = require("chance").Chance()
const chalk = require("chalk")

const RANKS = [
  {
    level: 5,
    name: 'Major',
    PVMax: 5
  },
  {
    level: 4,
    name: 'Lieutenant',
    PVMax: 5
  },
  {
    level: 3,
    name: 'Sergent',
    PVMax: 4
  },
  {
    level: 2,
    name: 'Caporal',
    PVMax: 4    
  },
  {
    level: 1,
    name: 'Soldat',
    PVMax: 3
  },

]

let id = 1

class Soldier {

  constructor(soldier) {
    const rank = chance.weighted(RANKS, [0, 0, 0.1, 0.2, 0.7])
    
    Object.assign(this, soldier, { 
      id: id++,
      name: chance.name({ gender: "male" }), 
      rank: rank,
      PV: rank.PVMax,
      kills: 0
    })
  }

  show() {
    console.log(chalk.magenta(`${ this.id }. ${ this.name.padEnd(20) } | ${ this.rank.name.padEnd(10) } | PV ${ this.PV }/${ this.rank.PVMax } | #kills ${ this.kills } | level ${ this.rank.level }`))
  }
}


module.exports = Soldier