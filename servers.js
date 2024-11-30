import express from "express";
import dotenv from "dotenv";
import path from "path";
import DaoBetterSqlite3 from "./DaoBetterSqlite3.js"; // Ajusta la ruta según tu estructura
import ModelSalones from "./models/model.salones.js"; // Ajusta la ruta según tu estructura

dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciar el controlador de la base de datos y el modelo de salones
const dbController = new DaoBetterSqlite3("BasePA.s3db");
const salonesModel = new ModelSalones(dbController);

const app = express();

// Middleware para procesar datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.static(path.join(process.cwd(), "public")));

// Rutas HTML
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sistema de Salones</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h1 class="w3-text-primary">Bienvenido al Sistema de Salones</h1>
            <h3>Pruebe las rutas siguientes:</h3>
            <ul class="w3-ul w3-bordered">
                <li><a href="/getAll">GET /getAll</a>: Lista de salones</li>
                <li><a href="/insertForm">Formulario para insertar salón</a></li>
                <li><a href="/updateForm">Formulario para actualizar salón</a></li>
                <li><a href="/patchForm">Formulario para actualizar un campo específico</a></li>
                <li><a href="/deleteForm">Formulario para borrar salón</a></li>
            </ul>
        </div>
    </body>
    </html>
  `);
});

// Formularios para pruebas en el navegador

app.get("/insertForm", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario para Insertar Salón</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para insertar salón</h2>
            <form action="/insert" method="POST" class="w3-container">
                <label for="nombre" class="w3-label">Nombre del Salón:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="capacidad" class="w3-label">Capacidad:</label>
                <input type="number" name="capacidad" class="w3-input w3-border" required>
                
                <label for="edificio" class="w3-label">Edificio:</label>
                <input type="text" name="edificio" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-blue w3-margin-top">Insertar</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

app.get("/updateForm", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario para Actualizar Salón</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para actualizar salón</h2>
            <form action="/put" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del Salón:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <label for="nombre" class="w3-label">Nombre del Salón:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="capacidad" class="w3-label">Capacidad:</label>
                <input type="number" name="capacidad" class="w3-input w3-border" required>
                
                <label for="edificio" class="w3-label">Edificio:</label>
                <input type="text" name="edificio" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-blue w3-margin-top">Actualizar</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

app.get("/patchForm", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario para Actualizar un Campo Específico</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para actualizar un campo específico del salón</h2>
            <form action="/patch" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del Salón:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <label for="campo" class="w3-label">Campo:</label>
                <input type="text" name="campo" class="w3-input w3-border" required>
                
                <label for="valor" class="w3-label">Nuevo valor:</label>
                <input type="text" name="valor" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-blue w3-margin-top">Actualizar Campo</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

app.get("/deleteForm", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario para Eliminar Salón</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para eliminar salón</h2>
            <form action="/delete" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del Salón:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-red w3-margin-top">Eliminar</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

// Rutas API

// Obtener todos los salones
app.get("/getAll", (req, res) => {
  try {
    const salones = salonesModel.getAll();
    res.json(salones);
  } catch (error) {
    console.error("Error al obtener salones:", error);
    res.status(500).send({ error: "Error al obtener salones" });
  }
});

// Obtener un salón por ID
app.get("/get/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const salon = salonesModel.get(id);
    if (salon) {
      res.json(salon);
    } else {
      res.status(404).send({ error: "Salón no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener salón:", error);
    res.status(500).send({ error: "Error al obtener salón" });
  }
});

// Insertar un nuevo salón
app.post("/insert", (req, res) => {
  try {
    const { nombre, capacidad, edificio } = req.body;
    const datos = [nombre, capacidad, edificio];
    const resultado = salonesModel.insert(datos);
    res.json({ mensaje: "Salón insertado con éxito", resultado });
  } catch (error) {
    console.error("Error al insertar salón:", error);
    res.status(500).send({ error: "Error al insertar salón" });
  }
});

// Actualizar todos los campos de un salón
app.post("/put", (req, res) => {
  try {
    const { id, nombre, capacidad, edificio } = req.body;
    const datos = [nombre, capacidad, edificio];
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = salonesModel.update(id, datos);
    res.json({ mensaje: "Salón actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar salón:", error);
    res.status(500).send({ error: "Error al actualizar salón" });
  }
});

// Actualizar un campo específico de un salón
app.post("/patch", (req, res) => {
  try {
    const { id, campo, valor } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = salonesModel.patch(id, campo, valor);
    res.json({ mensaje: "Campo actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar campo de salón:", error);
    res.status(500).send({ error: "Error al actualizar campo" });
  }
});

// Borrar un salón
app.post("/delete", (req, res) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = salonesModel.delete(id);
    res.json({ mensaje: "Salón eliminado con éxito", resultado });
  } catch (error) {
    console.error("Error al eliminar salón:", error.message);
    res.status(500).send({ error: "Error al eliminar salón", details: error.message });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});
