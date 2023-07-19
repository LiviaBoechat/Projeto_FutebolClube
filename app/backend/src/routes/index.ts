import { Router } from 'express';
import teamsRouter from './teams.routes';
import authRouter from './auth.routes';
import usersRouter from './users.routes';
import matchRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', authRouter);
router.use('/users', usersRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
