import express from "express";
import {createNote, getNotes, getSingleNote, updateNote, deleteNote,trashNotes,restoreNote,togglePinned, permanentDeleteNote} from "../controllers/notes.controllers.js";
import { verifyJWT } from "../middlewere/auth.middlewere.js";

const router = express.Router();
router.post("/", verifyJWT, createNote);
router.get("/", verifyJWT, getNotes);
router.get("/trash", verifyJWT, trashNotes);
router.get("/:id", verifyJWT, getSingleNote);
router.put("/:id", verifyJWT, updateNote);
router.delete("/:id", verifyJWT, deleteNote);
router.delete("/permanent/:id", verifyJWT, permanentDeleteNote);
router.put("/restore/:id", verifyJWT, restoreNote);
router.put("/pin/:id", verifyJWT, togglePinned);

export default router;