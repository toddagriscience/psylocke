import routesMap from '../config/routesMap.ts';
import express from 'express';

const router = express.Router();
router.get(routesMap.API_ROUTES, (req, res) => {
  res.send(routesMap);
});

export default router;
