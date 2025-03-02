const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');


//Endpoint para INSERTAR Reservas
router.post("/Realizar_Reserva", (req, res) => {
    console.log("Datos recibidos:", req.body); // ✅ Para verificar qué llega en req.body
    const { tabla, valores } = req.body; // ✅ Extraer correctamente

    if (!tabla || !valores) {
        return res.status(400).send("Faltan datos en la solicitud.");
    }

    const sql = "CALL INSERT_RESERVAS (?, ?)";
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            return res.status(500).send("Error al insertar datos.");
        }
        res.send("Datos ingresados correctamente.");
    });
});


//Endpoint para SELECCIONAR reservas
router.get("/Informacion_Reserva", (req, res) => {
    console.log("Datos recibidos en la consulta:", req.query); // ✅ Para depuración

    const { tabla } = req.query;  
    if (!tabla) {
        return res.status(400).send("Falta el parámetro 'tabla'.");
    }

    const sql = "CALL SELECT_RESERVAS(?)";

    mysqlConnection.query(sql, [tabla], (err, rows) => {
        if (err) {
            console.error("Error en la consulta SQL:", err); // ✅ Ver el error específico
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json(rows);
    });
});



// Endpoint para ELIMINAR reservas
router.delete("/Eliminar_Reserva", (req, res) => {
    console.log("Consulta DELETE recibida:", req.query);

    const { tabla, valores } = req.query;
    if (!tabla || !valores) {
        return res.status(400).send("Faltan parámetros: 'tabla' y 'valores'.");
    }

    const sql = "CALL DELETE_RESERVAS(?, ?)";
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json({ mensaje: "Reserva eliminada correctamente", datos: rows });
    });
});




// Endpoint para ACTUALIZAR reservas

// Endpoint para ACTUALIZAR reservas
router.put("/Actualizar_Reserva", (req, res) => {

    console.log("Consulta PUT recibida:", req.query);

    const { tabla, camposUpdate, PI_PK_COD } = req.query;
    
    if (!tabla || !camposUpdate || !PI_PK_COD) {
        return res.status(400).send("Faltan parámetros: 'tabla', 'camposUpdate' y 'PI_PK_COD'.");
    }

    // Construir la consulta dinámica con los parámetros proporcionados
    const sql = `UPDATE ${tabla} SET ${camposUpdate} WHERE COD_RESERVA = ?`;

    mysqlConnection.query(sql, [PI_PK_COD], (err, result) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }

        // Verificar si se actualizó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).send("No se encontró la reserva con el código proporcionado.");
        }

        res.status(200).json({ mensaje: "Reserva actualizada correctamente", datos: result });
    });
});


//SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL INDEX.JS
module.exports = router;

