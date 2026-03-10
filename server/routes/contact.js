const express = require("express");
const router = express.Router();

const { createContact } = require("../controllers/Contact");

router.post("/create", createContact);

module.exports = router;
