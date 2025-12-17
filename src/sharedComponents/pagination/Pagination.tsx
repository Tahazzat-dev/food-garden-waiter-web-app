import { useResponsivePageWindow } from '@/hooks/useResponsivePageRange';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  containerStyle?: string;
  buttonStyle?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
  buttonStyle = '',
  containerStyle = '',
}: Props) {
  console.log(totalPages, ' total pages');
  const maxVisiblePages = useResponsivePageWindow();

  if (totalPages <= 1) return null;
  const getMiddlePageRange = () => {
    const range: (number | string)[] = [];
    const window = maxVisiblePages;
    const half = Math.floor(window / 2);

    if (totalPages <= window) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust if at the start
    if (start === 1) {
      end = window;
    }
    // Adjust if at the end
    if (end === totalPages) {
      start = totalPages - window + 1;
    }

    if (start > 1) {
      range.push(1);
      if (start > 2) range.push('...');
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) range.push('...');
      range.push(totalPages);
    }

    return range;
  };

  const pageRange = getMiddlePageRange();

  return (
    <div className={` ${containerStyle}`}>
      <div className='mt-5 flex flex-wrap justify-center gap-1 text-xs md:gap-2 md:text-sm lg:text-base'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`mr-1 rounded bg-slate-200 p-1 disabled:opacity-50 md:mr-2 ${buttonStyle} duration-200 hover:bg-[var(--clr-darkGold)] hover:text-white disabled:hover:bg-slate-200 disabled:hover:text-slate-600`}
        >
          <ChevronLeft className='h-5 w-5' />
        </button>

        {pageRange.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className='px-2 py-1'>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(Number(page))}
              className={`rounded px-3 py-1 ${
                currentPage === page
                  ? 'bg-[var(--clr-darkGold)] text-white'
                  : 'bg-slate-200 duration-200 hover:bg-[var(--clr-darkGold)] hover:text-white'
              } ${buttonStyle}`}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`ml-1 rounded bg-slate-200 p-1 disabled:opacity-50 md:ml-2 ${buttonStyle} duration-200 hover:bg-[var(--clr-darkGold)] hover:text-white disabled:hover:bg-slate-200 disabled:hover:text-slate-600`}
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
