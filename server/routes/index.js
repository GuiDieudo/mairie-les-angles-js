var express = require("express")
var router = express.Router()
const path = require("path")
const fs = require("fs")

const FOLDERS_MATCHING = {
  affichages: "Affichages obligatoires",
  arretes: "Arrêtés",
  "arretes-prefectoraux": "Arrêtés préfectoraux",
  decisions: "Décisions",
  deliberations: "Délibérations",
  "informations-diverses": "Informations diverses",
  recueil: "Recueil des actes administratifs"
}
const directoryPath = path.join(__dirname, "../../public/pdfs/")

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      return {
        path: dirent.name,
        name: FOLDERS_MATCHING[dirent.name]
      }
    })

const loadFilesForDirectory = subPath => {
  const mapper = name => {
    return {
      name: path.basename(name, ".pdf"),
      url: `/pdfs/${subPath}/${name}`,
      thumbnail: "./img/pdf_file.png"
    }
  }
  const sorter = (a, b) => {
    return (
      fs.statSync(`${directoryPath}/${subPath}/${a}`).mtime.getTime() -
      fs.statSync(`${directoryPath}/${subPath}/${b}`).mtime.getTime()
    )
  }

  const files = fs
    .readdirSync(`${directoryPath}/${subPath}`)
    .sort(sorter)
    .map(mapper)

  return {
    name: subPath,
    files
  }
}

router.get("/", function(req, res, next) {
  const directories = getDirectories(directoryPath)

  res.render("index", {
    title: "Mairie Les Anlges",
    directories
  })
})

router.get("/directory/:directory", function(req, res, next) {
  const directory = loadFilesForDirectory(req.params.directory)
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ files: directory.files }))
})

module.exports = router
