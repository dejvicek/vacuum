import { generatePaginationLinks } from './data-table-pagination-links';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from './ui/pagination';
import { FC } from 'react';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
}

export const DataTablePagination: FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} aria-disabled={currentPage - 1 < 1} />
          </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, onPageChange)}
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              aria-disabled={currentPage > totalPages - 1}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
