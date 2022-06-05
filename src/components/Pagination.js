const Pagination = ({ hotelsPerPage, totalHotels, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalHotels / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className=" mt-3 mb-8 flex rounded-lg font-[Poppins]">
      {pageNumbers.map((number) => (
        <button
          onClick={() => paginate(number)}
          key={number}
          className={`h-8 w-8 text-gray-400 ${
            currentPage === number && "text-gray-800"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;