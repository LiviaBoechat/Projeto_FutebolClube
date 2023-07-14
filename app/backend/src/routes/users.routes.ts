import { Router } from 'express';
import UsersController from '../controllers/UserControllet';

const userController = new UsersController();

const router = Router();

router.get('/', (req, res) => userController.findAll(req, res));
router.get('/:id', (req, res) => userController.findById(req, res));

export default router;
