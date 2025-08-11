import { Router } from 'express';
import authRoute from './authRoutes';
import contractRoute from './contractRoutes';
import projectRoute from './projectRoutes';
const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/contract',
    route: contractRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
