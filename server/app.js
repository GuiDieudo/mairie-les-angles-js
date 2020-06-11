const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cons = require("consolidate")
const cors = require("cors")

const indexRouter = require("./routes/index")

const app = express()
// const whitelist = ["https://www.grandavignon.fr", "http://www.grandavignon.fr"]
// const corsOptionsDelegate = function(req, callback) {
//   console.log(
//     "corsOptionsDelegate -> corsOptionsDelegate",
//     req.header("Origin")
//   )
//   const corsOptions
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// view engine setup
app.engine("html", cons.swig)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "html")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(cors(corsOptionsDelegate))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/", indexRouter)

module.exports = app
