export const pages = [
  {
    route: "/Guide",
    description: "Comparing with bruteforce",
  },
  {
    route: "/Quadratic",
    description: "Bezier Quadratic",
  },
  {
    route: "/Generalized",
    description: "Bezier Generalized",
  },
  {
    route: "/Compare",
    description: "Comparing with bruteforce",
  },
];

// Extract the type of the 'route' property from each object in the array
type RouteItem = (typeof pages)[number]["route"];

// Use this utility type to create a union of all possible route values
export type ROUTES = RouteItem;
