import DeleteAction from "@/components/ActionButton/Delete"
import UpdateAction from "@/components/ActionButton/Update"
import Button from "@/components/Button"
import BackButton from "@/components/Button/Back"
import FormContainer from "@/components/Form-Container"
import PageHeaders from "@/components/PageHeader"
import SearchInput from "@/components/Search"
import Table from "@/components/Table"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/book-mgmt/bookApiSlice"
import { useState } from "react"
import AddEditBook from "./AddEditBook"
import DeleteModal from "@/components/Modal/DeleteModal"
import Toast from "@/components/Toastify"
import ViewDetails from "./ViewDetails"
import ViewAction from "@/components/ActionButton/View"

const BookManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const debouncedSearch = useDebouncedValue(searchData, 500);

  const [openBookModal, setOpenBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [viewId, setViewId] = useState(null);

  const { data: bookData, isLoading: bookLoading } = useGetAllBooksQuery({
    page: currentPage,
    size: rowPerPage,
    search: debouncedSearch
  })
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteBook(deleteId).unwrap();
      if (response?.success) {
        Toast(response.message, "success");
        setOpenDeleteModal(false);
      } else {
        Toast(response.message || "Something went wrong", "error");
      }
    } catch (e: any) {
      Toast(e?.data?.message || e.message || "Something went wrong", "error");
    }
  }

  const tableData = bookData?.data?.content?.map((item: any, index: number) => [
    (currentPage - 1) * rowPerPage + index + 1,
    item.title || "-",
    item.author || "-",
    item.genre || "-",
    item.publisher || "-",
    item.isbn || "-",
    item.isAvailable ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        Available
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        Not Available
      </span>
    ),
    <div className="flex gap-2">
      <div onClick={() => {
        setSelectedBook(item?.id);
        setOpenBookModal(true);
      }}>
        <UpdateAction />
      </div>
      <div onClick={() => {
        setViewId(item?.id);
        setViewModal(true);
      }}>
        <ViewAction />
      </div>
      <div onClick={() => {
        setDeleteId(item?.id);
        setOpenDeleteModal(true);
      }}>
        <DeleteAction />
      </div>
    </div>
  ]);

  return (
    <>
      <PageHeaders title="Book Management" description="Perform book management operations including adding, updating, and deleting." />
      <FormContainer className="flex flex-col gap-[1rem] ">
        <div className="m-h-screen flex justify-between">
          <SearchInput placeholder="Search..." onChange={handleSearchChange} value={searchData} />
          <div className="flex gap-2">
            <BackButton>Back</BackButton>
            <Button variant="default" handleClick={() => setOpenBookModal(true)}>Add Book</Button>
          </div>
        </div>
        {/* <div className="md:max-w-2xl  mx-auto overflow-x-auto w-full"> */}

          <Table tableHead={tableHead} tableData={tableData}
            pagination={{
              page: currentPage,
              total: bookData?.data?.totalPages,
              limit: rowPerPage
            }}
            isLoading={bookLoading}
            handlePageChange={handlePageChange}
            setRowPerPage={setRowPerPage}
            rowPerPage={rowPerPage}
          />
        {/* </div> */}
      </FormContainer>
      <AddEditBook
        open={openBookModal}
        setOpen={setOpenBookModal}
        selectedBook={selectedBook}
      />
      <DeleteModal
        open={openDeleteModal}
        close={() => setOpenDeleteModal(false)}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
      <ViewDetails
        open={viewModal}
        setOpen={setViewModal}
        viewId={viewId}
      />
    </>
  )
}

export default BookManagement
const tableHead = [
  "S.No.",
  "Title",
  "Author",
  "Genre",
  "Publisher",
  "ISBN",
  "Status",
  "Actions",
]