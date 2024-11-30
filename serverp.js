import express from "express";
import dotenv from "dotenv";
import path from "path";
import DaoBetterSqlite3 from "./DaoBetterSqlite3.js"; // Ajusta la ruta según tu estructura
import ModelProfesores from "./models/model.profesores.js"; // Ajusta la ruta según tu estructura

dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciar el controlador de la base de datos y el modelo de profesores
const dbController = new DaoBetterSqlite3("BasePA.s3db");
const profesoresModel = new ModelProfesores(dbController);

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
        <title>Sistema de Profesores</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h1 class="w3-text-primary">Bienvenido al Sistema de Profesores</h1>
            <h3>Pruebe las rutas siguientes:</h3>
            <ul class="w3-ul w3-bordered">
                <li><a href="/getAll">GET /getAll</a>: Lista de profesores</li>
                <li><a href="/insertForm">Formulario para insertar profesor</a></li>
                <li><a href="/updateForm">Formulario para actualizar profesor</a></li>
                <li><a href="/patchForm">Formulario para actualizar un campo específico</a></li>
                <li><a href="/deleteForm">Formulario para borrar profesor</a></li>
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
        <title>Formulario para Insertar Profesor</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para insertar profesor</h2>
            <form action="/insert" method="POST" class="w3-container">
                <label for="nombre" class="w3-label">Nombre:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="apellido" class="w3-label">Apellido:</label>
                <input type="text" name="apellido" class="w3-input w3-border" required>
                
                <label for="edad" class="w3-label">Edad:</label>
                <input type="number" name="edad" class="w3-input w3-border" required>
                
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
        <title>Formulario para Actualizar Profesor</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para actualizar profesor</h2>
            <form action="/put" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del Profesor:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <label for="nombre" class="w3-label">Nombre:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="apellido" class="w3-label">Apellido:</label>
                <input type="text" name="apellido" class="w3-input w3-border" required>
                
                <label for="edad" class="w3-label">Edad:</label>
                <input type="number" name="edad" class="w3-input w3-border" required>
                
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
            <h2 class="w3-text-primary">Formulario para actualizar un campo específico del profesor</h2>
            <form action="/patch" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del Profesor:</label>
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
        <title>Formulario para Eliminar Profesor</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para eliminar profesor</h2>
            <form action="/delete" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del Profesor:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-red w3-margin-top">Eliminar</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

// Rutas API

// Obtener todos los profesores
app.get("/getAll", (req, res) => {
  try {
    const profesores = profesoresModel.getAll();
    res.json(profesores);
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    res.status(500).send({ error: "Error al obtener profesores" });
  }
});

// Obtener un profesor por ID
app.get("/get/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const profesor = profesoresModel.get(id);
    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).send({ error: "Profesor no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener profesor:", error);
    res.status(500).send({ error: "Error al obtener profesor" });
  }
});

// Insertar un nuevo profesor
app.post("/insert", (req, res) => {
  try {
    const { nombre, apellido, edad } = req.body;
    const datos = [nombre, apellido, edad];
    const resultado = profesoresModel.insert(datos);
    res.json({ mensaje: "Profesor insertado con éxito", resultado });
  } catch (error) {
    console.error("Error al insertar profesor:", error);
    res.status(500).send({ error: "Error al insertar profesor" });
  }
});

// Actualizar todos los campos de un profesor
app.post("/put", (req, res) => {
  try {
    const { id, nombre, apellido, edad } = req.body;
    const datos = [nombre, apellido, edad];
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = profesoresModel.update(id, datos);
    res.json({ mensaje: "Profesor actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar profesor:", error);
    res.status(500).send({ error: "Error al actualizar profesor" });
  }
});

// Actualizar un campo específico de un profesor
app.post("/patch", (req, res) => {
  try {
    const { id, campo, valor } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = profesoresModel.patch(id, campo, valor);
    res.json({ mensaje: "Campo actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar campo de profesor:", error);
    res.status(500).send({ error: "Error al actualizar campo" });
  }
});

// Borrar un profesor
app.post("/delete", (req, res) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = profesoresModel.delete(id);
    res.json({ mensaje: "Profesor eliminado con éxito", resultado });
  } catch (error) {
    console.error("Error al eliminar profesor:", error.message);
    res.status(500).send({ error: "Error al eliminar profesor", details: error.message });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});
