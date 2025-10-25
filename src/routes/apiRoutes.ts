// Copyright Todd LLC, All rights reserved
import parseApiRoute from '../services/parseApiRoute.ts';
import routesMap from '../config/routesMap.ts';
import express from 'express';

const router = express.Router();
router.get(parseApiRoute(routesMap.API_ROUTES)(), (req, res) => {
  console.log(routesMap);
  res.send(routesMap);
});

export default router;
