/**
 * Normalizes a path by removing trailing slashes
 */
export function normalizePath(path: string | null | undefined): string {
  return path?.replace(/\/$/, "") || "";
}

type IsActiveRouteParams = {
  pathname: string | null | undefined;
  href: string;
};

type IsActiveRouteOptions = {
  exactMatchOnly?: boolean;
};

/**
 * Checks if a route is active based on the current pathname and target href
 * @param params - Object containing pathname and href
 * @param options - Optional configuration object
 * @param options.exactMatchOnly - If true, only matches exact path (no sub-routes). Default: false
 * @returns true if the route is active
 */
export function isActiveRoute(
  params: IsActiveRouteParams,
  options?: IsActiveRouteOptions
): boolean {
  const { pathname, href } = params;
  const { exactMatchOnly = false } = options ?? {};

  const normalizedPathname = normalizePath(pathname);
  const normalizedHref = normalizePath(href);

  if (exactMatchOnly) {
    return normalizedPathname === normalizedHref;
  }

  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

/**
 * Formats a course edit route with the given course ID and step
 * @param courseId - The ID of the course
 * @param step - The step/section identifier
 * @returns The formatted course edit route path
 */
export function formatCourseEditRoute(courseId: string, step: string): string {
  return `/course/${courseId}/edit/${step}`;
}

