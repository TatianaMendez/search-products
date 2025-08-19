import express from "express";
import { getProducts, getProductDetail } from "../services/fakeStoreAPI.js";

const router = express.Router();

router.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  next();
});

router.get("/", async (req, res) => {
  try {
    const search = req.query.search 
      ? req.query.search.toString().trim().toLowerCase() 
      : "";
    const limitParam = Number.parseInt(req.query.limit, 10);
    const offsetParam = Number.parseInt(req.query.offset, 10);
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : 10;
    const page = Number.isFinite(offsetParam) && offsetParam > 0 ? offsetParam : 1;

    let dataProducts;
    try {
      dataProducts = await getProducts();
    } catch (e) {
      console.error("Fallo getProducts:", e);
      return res.json({ items: [] });
    }

    const source = dataProducts.items ?? [];
    const filtered = search
      ? source.filter((item) => item.title?.toLowerCase().includes(search))
      : source;

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = filtered.slice(startIndex, endIndex);

    return res.json({ items, total, limit, offset: page });

  } catch (error) {
    console.error(error);
    res.json({ items: [] });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dataProductDetail = await getProductDetail(req.params.id);
    if (!dataProductDetail) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ item: dataProductDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el detalle del producto." });
  }
});

export default router;
