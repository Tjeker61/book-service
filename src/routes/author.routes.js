import {Router} from "express";
import * as authorController from "../controllers/author.controller.js";

const router = Router();

router.get('/authors/book/:isbn', authorController.getAuthorsByBook)
router.delete('/author/:author', authorController.removeAuthor)

export default router;
