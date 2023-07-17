import { Router } from 'express';
import teamsRouter from './teams.routes';
import authRouter from './auth.routes';
import usersRouter from './users.routes';
import matchRouter from './matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', authRouter);
router.use('/users', usersRouter);
router.use('/matches', matchRouter);

export default router;
