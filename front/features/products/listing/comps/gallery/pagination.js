import { useState, useEffect } from "react";

export default function Pagination({ data, children }) {
  // Set state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate total number of pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Implement a function to handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Render your items here, slicing the data array based on the current page and items per page

  return (
    <div>
      {/* Render your items here */}
      {/* Render your pagination component here, passing handlePageChange, currentPage, and pageCount as props */}
    </div>
  );
}
