import type { Exhibit } from "../../shared/types";

export const EXHIBITS_PER_PAGE = 6;

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
