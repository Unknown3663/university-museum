import type { Exhibit } from "../../shared/types";

export const EXHIBITS_PER_PAGE = 6;
export const MAX_EXHIBIT_SEARCH_LENGTH = 100;

export function isValidExhibitPagination(page: number, limit: number): boolean {
  return (
    Number.isInteger(page) && page >= 1 && page <= 10_000 &&
    Number.isInteger(limit) && limit >= 1 && limit <= 100
  );
}

export interface ExhibitPageData {
  exhibits: Exhibit[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}
