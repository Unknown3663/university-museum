import ExhibitsClient from "./ExhibitsClient";
import { getExhibitPage } from "../../lib/publicData";
import {
  EXHIBITS_PER_PAGE,
  MAX_EXHIBIT_SEARCH_LENGTH,
  isValidExhibitPagination,
  type ExhibitPageData,
} from "../../lib/publicDataTypes";

export const fetchCache = "default-no-store";

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
  const initialSearch = getFirstValue(params.search)
    .trim()
    .slice(0, MAX_EXHIBIT_SEARCH_LENGTH);
  const rawSort = getFirstValue(params.sort) || "newest";
  const initialPage = isValidExhibitPagination(rawPage, EXHIBITS_PER_PAGE)
    ? rawPage
    : 1;
  const initialSort = ALLOWED_SORTS.has(rawSort) ? rawSort : "newest";

  try {
    const initialData = await getExhibitPage({
      page: initialPage,
      limit: EXHIBITS_PER_PAGE,
      search: initialSearch,
      sort: initialSort as "newest" | "oldest" | "az" | "za",
    });

    return (
      <ExhibitsClient
        initialData={initialData}
        initialSearch={initialSearch}
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
        initialSearch={initialSearch}
        initialSort={initialSort}
        initialError
      />
    );
  }
}
