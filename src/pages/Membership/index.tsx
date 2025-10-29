import Button from "@/components/Button"
import BackButton from "@/components/Button/Back"
import FormContainer from "@/components/Form-Container"
import PageHeaders from "@/components/PageHeader"
import SearchInput from "@/components/Search"
import Table from "@/components/Table"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useDeleteMembershipMutation, useGetAllMembershipQuery } from "@/redux/membership/membershipApiSlice"
import { useState } from "react"
import AddMembership from "./AddMembership"
import ViewAction from "@/components/ActionButton/View"
import DeleteAction from "@/components/ActionButton/Delete"
import DeleteModal from "@/components/Modal/DeleteModal"
import Toast from "@/components/Toastify"

const Membership = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const debouncedSearch = useDebouncedValue(searchData, 500);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: membershipData, isLoading: membershipLoading } = useGetAllMembershipQuery({
    page: currentPage, size: rowPerPage, search: debouncedSearch
  })
  const [deleteMembership, { isLoading: deleteLoading }] = useDeleteMembershipMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }
  const handleDelete = async () => {
    try {
      const response = await deleteMembership(selectedId).unwrap();
      if (response.success) {
        Toast(response.message, "success");
        setDeleteModal(false);
      } else {
        Toast(response.message, "error");
      }
    } catch (error: any) {
      Toast(error?.data?.message || error.message || "Something went wrong", "error");
    }
  }

  const tableData = membershipData?.data?.map((item: any, index: number) =>
    [
      (currentPage - 1) * rowPerPage + index + 1,
      item.membershipType,
      item.dateOfJoining,
      item.expiryDate,
      item.borrowLimit,
      <div className="flex gap-2">
        <div
          onClick={() => {

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
    ])
  return (
    <>
      <PageHeaders title="Membership" description="Manage membership details and membership plans." />
      <FormContainer className="flex flex-col gap-[1rem]">
        <div className="flex justify-between">
          <SearchInput placeholder="Search..." value={searchData} onChange={handleSearchChange} />
          <div className="flex gap-2">
            <BackButton>Back</BackButton>
            <Button variant="default"
              handleClick={() => {
                setOpenAddModal(true)
              }}
            >Add Membership</Button>
          </div>
        </div>
        < Table tableHead={tableHead} tableData={tableData}
          pagination={{
            page: currentPage,
            total: membershipData?.page?.totalPage || 1,
            limit: rowPerPage,
          }}
          setRowPerPage={setRowPerPage}
          rowPerPage={rowPerPage}
          handlePageChange={handlePageChange}
          isLoading={membershipLoading}
        />
      </FormContainer>
      <AddMembership
        open={openAddModal}
        setOpen={setOpenAddModal}
      />
      <DeleteModal
        open={deleteModal}
        close={() => setDeleteModal(false)}
        isLoading={deleteLoading}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default Membership
const tableHead = [
  "S.No.",
  "Membership Type",
  "Date of Joining",
  "Expiry Date",
  "Borrow Limit",
  "Actions",
]