import express from "express";
import dotenv from "dotenv";
import path from "path";
import DaoBetterSqlite3 from "./DaoBetterSqlite3.js"; // Ajusta la ruta según tu estructura
import ModelCursos from "./models/model.cursos.js"; // Ajusta la ruta según tu estructura

dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciar el controlador de la base de datos y el modelo de cursos
const dbController = new DaoBetterSqlite3("BasePA.s3db");
const cursosModel = new ModelCursos(dbController);

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
        <title>Sistema de Cursos</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h1 class="w3-text-primary">Bienvenido al Sistema de Cursos</h1>
            <h3>Pruebe las rutas siguientes:</h3>
            <ul class="w3-ul w3-bordered">
                <li><a href="/getAll">GET /getAll</a>: Lista de cursos</li>
                <li><a href="/insertForm">Formulario para insertar curso</a></li>
                <li><a href="/updateForm">Formulario para actualizar curso</a></li>
                <li><a href="/patchForm">Formulario para actualizar un campo específico</a></li>
                <li><a href="/deleteForm">Formulario para borrar curso</a></li>
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
        <title>Formulario para Insertar Curso</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para insertar curso</h2>
            <form action="/insert" method="POST" class="w3-container">
                <label for="nombre" class="w3-label">Nombre del curso:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="creditos" class="w3-label">Créditos:</label>
                <input type="number" name="creditos" class="w3-input w3-border" required>
                
                <label for="semestre" class="w3-label">Semestre:</label>
                <input type="text" name="semestre" class="w3-input w3-border" required>
                
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
        <title>Formulario para Actualizar Curso</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para actualizar curso</h2>
            <form action="/put" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del curso:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <label for="nombre" class="w3-label">Nombre del curso:</label>
                <input type="text" name="nombre" class="w3-input w3-border" required>
                
                <label for="creditos" class="w3-label">Créditos:</label>
                <input type="number" name="creditos" class="w3-input w3-border" required>
                
                <label for="semestre" class="w3-label">Semestre:</label>
                <input type="text" name="semestre" class="w3-input w3-border" required>
                
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
            <h2 class="w3-text-primary">Formulario para actualizar un campo específico del curso</h2>
            <form action="/patch" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del curso:</label>
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
        <title>Formulario para Eliminar Curso</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-container">
            <h2 class="w3-text-primary">Formulario para eliminar curso</h2>
            <form action="/delete" method="POST" class="w3-container">
                <label for="id" class="w3-label">ID del curso:</label>
                <input type="number" name="id" class="w3-input w3-border" required>
                
                <button type="submit" class="w3-button w3-red w3-margin-top">Eliminar</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

// Rutas API

// Obtener todos los cursos
app.get("/getAll", (req, res) => {
  try {
    const cursos = cursosModel.getAll();
    res.json(cursos);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).send({ error: "Error al obtener cursos" });
  }
});

// Obtener un curso por ID
app.get("/get/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const curso = cursosModel.get(id);
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).send({ error: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener curso:", error);
    res.status(500).send({ error: "Error al obtener curso" });
  }
});

// Insertar un nuevo curso
app.post("/insert", (req, res) => {
  try {
    const { nombre, creditos, semestre } = req.body;
    const datos = [nombre, creditos, semestre];
    const resultado = cursosModel.insert(datos);
    res.json({ mensaje: "Curso insertado con éxito", resultado });
  } catch (error) {
    console.error("Error al insertar curso:", error);
    res.status(500).send({ error: "Error al insertar curso" });
  }
});

// Actualizar todos los campos de un curso
app.post("/put", (req, res) => {
  try {
    const { id, nombre, creditos, semestre } = req.body;
    const datos = [nombre, creditos, semestre];
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = cursosModel.update(id, datos);
    res.json({ mensaje: "Curso actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar curso:", error);
    res.status(500).send({ error: "Error al actualizar curso" });
  }
});

// Actualizar un campo específico de un curso
app.post("/patch", (req, res) => {
  try {
    const { id, campo, valor } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = cursosModel.patch(id, campo, valor);
    res.json({ mensaje: "Campo actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar campo de curso:", error);
    res.status(500).send({ error: "Error al actualizar campo" });
  }
});

// Borrar un curso
app.post("/delete", (req, res) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = cursosModel.delete(id);
    res.json({ mensaje: "Curso eliminado con éxito", resultado });
  } catch (error) {
    console.error("Error al eliminar curso:", error.message);
    res.status(500).send({ error: "Error al eliminar curso", details: error.message });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});
