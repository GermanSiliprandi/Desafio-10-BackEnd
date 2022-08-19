const express = require("express");
const app = express();
const PORT = 8080;
const productos = require("./desafioClase4");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/static", express.static(__dirname + "/public"));

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

const server = app.listen(PORT, (err) => {
    if (err) {
        throw new Error(`Error en Servidor:${err}`);
    } else {
        console.log(`Servidor escuchando en Puerto: ${server.address().port}`);
    }
});

app.get(`/products`, async (req, res) => {
    const allProducts = await productos.getAll();
    res.render(`pages/index.ejs`, {allProducts: allProducts});
});

app.post("/products", async (req, res) => {
    const reqString = JSON.stringify(req.body);
    await productos.save(reqString);
    const allProducts = await productos.getAll();
    console.log(allProducts);
    res.sendStatus(200);
});

//Este template es mi favorito porque 1) cuenta con actualizaciones recientes, a diferencia de pug. 2) Es mas sencillo de implementar que handlebars y la diferencia que hace ejs entre html, texto y js permite un código mas limpio.