Post = http://localhost:3000/ModuloPersonas/Insertar_Persona

{
  "tabla": "PERSONAS",
  "valores": "(nombre, apellido, edad, dni, estado_civil, nacionalidad)"
}
{
  "tabla": "EMPLEADOS",
  "valores": "(cod_persona, salario, fecha_contratacion, cargo)"
}
{
  "tabla": "USUARIOS",
  "valores": "(correo, contrasena, tipo_usuario, cod_persona)"
}
{
  "tabla": "TELEFONOS",
  "valores": "(numero_telefono, tipo_telefono, cod_persona, cod_pais)"
}
{
  "tabla": "PASAJEROS",
  "valores": "(cod_persona, cod_boleto, cant_maletas, millas, puntos, pasaporte)"
}
{
  "tabla": "CORREOS",
  "valores": "(direccion_correo, cod_persona, tipo_correo)"
}
{
  "tabla": "DIRECCIONES",
  "valores": "(ciudad, pais, cod_postal, colonia, cod_persona)"
}
