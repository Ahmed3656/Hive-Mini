import React from 'react';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
  className = '',
}) => {
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      range.push(1);

      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      if (start > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          rangeWithDots.push(i);
        }
      }

      if (end < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return [...new Set(rangeWithDots)].sort((a, b) => {
        if (typeof a === 'string' || typeof b === 'string') return 0;
        return a - b;
      });
    };

    return {
      totalPages,
      startItem,
      endItem,
      visiblePages: getVisiblePages(),
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }, [currentPage, totalItems, itemsPerPage]);

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= paginationData.totalPages &&
      page !== currentPage
    ) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (paginationData.hasPrevious) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (paginationData.hasNext) {
      handlePageChange(currentPage + 1);
    }
  };

  if (paginationData.totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`bg-gray-50 px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Info */}
      {showInfo && (
        <div className="text-sm text-gray-700 order-2 sm:order-1">
          Showing {paginationData.startItem} to {paginationData.endItem} of{' '}
          {totalItems} entries
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1 order-1 sm:order-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={!paginationData.hasPrevious}
          className="px-2 py-1 flex items-center space-x-1"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex space-x-1">
          {paginationData.visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className="px-3 py-1 text-gray-500">
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={page === currentPage ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={!paginationData.hasNext}
          className="px-2 py-1 flex items-center space-x-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [data.length, totalPages, currentPage]);

  return {
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
    totalItems: data.length,
  };
};
