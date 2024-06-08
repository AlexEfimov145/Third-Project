import express, { Router } from "express";
import {  getOne, add, remove, getAll, getAllFollowed, getVacationsFollowsCount, getAllVacationsFollowing } from "../controllers/followers/Controller";
import validate from "../middlewares/input-validation";
import { addFollowerValidator} from '../controllers/followers/Validator';

const router = Router();

router.get('/', getAll);
router.get('/:id([0-9]+)', getOne);
router.get('/counter/:id', getVacationsFollowsCount);
router.get('/statistics', getAllVacationsFollowing);
router.post('/', validate(addFollowerValidator) ,add);
router.delete('/:userId([0-9]+)/:vacationId([0-9]+)',remove);
router.get('/follows/:id([0-9]+)', getAllFollowed);

export default router;