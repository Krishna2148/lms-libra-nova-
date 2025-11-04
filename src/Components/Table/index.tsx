import type React from "react"
import { useState } from "react"
import { ChevronDown, FileX } from "lucide-react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface TableProps {
    tableHead?: (string | React.ReactNode)[]
    tableData?: any[][]
    isSN?: boolean
    startIndex?: number
    pagination?: { page: number; total: number; limit?: number }
    handlePagination?: (paginationData: { page?: number; limit?: number }) => void
    totalPageData?: number
    isLoading?: boolean
    handlePageChange?: (page: number) => void
    setRowPerPage?: (val: number) => void
    rowPerPage?: number
}

const Table: React.FC<TableProps> = ({
    tableHead = [],
    tableData = [],
    isSN,
    startIndex = 0,
    pagination,
    isLoading,
    setRowPerPage,
    handlePageChange,
    rowPerPage = 10,
}) => {
    const [localPage, setLocalPage] = useState(pagination?.page || 1)

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowPerPage?.(Number.parseInt(e.target.value))
    }

    const goToPage = (page: number) => {
        if (page < 1 || page > (pagination?.total || 1)) return
        setLocalPage(page)
        handlePageChange?.(page)
    }

    const getVisiblePages = () => {
        if (!pagination) return []
        const total = pagination?.total

        const current = localPage

        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
        if (current <= 4) return [1, 2, 3, 4, 5, "...", total]
        if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total]

        return [1, "...", current - 1, current, current + 1, "...", total]
    }

    return (
        <div className="space-y-4 w-full">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* ✅ Ensures horizontal scroll works on any screen */}
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    <div className="max-w-[200px] md:min-w-full">
                        <table className="w-full border-collapse">
                            {/* Table Head */}
                            <thead className="bg-slate-100 border-b border-slate-200 sticky top-0 z-10">
                                <tr>
                                    {isSN && (
                                        <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                                            S.N
                                        </th>
                                    )}
                                    {tableHead.map((each, index) => (
                                        <th
                                            key={`head-${index}`}
                                            className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider whitespace-nowrap"
                                        >
                                            {each}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            {isLoading ? (
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {Array.from({ length: rowPerPage }).map((_, rowIndex) => (
                                        <tr key={`loading-row-${rowIndex}`} className="hover:bg-slate-50">
                                            {isSN && (
                                                <td className="px-3 sm:px-6 py-4">
                                                    <div className="animate-pulse bg-slate-200 h-4 w-8 rounded"></div>
                                                </td>
                                            )}
                                            {tableHead.map((_, columnIndex) => (
                                                <td key={`loading-col-${rowIndex}-${columnIndex}`} className="px-3 sm:px-6 py-4">
                                                    <div className="animate-pulse bg-slate-200 h-4 w-24 rounded"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <>
                                    {tableData.length > 0 ? (
                                        <tbody className="bg-white divide-y divide-slate-200">
                                            {tableData.map((each, index) => (
                                                <tr
                                                    className="hover:bg-slate-50 transition-colors duration-150"
                                                    key={`row-${index}`}
                                                >
                                                    {isSN && (
                                                        <td className="px-3 sm:px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                                                            {startIndex + index + 1}
                                                        </td>
                                                    )}
                                                    {each?.map((item, itemIndex) => (
                                                        <td
                                                            className="px-3 sm:px-6 py-4 text-sm text-slate-900 whitespace-nowrap"
                                                            key={`table-data-${index}-${itemIndex}`}
                                                        >
                                                            {item}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td
                                                    colSpan={tableHead.length + (isSN ? 1 : 0)}
                                                    className="px-4 sm:px-6 py-20 text-center"
                                                >
                                                    <div className="flex flex-col items-center justify-center space-y-4">
                                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                                            <FileX className="w-8 h-8 text-slate-400" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <h3 className="text-lg font-medium text-slate-900">No data found</h3>
                                                            <p className="text-sm text-slate-500 max-w-md">
                                                                There are no records to display at the moment.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </>
                            )}
                        </table>
                    </div>
                </div>
            </div>
            {/* Pagination Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 w-full">
                <div className="flex items-center gap-3 relative">
                    <div className="relative">
                        <select
                            className="appearance-none border border-slate-300 rounded-lg px-3 sm:px-5 py-2 text-sm bg-white pr-8 sm:pr-10 outline-none focus:outline-none focus:ring-0 focus:border-blue-300"
                            onChange={handleRowsPerPageChange}
                            value={rowPerPage}
                        >
                            {[2, 5, 10, 20, 30, 50].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none w-4 h-4" />
                    </div>
                    <span className="text-sm text-slate-600">Entries</span>
                </div>
                {pagination && pagination?.total > 1 && (
                    <div className="flex items-center gap-1 overflow-x-auto">
                        <button
                            className="p-2 rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                            disabled={localPage === 1}
                            onClick={() => goToPage(1)}
                            title="First page"
                        >
                            <ChevronsLeft className="w-4 h-3" />
                        </button>
                        <button
                            className="p-2 rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                            disabled={localPage === 1}
                            onClick={() => goToPage(localPage - 1)}
                            title="Previous page"
                        >
                            <ChevronLeft className="w-4 h-3" />
                        </button>

                        <div className="flex items-center gap-1 mx-2">
                            {getVisiblePages().map((page, index) =>
                                page === "..." ? (
                                    <span key={`ellipsis-${index}`} className="px-2 sm:px-3 py-2 text-slate-400">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page as number)}
                                        className={`px-2 sm:px-3 py-1 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${localPage === page
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-slate-700 hover:bg-slate-100 border border-slate-300 bg-white"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}
                        </div>

                        <button
                            className="p-2 rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                            disabled={localPage === pagination.total}
                            onClick={() => goToPage(localPage + 1)}
                            title="Next page"
                        >
                            <ChevronRight className="w-4 h-3" />
                        </button>
                        <button
                            className="p-2 rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                            disabled={localPage === pagination.total}
                            onClick={() => goToPage(pagination.total)}
                            title="Last page"
                        >
                            <ChevronsRight className="w-4 h-3" />
                        </button>
                    </div>
                )}
            </div>

            {pagination && tableData.length > 0 && (
                <div className="text-center">
                    <p className="text-sm text-slate-600 px-2">
                        Showing {(localPage - 1) * rowPerPage + 1} to{" "}
                        {Math.min(localPage * rowPerPage, (pagination.total - 1) * rowPerPage + tableData.length)} of{" "}
                        <span className="font-medium">{pagination.total * rowPerPage}</span> results
                    </p>
                </div>
            )}
        </div>
    )
}

export default Table
