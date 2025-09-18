import Button from '@/components/Button'
import BackButton from '@/components/Button/Back'
import FormContainer from '@/components/Form-Container'
import PageHeaders from '@/components/PageHeader'
import SearchInput from '@/components/Search'
import Table from '@/components/Table'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useGetAllBorrowBooksQuery } from '@/redux/borrow-book/borrowApiSlice'
import { useState } from 'react'

const BorrowBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const debouncedSearch = useDebouncedValue(searchData, 500);

  const { data: borrowBooks, isLoading: borrowBookLoading } = useGetAllBorrowBooksQuery({
    page: currentPage,
    size: rowPerPage,
    search: debouncedSearch
  })
  console.log(borrowBooks);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const tableData = borrowBooks?.data?.content.map((item: any, index: number) => [
    (currentPage - 1) * rowPerPage + index + 1,
    item?.title || "-",
    item?.borrowerName || "-",
    item?.borrowDate || "-",
    item?.returnDate || "-",
    item?.dueDate || "-",
    item?.status || "-",
    item?.fineAmount || "-"
  ]);

  return (
    <>
      <PageHeaders title="Borrow Books" description="Perform book management operations including adding, updating, and deleting." />
      <FormContainer className="flex flex-col gap-[1rem]">
        <div className="flex justify-between">
          <SearchInput placeholder="Search..." value={searchData} onChange={handleSearchChange} />
          <div className="flex gap-2">
            <BackButton>Back</BackButton>
            <Button variant="default">Borrow Book</Button>
          </div>
        </div>
        <Table tableHead={tableHead} tableData={tableData}
          pagination={{
            page: currentPage,
            total: borrowBooks?.page?.totalPages || 1,
            limit: rowPerPage
          }}
          setRowPerPage={setRowPerPage}
          rowPerPage={rowPerPage}
          handlePageChange={handlePageChange}
          isLoading={borrowBookLoading}
        />
      </FormContainer>
    </>
  )
}

export default BorrowBooks
const tableHead = [
  "S.No.",
  "Title",
  "Borrower Name",
  "Borrow Date",
  "Return Date",
  "Due Date",
  "Status",
  "Fine Amount"
]