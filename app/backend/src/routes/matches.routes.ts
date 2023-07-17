import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import authValidation from '../middlewares/AuthValidation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController
  .filteredMatches(req, res));
router.patch(
  '/:id/finish',
  authValidation,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
// router.patch('/:id', authValidation, (req: Request, res: Response) => matchController.update(req, res));
// router.create('/', authValidation, (req: Request, res: Response) => matchController.create(req, res));

export default router;
