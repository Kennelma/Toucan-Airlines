const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD'); //se importa la conexion de la base de datos

//Endpoint para INSERTAR personas
router.post("/Insertar_Persona", (req, res) => {
    const { tabla, valores } = req.body;
    const sql = "CALL INSERT_PERSONAS (?, ?)"; 

    console.log(" 📥 Datos recibidos:", req.body);

    // Realizar la consulta a la base de datos
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            res.status(500).send("Error al insertar datos");
        } else {
            console.log("Respuesta de la base de datos:", rows);
            res.send(" ✅ Datos ingresados correctamente");
        }
    });
});


//Endpoint para SELECCIONAR personas
router.get("/Informacion_Personas", (req,res) =>{
    const { tabla, valor } = req.body;
    const sql = "CALL SELECT_PERSONAS (?, ?)"; 

    mysqlConnection.query(sql, [tabla, valor], (err, rows) => {
        if (err) {
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json(rows);
    });
});


// Endpoint para ELIMINAR PERSONAS
router.delete("/Eliminar_Persona", (req, res) => {

    const { tabla, valores } = req.body;
    const sql = "CALL DELETE_PERSONAS (?, ?)";

    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (!err) {
            res.status(200).send(` ✅ Registro con ID ${valores} eliminado correctamente!`);
        } else {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }    
        
    });
});

// Endpoint para ACTUALIZAR PERSONAS
router.put("/Actualizar_Persona", (req, res) => {

    const { tabla, id, valores } = req.body;
    const camposUpdate = Object.keys(valores).map(key => `\`${key}\` = '${valores[key]}'`).join(', ');

    const sql = "CALL UPDATE_PERSONAS (?, ?, ?)";
    mysqlConnection.query(sql, [tabla, id, camposUpdate], (err, rows) => {
        if (!err) {
            res.status(200).send(` ✅ Registro con ID ${id} actualizado correctamente!`);
        } else {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }    
    });
});

//SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL INDEX.JS
module.exports = router;

