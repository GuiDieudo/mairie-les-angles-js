const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cons = require("consolidate")
const cors = require("cors")

const indexRouter = require("./routes/index")

const app = express()

app.engine("html", cons.swig)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "html")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "../public")))

app.use("/", indexRouter)

module.exports = app
