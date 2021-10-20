const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "bd_test",
  port: 5432,
});

const getClients = async (req, res) => {
  const response = await pool
    .query("select * from sp_view_client_by_id()")
    .then((resp) => {
      res.json(resp.rows);
    })
    .catch((e) => {
      res.json({
        ok: false,
        error: e,
      });
      throw e;
    });
  return response;
};

const getClientsById = async (req, res) => {
  const id = req.params.id;
  const response = await pool
    .query(`select * from sp_view_client_by_id($1)`, [id])
    .then((resp) => {
      res.json(resp.rows);
    })
    .catch((e) => {
      res.json({
        ok: false,
        error: e,
      });
      throw e;
    });
  return response;
};

const createClient = (req, res) => {
  const { fname, lname, address, birthdate } = req.body;
  const response = pool
    .query(`select sp_create_client($1, $2, $3, $4)`, [
      fname,
      lname,
      address,
      birthdate,
    ])
    .then((resp) => {
      res.json(resp.rows);
    })
    .catch((e) => {
      res.json({
        ok: false,
        error: e,
      });
      throw e;
    });
  return response;
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, address, birthdate } = req.body;
  const response = await pool
    .query(`select sp_update_client_by_id($1, $2, $3, $4, $5)`, [
      id,
      fname,
      lname,
      address,
      birthdate,
    ])
    .then((resp) => {
      res.json(resp.rows);
    })
    .catch((e) => {
      res.json({
        ok: false,
        error: e,
      });
      throw e;
    });
  return response;
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  const response = await pool
    .query(`select sp_delete_client_by_id($1)`, [id])
    .then((resp) => {
      res.json(resp.rows);
    })
    .catch((e) => {
      res.json({
        ok: false,
        error: e,
      });
      throw e;
    });
  return response;
};

module.exports = {
  getClients,
  getClientsById,
  createClient,
  updateClient,
  deleteClient,
};
