/** Depicts an API route. This exists to allow for a list of all API routes to be sent to the frontend without having to utilize eval(). This solution utilizes `new Function()` instead with a much stricter system (see services/parseApiRoute.ts)
 *
 * A complete example may look like this: { route: "/route/${a}/${b}"; params: ["a", "b"] }
 * Or this: { route: "/new-route" }
 * */
export interface apiRoute {
  /** The raw route. If parameters are included, then the route should not utilize template literals but just a string instead. For example:
   *
   * Good: "/user/${id}/"
   * Bad: `/user/${id}/`
   * */
  route: string;
  /** An optional list of parameters. These need to be aligned with the string given in the `route` field. They are not type checked.
   *
   * Good: { route: "/route/${a}/${b}"; params: ["a", "b"] }
   * Bad: { route: "/route/${a}/${b}"; params: ["b", "a"] }
   * */
  params?: Array<string>;
}
