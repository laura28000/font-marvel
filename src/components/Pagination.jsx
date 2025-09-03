import "./Pagination.css"; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="page-btn"
        disabled={!canPrev}
        onClick={() => onPageChange(1)}
      >
        «
      </button>
      <button
        className="page-btn"
        disabled={!canPrev}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Précédent
      </button>

      <span className="page-info">
        Page {currentPage} / {totalPages || 1}
      </span>

      <button
        className="page-btn"
        disabled={!canNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant
      </button>
      <button
        className="page-btn"
        disabled={!canNext}
        onClick={() => onPageChange(totalPages)}
      >
        »
      </button>
    </nav>
  );
};

export default Pagination;

