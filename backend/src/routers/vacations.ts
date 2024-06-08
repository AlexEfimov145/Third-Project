import express, { Router } from "express";
import { getAll, getOne, add, update, patch, remove, getAllByStartDate, getAllByBetweenDates } from "../controllers/vacations/Controller";
import validate from "../middlewares/input-validation";
import { addVacationValidator, patchVacationValidator, putVacationValidator } from '../controllers/vacations/Validator';
import enforceAdmin from "../middlewares/enforce-admin";
import addImageToBody from "../middlewares/add-image-to-body";
import uploadImage from "../middlewares/upload-image";
import enforceAuth from "../middlewares/enforce-auth";

const router = Router();
router.use(enforceAuth);
router.get('/', getAll)
router.get('/:id([0-9]+)', getOne)
router.get('/start-date/:date', getAllByStartDate);
router.get('/between-dates', getAllByBetweenDates);
router.post('/', addImageToBody, validate(addVacationValidator) ,uploadImage ,add)
router.put('/:id([0-9]+)',enforceAdmin, addImageToBody, validate(putVacationValidator), uploadImage ,update)
router.patch('/:id([0-9]+)',enforceAdmin, addImageToBody, validate(patchVacationValidator), uploadImage, patch)
router.delete('/:id([0-9]+)', enforceAdmin ,remove)

export default router;