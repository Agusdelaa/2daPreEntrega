import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"

import { fileURLToPath } from  "url"
import  { dirname } from "path"
import path from "path"

//routes
import productsRouter from "./routes/products.router.js"
import viewsRouter from "./routes/views.router.js"
import cartRouter from "./routes/cart.router.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 8080
const urlMongo = "mongodb+srv://dagustin001:robertito2210@clusterentregaintegrado.eed0qzq.mongodb.net/2daPreentrega?retryWrites=true&w=majority"


app.use(express.json())
app.use(express.static(__dirname + "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine())
app.set("/views", __dirname + "/views")
app.set("views engine", "handlebars")


app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)

app.listen(PORT, () => {
    console.log(`Server Online on Port ${PORT}`)
})

mongoose.connect(urlMongo)
.then(()=> {
    console.log("Conectado a la Base de Datos")
})
.catch(error => {
    console.log("Error al conectarse a la Base de Datos", error)
})