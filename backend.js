const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const { handleOwnerRegister } = require("./controllers/owner/signup-owner");
const { handleTenantRegister } = require("./controllers/tenant/signup-tenant");
const { handleOwnerSignin } = require("./controllers/owner/signin-owner");
const { handleAdd } = require("./controllers/hostels/add-hostel");
const { handleDelete } = require("./controllers/hostels/delete-hostel");
const { handleUpdate } = require("./controllers/hostels/update-hostel");
const { handleOwnerHostels } = require("./controllers/owner/readOwner-hostel");
const {
  handleTenantHostels,
} = require("./controllers/tenant/readTenant-hostel");

const db = knex({
  // connect to database:
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1234",
    database: "Hostel-System",
  },
});

const app = express();

//middleware
app.use(cors());
app.use(express.json());

/*
{
  "name": "Umar",
  "roll":"1234",
  "email":"umar@gmail.com",
}
*/

app.get("/", (req, res) => {
  res.send(db.owners);
  res.send(db.tenant);
});

//Owner
app.post("/signinOwner", handleOwnerSignin(db, bcrypt));

app.post("/signupOwner", (req, res) => {
  handleOwnerRegister(req, res, db, bcrypt);
});
app.post("/addHostels/:email", (req, res) => {
  handleAdd(req, res, db);
});
app.delete("/deleteHostels/:id", (req, res) => {
  handleDelete(req, res, db);
});
app.put("/updateHostels/:id", (req, res) => {
  handleUpdate(req, res, db);
});
app.get("/getOwnerHostels/:email", (req, res) => {
  handleOwnerHostels(req, res, db);
});

//Tenant
app.get("/getTenantHostels", (req, res) => {
  handleTenantHostels(req, res, db);
});

app.post("/signupTenant", (req, res) => {
  handleTenantRegister(req, res, db, bcrypt);
});
//Port
app.listen(3001, (req, res) => {
  console.log(`Server listening on port 3001`);
});
