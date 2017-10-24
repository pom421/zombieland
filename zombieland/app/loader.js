const fs = require("fs")
const readline = require("readline")
const Soldier = require("./soldier")
const Zombie = require("./zombie")


function load(state, dataFile, eventEmitter) {
  //Object.assign(this, loadState(state, dataFile))
  loadState(state, dataFile)
    .then(newState => {
      Object.assign(state, newState)
      eventEmitter.emit("afterPrepare")
    })
    .catch(err => {
      console.log("Erreur lors de l'appel à loadState", err)
    })
}

function getFromRegex(regex, line) {
  let res = regex.exec(line)
  return res && res[0] ? res[0].length : 0
}

function getNbSoldiers(line) {
  return getFromRegex(/s*/g, line)
}
function getNbSnipers(line) {
  return getFromRegex(/S*/g, line)
}
function getNbTanks(line) {
  return getFromRegex(/T*/g, line)
}
function getWalls(line) {
  let test = /(=*)(_*)/g.exec(line)
  //console.log("=", test[1].length)
  //console.log("_", test[2].length)
}

function debugState(state, msg) {
  console.log("State", msg, JSON.stringify(state, null, " "))
  state.soldiers.forEach(function(element) {
    element.show()
  }, this);
}


function showState(state) {
  console.log(`Il reste ${ state.soldiers.length } soldat(s) dans la ville.`)
  
  state.soldiers.forEach(soldat => {
    soldat.show()
  })

  console.log(`Il y a ${ state.city.walls.length } mur(s) pour protéger la ville.`)
      
  console.log("\n")
}

function loadState(state, dataFile) {
  
  const rl = readline.createInterface({
    input: fs.createReadStream(dataFile)
  })
  
  let newState = { 
    wave: {
      num: 1
    }
  }

  return new Promise((resolve, reject) => {

    rl.on("line", line => {
      const nbSoldiers = getNbSoldiers(line)
      if (nbSoldiers) {
        newState.soldiers = Array(nbSoldiers).fill("").map(soldier => new Soldier())
      }
      //const snipers = getNbSnipers(line)
      //if (snipers) console.log("Snipers trouvés", snipers)
      //const tanks = getNbTanks(line)
      //if (tanks) console.log("Tanks trouvés", tanks)
      const walls = getWalls(line)
      if (walls) console.log("Murs trouvés", walls)
    })

    rl.on("error", err => {
      reject(err)
    })
    
    rl.on("close", () => {
      Object.assign(state, newState)
      showState(state, "FIN DE LECTURE DU FICHIER")
      resolve(state)
    })

  })
 
}

exports.load = load

exports.showState = showState