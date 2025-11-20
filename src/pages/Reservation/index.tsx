import DeleteAction from '@/components/ActionButton/Delete'
import ViewAction from '@/components/ActionButton/View'
import Button from '@/components/Button'
import BackButton from '@/components/Button/Back'
import FormContainer from '@/components/Form-Container'
import PageHeaders from '@/components/PageHeader'
import SearchInput from '@/components/Search'
import Table from '@/components/Table'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useDeleteReservationMutation, useGetAllReservationQuery } from '@/redux/reservation/reservationApiSlice'
import { useState } from 'react'
import AddEditReservation from './AddEditReservation'
import DeleteModal from '@/components/Modal/DeleteModal'
import Toast from '@/components/Toastify'
import ViewReservation from './ViewReservation'

const Reservation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const debouncedSearch = useDebouncedValue(searchData, 500);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const [deleteReservation, { isLoading }] = useDeleteReservationMutation();

  const { data: reservationData, isLoading: reservationLoading } = useGetAllReservationQuery({
    page: currentPage, size: rowPerPage, search: debouncedSearch
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handleDelete = async () => {
    try {
      const response = await deleteReservation(selectedId).unwrap();
      if (response?.success) {
        Toast(response.message, "success");
        setDeleteModal(false);
      } else {
        Toast(response.message, "error");
      }
    } catch (error: any) {
      Toast(error?.data?.message || error.message || "Something went wrong", "error");
    }
  }

  const tableData = reservationData?.data?.content?.map((item: any, index: number) => {
    const getStatusStyle = (status: string) => {
      switch (status) {
        case "PENDING":
          return "bg-yellow-100 text-yellow-700";
        case "NOTIFIED":
          return "bg-blue-100 text-blue-700";
        case "COMPLETED":
          return "bg-green-100 text-green-700";
        case "CANCELLED":
          return "bg-red-100 text-red-700";
        case "EXPIRED":
          return "bg-gray-200 text-gray-700";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    return [
      (currentPage - 1) * rowPerPage + index + 1,
      item?.bookTitle || "N/A",
      item?.memberName || "N/A",
      item?.reservationDate || "N/A",
      item?.notificationDate || "N/A",
      item?.expiryDate || "N/A",
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
          item?.status
        )}`}
      >
        {item?.status || "N/A"}
      </span>,
      <div className="flex gap-2">
        <div
          onClick={() => {
            setViewModal(true);
            setSelectedId(item?.id);
          }}
        >
          <ViewAction />
        </div>
        <div
          onClick={() => {
            setDeleteModal(true);
            setSelectedId(item?.id);
          }}
        >
          <DeleteAction />
        </div>
      </div>,
    ];
  });


  return (
    <>
      <PageHeaders title="Reservation" description="Easily reserve books and keep track of pending reservations." />
      <FormContainer className='flex flex-col gap-[1rem]'>
        <div className='flex justify-between'>
          <SearchInput placeholder="Search..." value={searchData} onChange={handleSearchChange} />
          <div className='flex gap-2'>
            <BackButton>Back</BackButton>
            <Button variant="default"
              handleClick={() => setOpenAddModal(true)}
            >Reserve Book</Button>
          </div>
        </div>
        <Table tableHead={tableHead} tableData={tableData}
          pagination={{
            page: currentPage,
            total: reservationData?.data?.page?.totalPages || 1,
            limit: rowPerPage
          }}
          setRowPerPage={setRowPerPage}
          rowPerPage={rowPerPage}
          handlePageChange={handlePageChange}
          isLoading={reservationLoading}
        />
      </FormContainer>

      <AddEditReservation
        open={openAddModal}
        setOpen={setOpenAddModal}
      />
      <DeleteModal
        open={deleteModal}
        close={() => setDeleteModal(false)}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
      <ViewReservation
        open={viewModal}
        setOpen={setViewModal}
        viewId={selectedId}
      />
    </>
  )
}

export default Reservation
const tableHead = [
  "S.No.",
  "Title",
  "Member Name",
  "Reservation Date",
  "Notification Date",
  "Expire Date",
  "Status",
  "Actions",
]