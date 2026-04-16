"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";
import Navbar from "../components/Navbar";
import ExhibitCard from "../components/ExhibitCard";
import SignatureLogo from "../components/SignatureLogo";
import Footer from "../components/Footer";
import CollectionSkeleton from "../components/CollectionSkeleton";
import type { Exhibit } from "../../../shared/types";
import { EXHIBITS_PER_PAGE, type ExhibitPageData } from "../../lib/publicDataTypes";
import { useLanguage } from "../../../shared/i18n/LanguageContext";
import backgroundImage from "../../public/backgrounds/hieroglyphics-background.jpg";

interface ExhibitsClientProps {
  initialData: ExhibitPageData;
  initialSearch: string;
  initialSort: string;
  initialError?: boolean;
}

interface CachedExhibitPage extends ExhibitPageData {
  cachedAt: number;
}

const CACHE_PREFIX = "museum-exhibits-v1:";
const CACHE_TTL_MS = 1000 * 60 * 5;

function buildRequestKey(page: number, search: string, sortBy: string): string {
  return JSON.stringify({
    page,
    search: search.trim(),
    sortBy,
    limit: EXHIBITS_PER_PAGE,
  });
}

export default function ExhibitsClient({
  initialData,
  initialSearch,
  initialSort,
  initialError = false,
}: ExhibitsClientProps) {
  const { t } = useLanguage();
  const [exhibits, setExhibits] = useState<Exhibit[]>(initialData.exhibits);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(
    initialError ? t("exhibits.error") : null,
  );
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [currentPage, setCurrentPage] = useState<number>(
    initialData.pagination.page,
  );
  const [totalPages, setTotalPages] = useState<number>(
    initialData.pagination.totalPages,
  );
  const [totalCount, setTotalCount] = useState<number>(
    initialData.pagination.total,
  );
  const hasSkippedInitialFetch = useRef(false);
  const initialRequestKey = useMemo(
    () => buildRequestKey(initialData.pagination.page, initialSearch, initialSort),
    [initialData.pagination.page, initialSearch, initialSort],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startTransition(() => {
        setDebouncedSearch(searchQuery);
        setCurrentPage(1);
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [sortBy]);

  const updatePageState = useCallback((data: ExhibitPageData) => {
    setExhibits(data.exhibits);
    setTotalPages(data.pagination.totalPages);
    setTotalCount(data.pagination.total);
  }, []);

  const fetchExhibits = useCallback(async () => {
    const requestKey = buildRequestKey(currentPage, debouncedSearch, sortBy);

    if (!hasSkippedInitialFetch.current && requestKey === initialRequestKey) {
      hasSkippedInitialFetch.current = true;

      if (typeof window !== "undefined" && initialData.exhibits.length > 0) {
        sessionStorage.setItem(
          `${CACHE_PREFIX}${requestKey}`,
          JSON.stringify({ ...initialData, cachedAt: Date.now() }),
        );
      }

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const cachedPayload =
        typeof window !== "undefined"
          ? sessionStorage.getItem(`${CACHE_PREFIX}${requestKey}`)
          : null;

      if (cachedPayload) {
        const parsed = JSON.parse(cachedPayload) as CachedExhibitPage;

        if (Date.now() - parsed.cachedAt < CACHE_TTL_MS) {
          updatePageState(parsed);
          setLoading(false);
          return;
        }
      }

      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(EXHIBITS_PER_PAGE),
        sort: sortBy,
      });

      if (debouncedSearch.trim()) {
        params.set("search", debouncedSearch.trim());
      }

      const response = await fetch(`/api/exhibits?${params.toString()}`, {
        cache: "force-cache",
      });
      const result = (await response.json()) as ExhibitPageData & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch exhibits");
      }

      updatePageState(result);

      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          `${CACHE_PREFIX}${requestKey}`,
          JSON.stringify({ ...result, cachedAt: Date.now() }),
        );
      }
    } catch (err) {
      console.error("Error fetching exhibits:", err);
      setError(err instanceof Error ? err.message : t("exhibits.error"));
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    debouncedSearch,
    initialData,
    initialRequestKey,
    sortBy,
    t,
    updatePageState,
  ]);

  useEffect(() => {
    fetchExhibits();
  }, [fetchExhibits]);

  const goToPage = useCallback((page: number) => {
    startTransition(() => {
      const html = document.documentElement;
      html.style.scrollBehavior = "auto";
      html.scrollTop = 0;
      document.body.scrollTop = 0;

      requestAnimationFrame(() => {
        html.style.scrollBehavior = "";
      });

      setCurrentPage(page);
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <SignatureLogo />

      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src={backgroundImage}
          alt="Ancient Hieroglyphics Background"
          fill
          priority
          placeholder="blur"
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <Navbar />

      <div className="flex-1 pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 px-4">
              {t("exhibits.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl mx-auto px-4">
              {t("exhibits.subtitle")}
            </p>
          </header>

          <div className="mb-4 sm:mb-6">
            <div className="max-w-2xl mx-auto relative">
              <input
                id="exhibits-search"
                name="search"
                type="search"
                placeholder={t("exhibits.searchPlaceholder")}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-slate-200 px-4 py-2.5 pl-10 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:px-5 sm:py-3 sm:pl-12 sm:text-base"
                aria-label={t("exhibits.searchPlaceholder")}
                autoComplete="off"
              />
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 sm:left-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {!error && (
            <section className="mb-6 sm:mb-8">
              <div className="flex flex-col items-center justify-between gap-3 px-2 sm:flex-row sm:gap-4">
                <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-start sm:gap-3">
                  <label htmlFor="sort" className="text-sm font-medium text-white">
                    {t("exhibits.sortBy")}
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:px-4"
                  >
                    <option value="newest">{t("exhibits.sortNewest")}</option>
                    <option value="oldest">{t("exhibits.sortOldest")}</option>
                    <option value="az">{t("exhibits.sortAZ")}</option>
                    <option value="za">{t("exhibits.sortZA")}</option>
                  </select>
                </div>

                <p className="text-center text-sm text-slate-100">
                  {t("exhibits.showing", {
                    count: totalCount,
                    exhibitText:
                      totalCount === 1
                        ? t("exhibits.exhibit")
                        : t("exhibits.exhibits"),
                  })}
                  {debouncedSearch && (
                    <span className="hidden font-medium sm:inline">
                      {" "}
                      {t("exhibits.matching", { query: debouncedSearch })}
                    </span>
                  )}
                </p>
              </div>
            </section>
          )}

          {loading ? (
            <CollectionSkeleton
              showHeader={false}
              showSearch={false}
              cardCount={6}
            />
          ) : error ? (
            <section className="rounded-xl border border-red-200/70 bg-red-50 p-6 text-center shadow-lg sm:p-12">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-red-400 sm:h-16 sm:w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="mb-2 text-xl font-bold text-red-700 sm:text-2xl">
                {t("common.error")}
              </h2>
              <p className="mb-4 text-sm text-red-700 sm:text-base">{error}</p>
              <button
                onClick={() => fetchExhibits()}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
              >
                Try again
              </button>
            </section>
          ) : exhibits.length === 0 ? (
            <section className="rounded-xl bg-white p-6 text-center shadow-lg sm:p-12">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-gray-400 sm:h-16 sm:w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                {t("exhibits.noResults")}
              </h2>
              <p className="px-4 text-base text-gray-600">
                {debouncedSearch
                  ? t("exhibits.noResultsDescription")
                  : t("exhibits.noResultsDescription")}
              </p>
            </section>
          ) : (
            <>
              <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
                aria-label={t("exhibits.title")}
              >
                {exhibits.map((exhibit, index) => (
                  <ExhibitCard
                    key={exhibit.id}
                    exhibit={exhibit}
                    index={index}
                    priority={index === 0}
                  />
                ))}
              </section>

              {totalPages > 1 && (
                <nav
                  className="mt-8 flex flex-row items-center justify-center gap-2 sm:mt-12 sm:gap-4"
                  aria-label="Exhibit pagination"
                >
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:text-base"
                  >
                    {t("exhibits.previous")}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;

                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - currentPage) <= 1
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            className={`h-8 w-8 rounded-lg text-sm font-medium transition-[transform,background-color,box-shadow,color] sm:h-10 sm:w-10 sm:text-base ${
                              currentPage === pageNumber
                                ? "bg-blue-600 text-white shadow-md"
                                : "border border-gray-300 bg-white text-gray-700 hover:-translate-y-0.5 hover:bg-gray-100"
                            }`}
                            aria-current={
                              currentPage === pageNumber ? "page" : undefined
                            }
                          >
                            {pageNumber}
                          </button>
                        );
                      }

                      if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span
                            key={`ellipsis-${pageNumber}`}
                            className="text-sm text-slate-200 sm:text-base"
                          >
                            ...
                          </span>
                        );
                      }

                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:text-base"
                  >
                    {t("exhibits.next")}
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
