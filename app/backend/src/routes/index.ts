import { Router } from 'express';
import teamsRouter from './teams.routes';
import authRouter from './auth.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', authRouter);
router.use('/users', usersRouter);

export default router;
