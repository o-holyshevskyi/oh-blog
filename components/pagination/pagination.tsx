import { useState } from "react";
import styles from './pagination.module.css';

export default function Pagination({ totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        onPageChange(newPage);
    }

    return (
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={`${styles.paginationButtons} ${currentPage === index + 1 ? styles.active : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>
    );
}
