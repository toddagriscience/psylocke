/** All routes should go here. This is so /apiRoutes (see routes/apiRoutes.ts) can return a NAMED list of all of the routes to the frontend.
 *
 * All entries should be of type apiRoute
 */

import type { apiRoute } from '../types/gen.ts';

const routesMap: { [key: string]: apiRoute } = {
  API_ROUTES: { route: '/api-routes' },
  NEW: { route: '/route/${a}/${b}', params: ['a', 'b'] },
};

export default routesMap;
