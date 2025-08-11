import { Router } from 'express';
import authRoute from './authRoutes';
import contractRoute from './contractRoutes';
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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
