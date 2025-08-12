import { Router } from 'express';
import authRoute from './authRoutes';
import contractRoute from './contractRoutes';
import projectRoute from './projectRoutes';
import tradeContractRoute from './tradeContractRoutes';
import workAreaRoute from './workAreaRoutes';

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
  {
    path: '/trade',
    route: tradeContractRoute,
  },
  {
    path: '/work-area',
    route: workAreaRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
