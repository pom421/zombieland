const data = require("./data-game.json")
const chalk = require("chalk")

const game = {
  state: data,

  run: function() {
    console.log(chalk.bgRed("\n-- Zombieland --\n"))

    this.nextWave()
 
  },

  exit: function() {
    console.log(chalk.bgBlue("\n-- FIN --\n"))

    this.showState()

    this.state.zombies == 0 ? console.log(chalk.magenta("Vous avez gagné :D")) : console.log(chalk.red("Vous avez perdu :'("))

    console.log("\n")

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

    this.state.zombies = this.nbZombies(this.state.wave.num)

    console.log(chalk.bgBlue(`Début de la vague ${ this.state.wave.num } ------------------------------`))
    console.log("\n-- Phase d'approche --")
    console.log(`${ this.state.zombies.length } zombies menaçants s'approchent.`)
    
    this.attackSoldiers()
    
    if (this.state.city.walls.length) {
      this.wallsAttacked()
    } else {
      this.attackZombies()
    }
      
    if (this.state.soldiers.length == 0 || this.state.wave.num == 10 || this.state.zombies.length == 0) {
      this.exit()
    }
    // sinon
    this.state.wave.num++
    setTimeout(this.nextWave.bind(this), 3000)
    
  },

  nbZombies: function(num) {
    // TODO un jour ajouter des zombies de différents types
    return Array(10 + num * 5).fill()
  },

  attackSoldiers: function() {
    console.log("\n-- Attaque des soldats --")

    const soldiers = this.state.soldiers

    soldiers
      .sort((soldier1, soldier2) => soldier1 - soldier2)
      .every(soldier => {
        if ( !this.state.zombies.length ) {
          return false
        }

        console.log(`${ soldier.name } tue un zombie`)
        this.state.zombies.pop()
        soldier.kills++
        const newLevel = Math.floor(soldier.kills / 10)
        if (newLevel > soldier.level) {
          soldier.level = newLevel
          console.log(`PASSAGE AU NIVEAU ${ soldier.level }`)
        }
        return true

      })

      console.log(chalk.bgBlue(`\Fin du tour : ${ this.state.zombies.length } zombies restants.`))

  },

  wallsAttacked: function() {
    console.log("\n-- Murs --")

    this.state.zombies.every((zombie, index) => {
      if ( !this.state.city.walls.length ) {
        return false
      } 

      const wall = this.state.city.walls[0]
      wall.PV--
      console.log(`Un zombie attaque un mur. Le mur est à ${ wall.PV }/ ${ wall.PVMax }`)

      if ( wall.PV <= 0) {
        console.log("Le mur a cédé !!!")
        this.state.city.walls.pop()
      }
      return true
    })

    console.log(chalk.bgBlue(`\Fin du tour : ${ this.state.city.walls.length } murs restant(s).`))
    
  },

  attackZombies: function() {
    console.log("\n-- Attaque des zombies --")
  },

  showShapeSoldiers: function() {
    console.log("\n")
    this.state.soldiers.forEach( (soldier, index) => {
      console.log(chalk.magenta(`${ index }. ${ soldier.name.padEnd(20) } PV ${ soldier.PV }/${ soldier.PVMax } | #kills ${ soldier.kills } | level ${ soldier.level }`))
    }, this);
    console.log("\n")
  }


}

game.run()