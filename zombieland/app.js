const data = require("./data-game.json")
const chalk = require("chalk")

const game = {
  state: data,

  run: function() {
    console.log(chalk.red("\n-- Zombieland --\n"))

    this.nextWave()
 
  },

  exit: function() {
    console.log(chalk.blue("\n-- FIN --\n"))
    process.exit(0)
  },
  
  showState: function() {
    //console.log(`Vague N° ${ this.state.wave.num } | tour ${ this.state.wave.lap }\n`)
    
    console.log(`Il reste ${ this.state.soldiers.length } soldat(s) dans la ville.`)

    this.showShapeSoldiers()
    
    console.log(`Il y a ${ this.state.city.walls.length } mur(s) pour protéger la ville.`)
    
    console.log("\n")
  },
  
  nextWave: function () {

    this.showState()

    console.log(chalk.blue(`Début de la vague ${ this.state.wave.num }`))
    console.log("\n-- Phase d'approche --")
    console.log(`${ this.nbZombies(this.state.wave.num) } zombies menaçants s'approchent.`)
    
    setTimeout(this.attackSoldiers.bind(this), 1000)
    
    setTimeout(this.wallsAttacked.bind(this), 1000)
    
    setTimeout(this.attackZombies.bind(this), 1000)

    if (this.state.soldiers.length == 0 || this.state.wave.num == 4) {
      this.exit()
    }
    // sinon
    this.state.wave.num++
    setTimeout(this.nextWave.bind(this), 3000)
    
  },

  nbZombies: function(num) {
    return 10 + num * 5
  },

  attackSoldiers: function() {
    console.log("\n-- Attaque des soldats --")
  },

  wallsAttacked: function() {
    console.log("\n-- Murs à défendre --")
  },

  attackZombies: function() {
    console.log("\n-- Attaque des zombies --")
  },

  showShapeSoldiers: function() {
    console.log("\n")
    this.state.soldiers.forEach( (soldier, index) => {
      console.log(chalk.magenta(`${ index }. ${ soldier.name.padEnd(20) } PV ${ soldier.PV }/${ soldier.PVMax }`))
    }, this);
    console.log("\n")
  }


}

game.run()