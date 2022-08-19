const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const PORT = 8080;
const productos = require("./desafioClase4");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("hbs", handlebars.engine({
    //handlebars es un objeto ahora
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: `${__dirname}/views/pages`,
    partialsDir: `${__dirname}/views/partials`
}))

const server = app.listen(PORT, (err) => {
    if (err) {
        throw new Error(`Error en Servidor:${err}`);
    } else {
        console.log(`Servidor escuchando en Puerto: ${server.address().port}`);
    }
})

app.set(`views`, `./views`);
app.set(`view engine`, `hbs`);
app.set(__dirname + `/static`, express.static(`public`));

app.get(`/products`, async (req, res) => {
    const allProducts = await productos.getAll();
    res.render(`main`, {allProducts: allProducts});
});

app.post("/products", async (req, res) => {
    const reqString = JSON.stringify(req.body);
    const reqParse = JSON.parse(reqString);
    const newId = await productos.save(reqParse);
    reqParse.id = newId;
    const allProducts = await productos.getAll();
    res.render(`main`, {allProducts: allProducts});
});

//Este template es mi favorito porque 1) cuenta con actualizaciones recientes, a diferencia de pug. 2) Es mas sencillo de implementar que handlebars y la diferencia que hace ejs entre html, texto y js permite un código mas limpio.