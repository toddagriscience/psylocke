import type { apiRoute } from '../types/gen.ts';

/**
 * Parses an API route (in the form of the type apiRoute).
 *
 * @param apiObj the apiRoute
 * @returns A function which takes in the appropriate parameters and returns an appropriate route based off of that.
 * @example
 * // Example usage of the function
 * const route: apiRoute = { route: "/route/${a}/${b}"; params: ["a", "b"] };
 * const routeFunc = parseApiRoute(route);
 * const rawRoute = routeFunc("this", "works");
 * console.log(rawRoute); // outputs /route/this/works
 * */
function parseApiRoute(apiObj: apiRoute) {
  if (apiObj.params == undefined) {
    return new Function(`return \`${apiObj.route}\``);
  }

  return new Function(...apiObj.params, `return \`${apiObj.route}\``);
}

export default parseApiRoute;
