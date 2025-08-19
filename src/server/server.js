// Levantamiento de servidor | Next.js Express
import express from "express";
import next from "next";
import itemsRoutes from "./routes/items.js";

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use("/api/items", itemsRoutes);

  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });
  const port = 5173;
  server.listen(port, () => {
    console.log(`🚀 Levantamiento de servidor en http://localhost:${port}`);
  });
});
