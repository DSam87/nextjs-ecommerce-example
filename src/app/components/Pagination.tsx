import Link from "next/link";
import { number } from "zod";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        key={page}
        href={"?page=" + page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>,
    );
  }
  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <>
            <Link
              href={`?page=${currentPage - 1}`}
              className={"btn join-item "}
            >
              {"<"}
            </Link>
            <button className="join-time btn pointer-events-none mx-3">
              Page {currentPage}
            </button>
            <Link
              href={`?page=${currentPage + 1}`}
              className={"btn join-item "}
            >
              {">"}
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Pagination;
