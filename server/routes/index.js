var express = require("express")
var router = express.Router()
const path = require("path")
const fs = require("fs")

const directoryPath = path.join(__dirname, "../../public/pdfs/")

const sorter = (a, b) => {
  return (
    fs.statSync(`${directoryPath}/${a}`).mtime.getTime() -
    fs.statSync(`${directoryPath}/${b}`).mtime.getTime()
  )
}

const mapper = name => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/pdfs/${name}`,
    thumbnail: "./img/PDF_file_icon.png"
  }
}

/* GET home page. */
router.get("/", function(req, res, next) {
  const files = fs
    .readdirSync(directoryPath)
    .sort(sorter)
    .map(mapper)

  res.render("index", { title: "Mairie Les Anlges", files: files })
})

module.exports = router
