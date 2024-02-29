const calculatePageNumbers = (currentPage: number, totalPages: number) => {
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1
  const endPage = Math.min(startPage + 4, totalPages)

  return {
    pageNumbers: Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    ),
    endPage,
  }
}

export default calculatePageNumbers
