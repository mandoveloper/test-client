const { Router } = require("express");
const {
  getClients,
  createClient,
  updateClient,
  getClientsById,
  deleteClient,
} = require("../controllers/index.controllers");

const router = Router();

router.get("/api/v1/clientes", getClients);

router.get("/api/v1/clientes/:id", getClientsById);

router.post("/api/v1/clientes/registro", createClient);

router.post("/api/v1/clientes/:id", updateClient);

router.delete("/api/v1/clientes/:id", deleteClient);

module.exports = router;
