import express from "express";
import cors from "cors";
import { supabase } from "./conexion.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const handle = (res, data, error, status = 200) => {
  if (error) {
    console.log("ERROR SUPABASE:", error);
    return res.status(500).json({
      message: error.message,
      details: error
    });
  }

  return res.status(status).json(data);
};

// CATEGORIA
app.get("/api/categorias", async (req, res) => {
  const { data, error } = await supabase
    .from("categoria")
    .select("*")
    .order("id_categoria", { ascending: true });

  handle(res, data, error);
});

app.post("/api/categorias", async (req, res) => {
  const { descripcion } = req.body;

  const { data, error } = await supabase
    .from("categoria")
    .insert([{ descripcion }])
    .select();

  handle(res, data?.[0], error, 201);
});

app.put("/api/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  const { data, error } = await supabase
    .from("categoria")
    .update({ descripcion })
    .eq("id_categoria", id)
    .select();

  handle(res, data?.[0], error);
});

app.delete("/api/categorias/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("categoria")
    .delete()
    .eq("id_categoria", id);

  handle(res, { message: "Categoría eliminada correctamente" }, error);
});

// PRODUCTO
app.get("/api/productos", async (req, res) => {
  const { data, error } = await supabase
    .from("producto")
    .select("*")
    .order("id_producto", { ascending: true });

  handle(res, data, error);
});

app.post("/api/productos", async (req, res) => {
  const { descripcion, precio, stock, id_categoria, id_proveedor } = req.body;

  const { data, error } = await supabase
    .from("producto")
    .insert([{ descripcion, precio, stock, id_categoria, id_proveedor }])
    .select();

  handle(res, data?.[0], error, 201);
});

app.put("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { descripcion, precio, stock, id_categoria, id_proveedor } = req.body;

  const { data, error } = await supabase
    .from("producto")
    .update({ descripcion, precio, stock, id_categoria, id_proveedor })
    .eq("id_producto", id)
    .select();

  handle(res, data?.[0], error);
});

app.delete("/api/productos/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("producto")
    .delete()
    .eq("id_producto", id);

  handle(res, { message: "Producto eliminado correctamente" }, error);
});

// CLIENTE
app.get("/api/clientes", async (req, res) => {
  const { data, error } = await supabase
    .from("cliente")
    .select("*")
    .order("id_cliente", { ascending: true });

  handle(res, data, error);
});

app.post("/api/clientes", async (req, res) => {
  const { nombres, apellidos, direccion, telefono } = req.body;

  const { data, error } = await supabase
    .from("cliente")
    .insert([{ nombres, apellidos, direccion, telefono }])
    .select();

  handle(res, data?.[0], error, 201);
});

app.put("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, direccion, telefono } = req.body;

  const { data, error } = await supabase
    .from("cliente")
    .update({ nombres, apellidos, direccion, telefono })
    .eq("id_cliente", id)
    .select();

  handle(res, data?.[0], error);
});

app.delete("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("cliente")
    .delete()
    .eq("id_cliente", id);

  handle(res, { message: "Cliente eliminado correctamente" }, error);
});

// PROVEEDOR
app.get("/api/proveedores", async (req, res) => {
  const { data, error } = await supabase
    .from("proveedor")
    .select("*")
    .order("id_proveedor", { ascending: true });

  handle(res, data, error);
});

app.post("/api/proveedores", async (req, res) => {
  const { razonsocial, direccion, telefono } = req.body;

  const { data, error } = await supabase
    .from("proveedor")
    .insert([{ razonsocial, direccion, telefono }])
    .select();

  handle(res, data?.[0], error, 201);
});

app.put("/api/proveedores/:id", async (req, res) => {
  const { id } = req.params;
  const { razonsocial, direccion, telefono } = req.body;

  const { data, error } = await supabase
    .from("proveedor")
    .update({ razonsocial, direccion, telefono })
    .eq("id_proveedor", id)
    .select();

  handle(res, data?.[0], error);
});

app.delete("/api/proveedores/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("proveedor")
    .delete()
    .eq("id_proveedor", id);

  handle(res, { message: "Proveedor eliminado correctamente" }, error);
});

app.get("/", (req, res) => {
  res.json({ message: "API CRUD con Supabase funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor backend activo en puerto ${PORT}`);
});