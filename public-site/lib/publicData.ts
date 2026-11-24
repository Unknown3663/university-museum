import "server-only";

import { unstable_cache } from "next/cache";
import { supabase } from "./supabaseClient";
import type { Exhibit, Workshop } from "../../shared/types";
import {
  EXHIBITS_PER_PAGE,
  MAX_EXHIBIT_SEARCH_LENGTH,
  isValidExhibitPagination,
  type ExhibitPageData,
} from "./publicDataTypes";

type ExhibitSort = "newest" | "oldest" | "az" | "za";

export interface ExhibitPageParams {
  limit?: number;
  page?: number;
  search?: string;
  sort?: ExhibitSort;
}

const getCachedPublishedWorkshops = unstable_cache(
  async (): Promise<Workshop[]> => {
    const { data, error } = await supabase
      .from("workshops")
      .select(
        "id,title,description,date,order,image_url,published,created_at",
      )
      .eq("published", true)
      .order("order", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Workshop[];
  },
  ["published-workshops"],
  { revalidate: 60 },
);

async function queryExhibits({
  limit,
  page,
  search,
  sort,
}: Required<ExhibitPageParams>): Promise<ExhibitPageData> {
  let query = supabase
    .from("exhibits")
    .select(
      "id,title,description,title_translations,description_translations,image_url,published,created_at",
      { count: "exact" },
    )
    .eq("published", true);

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  switch (sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "az":
      query = query.order("title", { ascending: true });
      break;
    case "za":
      query = query.order("title", { ascending: false });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;
  const { data, error, count } = await query.range(startIndex, endIndex);

  if (error) {
    throw new Error(error.message);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    exhibits: (data ?? []) as Exhibit[],
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

const getCachedDefaultExhibitPage = unstable_cache(
  () => queryExhibits({
    page: 1,
    limit: EXHIBITS_PER_PAGE,
    search: "",
    sort: "newest",
  }),
  ["default-exhibits-page"],
  { revalidate: 30 },
);

export async function getPublishedWorkshops(): Promise<Workshop[]> {
  return getCachedPublishedWorkshops();
}

export async function getExhibitPage({
  limit = EXHIBITS_PER_PAGE,
  page = 1,
  search: rawSearch = "",
  sort = "newest",
}: ExhibitPageParams): Promise<ExhibitPageData> {
  if (!isValidExhibitPagination(page, limit)) {
    throw new RangeError("Invalid exhibit pagination");
  }

  const search = rawSearch
    .trim()
    .slice(0, MAX_EXHIBIT_SEARCH_LENGTH)
    .replace(/[%_\\(),.]/g, "");

  if (!search && page === 1 && limit === EXHIBITS_PER_PAGE && sort === "newest") {
    return getCachedDefaultExhibitPage();
  }

  return queryExhibits({ page, limit, search, sort });
}
