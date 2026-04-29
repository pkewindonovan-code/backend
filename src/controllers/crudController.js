import { pool } from '../config/db.js';

const tables = {
  categorias: {
    table: 'categoria',
    id: 'id_categoria',
    fields: ['descripcion']
  },
  clientes: {
    table: 'clientes',
    id: 'id_cliente',
    fields: ['nombres', 'apellidos', 'direccion', 'telefono']
  },
  proveedores: {
    table: 'proveedor',
    id: 'id_proveedor',
    fields: ['razonsocial', 'direccion', 'telefono']
  },
  productos: {
    table: 'producto',
    id: 'id_producto',
    fields: ['descripcion', 'precio', 'stock', 'id_categoria', 'id_proveedor']
  }
};

function getConfig(entity) {
  const config = tables[entity];
  if (!config) {
    const error = new Error('Ruta no permitida');
    error.status = 404;
    throw error;
  }
  return config;
}

function cleanBody(body, fields) {
  const values = {};
  for (const field of fields) {
    if (body[field] !== undefined) values[field] = body[field];
  }
  return values;
}

export async function getAll(req, res, next) {
  try {
    const config = getConfig(req.params.entity);
    const result = await pool.query(`SELECT * FROM ${config.table} ORDER BY ${config.id} ASC`);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const config = getConfig(req.params.entity);
    const result = await pool.query(`SELECT * FROM ${config.table} WHERE ${config.id} = $1`, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function createItem(req, res, next) {
  try {
    const config = getConfig(req.params.entity);
    const data = cleanBody(req.body, config.fields);
    const fields = Object.keys(data);
    if (fields.length === 0) return res.status(400).json({ message: 'No enviaste datos válidos' });

    const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');
    const values = fields.map((field) => data[field]);
    const sql = `INSERT INTO ${config.table} (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateItem(req, res, next) {
  try {
    const config = getConfig(req.params.entity);
    const data = cleanBody(req.body, config.fields);
    const fields = Object.keys(data);
    if (fields.length === 0) return res.status(400).json({ message: 'No enviaste datos válidos' });

    const setSql = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = fields.map((field) => data[field]);
    values.push(req.params.id);

    const sql = `UPDATE ${config.table} SET ${setSql} WHERE ${config.id} = $${values.length} RETURNING *`;
    const result = await pool.query(sql, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const config = getConfig(req.params.entity);
    const result = await pool.query(`DELETE FROM ${config.table} WHERE ${config.id} = $1 RETURNING *`, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente', item: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function getProductosDetalle(req, res, next) {
  try {
    const result = await pool.query(`
      SELECT p.*, c.descripcion AS categoria, pr.razonsocial AS proveedor
      FROM producto p
      LEFT JOIN categoria c ON c.id_categoria = p.id_categoria
      LEFT JOIN proveedor pr ON pr.id_proveedor = p.id_proveedor
      ORDER BY p.id_producto ASC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}
