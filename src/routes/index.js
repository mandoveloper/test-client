const { Router } = require("express");
const { Client } = require("pg");
const router = Router();

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "bd_test",
  port: 5432,
});

router.get("/api/v1/clientes", (req, res) => {
  client.connect();
  client
    .query("select * from sp_view_client_by_id()")
    .then((response) => {
      res.json(response.rows);
      client.end();
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        err,
      });
      client.end();
    });

});

router.get("/api/v1/clientes/:id", (req, res) => {
    const {id} = req.params;
    console.log(id);
    client.connect();
    client
      .query(`select * from sp_view_client_by_id($1)`, [id])
      .then((response) => {
        res.json(response.rows);
        client.end();
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          err,
        });
        client.end();
      });
});

router.post("/api/v1/clientes/registro", (req, res) => {
    const {fname, lname, address, birthdate} = req.body;
    client.connect();
    client
      .query(`select sp_create_client($1, $2, $3, $4)`, [fname,lname,address,birthdate])
      .then((response) => {
        res.json(response.rows);
        client.end();
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          err,
        });
        client.end();
      });
});

router.post("/api/v1/clientes/:id", (req, res) => {
    const {id} = req.params;
    const {fname, lname, address, birthdate} = req.body;
    client.connect();
    client
      .query(`select sp_update_client_by_id($1, $2, $3, $4, $5)`, [id,fname,lname,address,birthdate])
      .then((response) => {
        res.json(response.rows);
        client.end();
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          err,
        });
        client.end();
      });
});

router.delete("/api/v1/clientes/:id", (req, res) => {
    const {id} = req.params;
    client.connect();
    client
      .query(`select sp_delete_client_by_id($1)`, [id])
      .then((response) => {
        res.json(response.rows);
        client.end();
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          err,
        });
        client.end();
      });
});

module.exports = router;
