const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 5001
const todoRouter = require("./src/routers/todoRouter")

app.use("/api", todoRouter)

app.get("/", (req, res) => {
    res.send("Hoş Geldiniz ...")
})


app.listen(port, () => {
    console.log(`Server ${port} Portundan Başlatıldı...`)
})