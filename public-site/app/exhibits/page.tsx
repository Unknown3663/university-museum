import ExhibitsClient from "./ExhibitsClient";
import { getExhibitPage } from "../../lib/publicData";
import { EXHIBITS_PER_PAGE, type ExhibitPageData } from "../../lib/publicDataTypes";

type SearchParamValue = string | string[] | undefined;

interface ExhibitsPageProps {
  searchParams?: Promise<Record<string, SearchParamValue>>;
}

const ALLOWED_SORTS = new Set(["newest", "oldest", "az", "za"]);

function getFirstValue(value: SearchParamValue): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ExhibitsPage({
  searchParams,
}: ExhibitsPageProps) {
  const params = (await searchParams) ?? {};
  const rawPage = Number.parseInt(getFirstValue(params.page) || "1", 10);
  const rawSearch = getFirstValue(params.search).trim();
  const rawSort = getFirstValue(params.sort) || "newest";
  const initialPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const initialSort = ALLOWED_SORTS.has(rawSort) ? rawSort : "newest";

  try {
    const initialData = await getExhibitPage({
      page: initialPage,
      limit: EXHIBITS_PER_PAGE,
      search: rawSearch,
      sort: initialSort as "newest" | "oldest" | "az" | "za",
    });

    return (
      <ExhibitsClient
        initialData={initialData}
        initialSearch={rawSearch}
        initialSort={initialSort}
      />
    );
  } catch (error) {
    console.error("Failed to render exhibits page:", error);

    const fallbackData: ExhibitPageData = {
      exhibits: [],
      pagination: {
        page: initialPage,
        limit: EXHIBITS_PER_PAGE,
        total: 0,
        totalPages: 1,
        hasMore: false,
      },
    };

    return (
      <ExhibitsClient
        initialData={fallbackData}
        initialSearch={rawSearch}
        initialSort={initialSort}
        initialError
      />
    );
  }
}
