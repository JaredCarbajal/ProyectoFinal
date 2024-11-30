import express from "express";
import dotenv from "dotenv";
import path from "path";
import DaoBetterSqlite3 from "./DaoBetterSqlite3.js"; // Ajusta la ruta según tu estructura
import ModelFacultad from "./models/model.facultad.js"; // Ajusta la ruta según tu estructura

dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciar el controlador de la base de datos y el modelo de facultad
const dbController = new DaoBetterSqlite3("BasePA.s3db");
const facultadModel = new ModelFacultad(dbController);

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
        <title>Sistema de Facultad</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h1 class="w3-text-primary">Bienvenido al Sistema de Facultad</h1>
            <h3>Pruebe las rutas siguientes:</h3>
            <ul class="w3-ul w3-bordered">
                <li><a href="/getAll">GET /getAll</a>: Lista de facultades</li>
                <li><a href="/insertForm">Formulario para insertar facultad</a></li>
                <li><a href="/updateForm">Formulario para actualizar facultad</a></li>
                <li><a href="/patchForm">Formulario para actualizar un campo específico</a></li>
                <li><a href="/deleteForm">Formulario para borrar facultad</a></li>
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
        <title>Formulario para Insertar Facultad</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para insertar facultad</h2>
            <form action="/insert" method="POST" class="w3-container">
                <label for="nombre" class="w3-label">Nombre de la Facultad:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="telefono" class="w3-label">Teléfono:</label>
                <input type="text" name="telefono" class="w3-input w3-border" required>
                
                <label for="ubicacion" class="w3-label">Ubicación:</label>
                <input type="text" name="ubicacion" class="w3-input w3-border" required>
                
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
        <title>Formulario para Actualizar Facultad</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para actualizar facultad</h2>
            <form action="/put" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID de la Facultad:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <label for="nombre" class="w3-label">Nombre de la Facultad:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="telefono" class="w3-label">Teléfono:</label>
                <input type="text" name="telefono" class="w3-input w3-border" required>
                
                <label for="ubicacion" class="w3-label">Ubicación:</label>
                <input type="text" name="ubicacion" class="w3-input w3-border" required>
                
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
            <h2 class="w3-text-primary">Formulario para actualizar un campo específico de facultad</h2>
            <form action="/patch" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID de la Facultad:</label>
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
        <title>Formulario para Eliminar Facultad</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para eliminar facultad</h2>
            <form action="/delete" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID de la Facultad:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-red w3-margin-top">Eliminar</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

// Rutas API

// Obtener todas las facultades
app.get("/getAll", (req, res) => {
  try {
    const facultades = facultadModel.getAll();
    res.json(facultades);
  } catch (error) {
    console.error("Error al obtener facultades:", error);
    res.status(500).send({ error: "Error al obtener facultades" });
  }
});

// Obtener una facultad por ID
app.get("/get/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const facultad = facultadModel.get(id);
    if (facultad) {
      res.json(facultad);
    } else {
      res.status(404).send({ error: "Facultad no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener facultad:", error);
    res.status(500).send({ error: "Error al obtener facultad" });
  }
});

// Insertar una nueva facultad
app.post("/insert", (req, res) => {
  try {
    const { nombre, telefono, ubicacion } = req.body;
    const datos = [nombre, telefono, ubicacion];
    const resultado = facultadModel.insert(datos);
    res.json({ mensaje: "Facultad insertada con éxito", resultado });
  } catch (error) {
    console.error("Error al insertar facultad:", error);
    res.status(500).send({ error: "Error al insertar facultad" });
  }
});

// Actualizar todos los campos de una facultad
app.post("/put", (req, res) => {
  try {
    const { id, nombre, telefono, ubicacion } = req.body;
    const datos = [nombre, telefono, ubicacion];
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = facultadModel.update(id, datos);
    res.json({ mensaje: "Facultad actualizada con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar facultad:", error);
    res.status(500).send({ error: "Error al actualizar facultad" });
  }
});

// Actualizar un campo específico de una facultad
app.post("/patch", (req, res) => {
  try {
    const { id, campo, valor } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = facultadModel.patch(id, campo, valor);
    res.json({ mensaje: "Campo actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar campo de facultad:", error);
    res.status(500).send({ error: "Error al actualizar campo" });
  }
});

// Borrar una facultad
app.post("/delete", (req, res) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = facultadModel.delete(id);
    res.json({ mensaje: "Facultad eliminada con éxito", resultado });
  } catch (error) {
    console.error("Error al eliminar facultad:", error.message);
    res.status(500).send({ error: "Error al eliminar facultad", details: error.message });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});
