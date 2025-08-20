import express from "express";
import { deleteMultipleUsers, getClients, searchClient, searchClientbyId } from "../controllers/clientesController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, getClients);
router.get("/search", authenticateToken, searchClient);
router.get("/:ID_User", authenticateToken,searchClientbyId);
router.delete("/", authenticateToken, deleteMultipleUsers);


export default router;
