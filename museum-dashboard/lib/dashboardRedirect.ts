const DASHBOARD_PATH = "/dashboard";

export function getDashboardRedirect(
  target: string | null,
  origin: string,
): string {
  try {
    const url = new URL(target || DASHBOARD_PATH, origin);

    if (
      url.origin === origin &&
      (url.pathname === DASHBOARD_PATH ||
        url.pathname.startsWith(`${DASHBOARD_PATH}/`))
    ) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return DASHBOARD_PATH;
  }

  return DASHBOARD_PATH;
}
