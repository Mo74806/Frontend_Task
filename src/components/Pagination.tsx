import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onChange,
  maxVisiblePages = 6,
}: PaginationComponentProps) {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      if (currentPage <= 3) {
        // Current page is near the beginning
        for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push("ellipsis");
        }
        if (totalPages > 4) {
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Current page is near the end
        if (totalPages > 4) {
          pages.push("ellipsis");
        }
        for (let i = Math.max(2, totalPages - 3); i < totalPages; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else {
        // Current page is in the middle
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page as number);
                }}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
