const express = require("express");
const {
    registerMapData,
    getMapData,
    updateMapData,
    deleteMapData,
} = require("../controllers/mapDataController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router
    .route("/")
    .get(protect, getMapData)
    .post(protect, admin, registerMapData)
    .put(protect, admin, updateMapData)
    .delete(protect, admin, deleteMapData);

module.exports = router;
