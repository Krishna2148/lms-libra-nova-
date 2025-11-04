import Button from '@/components/Button'
import BackButton from '@/components/Button/Back'
import FormContainer from '@/components/Form-Container'
import PageHeaders from '@/components/PageHeader'
import SearchInput from '@/components/Search'
import Table from '@/components/Table'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useGetAllBorrowBooksQuery, useReturnBorrowBookMutation } from '@/redux/borrow-book/borrowApiSlice'
import { useState } from 'react'
import AddEditBorrow from './AddEdit'
import UpdateAction from '@/components/ActionButton/Update'
import ReturnAction from '@/components/ActionButton/Return'
import Toast from '@/components/Toastify'
import ApproveModal from '@/components/Modal/Approve'

const BorrowBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const debouncedSearch = useDebouncedValue(searchData, 500);

  const [openBookModal, setOpenBookModal] = useState(false);
  const [borrowId, setBorrowId] = useState(null);

  const [openRetunModal, setOpenReturnModal] = useState(false)

  const { data: borrowBooks, isLoading: borrowBookLoading } = useGetAllBorrowBooksQuery({
    page: currentPage,
    size: rowPerPage,
    search: debouncedSearch
  })

  const [returnBook, { isLoading: returnLoading }] = useReturnBorrowBookMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handleReturn = async () => {
    try {
      const response = await returnBook(borrowId).unwrap();
      if (response.success) {
        Toast(response.message, "success");
        setOpenReturnModal(false);
      } else {
        Toast(response.message, "error");
      }
    } catch (e: any) {
      Toast(e?.data?.message || e.message || "Something went wrong", "error");
    }
  }

  const handleOpenNewBorrowModal = () => {
    setBorrowId(null);
    setOpenBookModal(true);
  }

  const handleOpenUpdateModal = (id: any) => {
    setBorrowId(id);
    setOpenBookModal(true);
  }

  const tableData = borrowBooks?.data?.content.map((item: any, index: number) => [
    (currentPage - 1) * rowPerPage + index + 1,
    item?.title || "-",
    item?.isbn || "-",
    item?.fullName || "-",
    item?.borrowDate || "-",
    item?.returnDate || "-",
    item?.dueDate || "-",
    item?.isReturned === true ?
      <span className='bg-green-500 text-white px-2 py-1 rounded-full '>
        Returned
      </span> :
      <span className='bg-red-500 text-white px-2 py-1 rounded-full '>
        Not Returned
      </span>,
    item?.fineAmount || "-",
    <div className='flex gap-2'>
      <div onClick={() => handleOpenUpdateModal(item.id)}>
        <UpdateAction disabled={item?.isReturned === true} tooltipText={item.isReturned === true ? "Book already returned" : ""} />
      </div>
      <div onClick={() => {
        setBorrowId(item.id)
        setOpenReturnModal(true)
      }} >
        <ReturnAction disabled={item?.isReturned === true} tooltipText={item.isReturned === true ? "Returned" : ""} />
      </div>
    </div>
  ]);

  return (
    <>
      <PageHeaders title="Borrow Books" description="Perform book management operations including adding, updating, and deleting." />
      <FormContainer className="flex flex-col gap-[1rem]">
        <div className="flex justify-between">
          <SearchInput placeholder="Search..." value={searchData} onChange={handleSearchChange} />
          <div className="flex gap-2">
            <BackButton>Back</BackButton>
            <Button variant="default"
              handleClick={handleOpenNewBorrowModal}
            >Borrow Book</Button>
          </div>
        </div>
        <Table tableHead={tableHead} tableData={tableData}
          pagination={{
            page: currentPage,
            total: borrowBooks?.data?.page?.totalPages || 1,
            limit: rowPerPage
          }}
          setRowPerPage={setRowPerPage}
          rowPerPage={rowPerPage}
          handlePageChange={handlePageChange}
          isLoading={borrowBookLoading}
        />
      </FormContainer>

      <AddEditBorrow
        key={borrowId || 'new'}
        open={openBookModal}
        setOpen={setOpenBookModal}
        borrowId={borrowId}
      />

      <ApproveModal
        open={openRetunModal}
        close={() => setOpenReturnModal(false)}
        handleApprove={handleReturn}
        title="Confirmation for Return Book"
        message="Are you sure you want to return this book?"
        isLoading={returnLoading}
      />
    </>
  )
}

export default BorrowBooks

const tableHead = [
  "S.No.",
  "Title",
  "ISBN",
  "Borrower Name",
  "Borrow Date",
  "Return Date",
  "Due Date",
  "Status",
  "Fine Amount",
  "Actions",
]