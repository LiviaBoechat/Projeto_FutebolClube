import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController.findAllHome(req, res));
router.get('/away', (req: Request, res: Response) => leaderboardController.findAllAway(req, res));
router.get('/', (req: Request, res: Response) => leaderboardController.findAll(req, res));

export default router;
