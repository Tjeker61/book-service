import {Router} from "express";
import * as publisherController from "../controllers/publisher.controller.js";

const router = Router();

router.get('/publishers/author/:author', publisherController.getPublishersByAuthor)

export default router;
