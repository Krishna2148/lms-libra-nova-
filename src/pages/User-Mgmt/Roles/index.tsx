import DeleteAction from "@/components/ActionButton/Delete"
import Button from "@/components/Button"
import BackButton from "@/components/Button/Back"
import FormContainer from "@/components/Form-Container"
import DeleteModal from "@/components/Modal/DeleteModal"
import PageHeaders from "@/components/PageHeader"
import SearchInput from "@/components/Search"
import Table from "@/components/Table"
import Toast from "@/components/Toastify"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useDeleteRoleMutation, useGetAllRolesQuery } from "@/redux/user-mgmt/role/roleApiSlice"
import moment from "moment"
import { useState } from "react"

const RoleManagement = () => {
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const debouncedSearch = useDebouncedValue(searchData, 500);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data: roleData, isLoading: roleLoading } = useGetAllRolesQuery({
    page: currentPage,
    size: rowPerPage,
    search: debouncedSearch
  })
  const [deleteRole, { isLoading: deleteLoading }] = useDeleteRoleMutation();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handleDelete = async () => {
    try {
      const response = await deleteRole(deleteId).unwrap();
      if (response.success) {
        Toast(response.message, "success");
        setOpenDeleteModal(false);
      } else {
        Toast(response.message || "Something went wrong", "error");
      }
    } catch (e: any) {
      Toast(e?.data?.message || e.message || "Something went wrong", "error");
    }
  }
  const tableData = roleData?.data?.content?.map((item: any, index: number) => [
    (currentPage - 1) * rowPerPage + index + 1,
    item?.name || "-",
    moment(item?.createdAt).format("DD-MM-YYYY"),
    <div className="flex gap-4">
      <div onClick={() => {
        setOpenDeleteModal(true)
        setDeleteId(item?.id)
      }}>
        <DeleteAction />
      </div>
    </div>
  ])
  return (
    <>
      <PageHeaders title="Role Management" description="Manage roles for the library system." />
      <FormContainer className="flex flex-col gap-[1rem]">
        <div className="flex justify-between">
          <SearchInput value={searchData} onChange={handleSearchChange} placeholder="Search..." />
          <div className="flex gap-2">
            <BackButton>Back</BackButton>
            <Button variant="default">Add Role</Button>
          </div>
        </div>
        <Table tableHead={tableHead} tableData={tableData} isLoading={roleLoading}
          pagination={{
            page: currentPage,
            total: roleData?.data?.page?.totalPages || 1,
            limit: rowPerPage
          }}
          handlePageChange={handlePageChange}
          setRowPerPage={setRowPerPage}
          rowPerPage={rowPerPage}
        />
      </FormContainer>
      <DeleteModal
        open={openDeleteModal}
        close={() => setOpenDeleteModal(false)}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
    </>
  )
}

export default RoleManagement
const tableHead = [
  "S.No.",
  "Role Name",
  "Created At",
  "Actions",
]