import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import RenderText from "../utils/RenderText";

interface PaginationProps {
    totalPages: number;
    className?: string;
    currentPage: number;
    maxVisible?: number;
    jump?: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    className = "",
    maxVisible = 5,
    jump = 10,
    setCurrentPage,
}) => {

    // hooks
    if (totalPages <= 1) return null

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    const renderPages = () => {
        const pages: number[] = []

        let start = Math.max(1, currentPage - 2)
        let end = Math.min(totalPages, currentPage + 2)

        // Ensure always 5 pages when possible
        if (end - start + 1 < maxVisible) {
            if (start === 1) {
                end = Math.min(totalPages, start + maxVisible - 1)
            } else if (end === totalPages) {
                start = Math.max(1, end - maxVisible + 1)
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        return { pages, start, end }
    }

    const { pages, start, end } = renderPages()

    return (
        <div className={cn("flex items-center rounded-sm justify-center md:justify-end border border-slate-300 dark:border-slate-700 bg-bg-body w-full", className)}>
            {totalPages > 20 && start > (jump + 1) && (
                <button
                    onClick={() => goToPage(Math.max(1, currentPage - jump))}
                    className="flex items-center px-3 xl:px-4 py-1 border-r md:border-r-0 md:border-l  border-border hover:text-btn-bg-secondary"
                >
                    <ChevronsLeft />
                </button>
            )}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn("px-3 xl:px-4 py-1 border-r md:border-x border-slate-300 dark:border-slate-700 disabled:opacity-50 ",
                    currentPage > 1 ? "hover:text-btn-bg-secondary" : "cursor-not-allowed"
                )}
            >
                <ChevronLeft className="sm:hidden" />
                <span className="hidden sm:block">
                    <RenderText group="shared" variable="prev" />
                </span>
            </button>

            {/* ====== Page Numbers start ==== */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 xl:px-4 py-1 border-r border-slate-300 dark:border-slate-700 ${page === currentPage
                        ? "bg-primary text-white"
                        : "hover:text-btn-bg-secondary"
                        }`}
                >
                    {page}
                </button>
            ))}
            {/* ====== Page Numbers ends ==== */}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn("px-3 xl:px-4 py-1 disabled:opacity-50 ", currentPage < totalPages ? "hover:text-btn-bg-secondary" : "cursor-not-allowed")}
            >
                <ChevronRight className="sm:hidden" />
                <span className="hidden sm:block"><RenderText group="shared" variable="next" /></span>
            </button>

            {totalPages > 20 && end < totalPages && (
                <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + jump))}
                    className="flex items-center px-2 md:px-3  border-l border-border xl:px-4 py-1 hover:text-btn-bg-secondary"
                >
                    <ChevronsRight />
                </button>
            )}
        </div>
    )
}

export default Pagination
