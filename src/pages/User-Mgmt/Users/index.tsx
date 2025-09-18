import DeleteAction from '@/components/ActionButton/Delete'
import UpdateAction from '@/components/ActionButton/Update'
import Button from '@/components/Button'
import BackButton from '@/components/Button/Back'
import FormContainer from '@/components/Form-Container'
import PageHeaders from '@/components/PageHeader'
import SearchInput from '@/components/Search'
import Table from '@/components/Table'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/redux/user-mgmt/user/userApiSlice'
import { useState } from 'react'
import AddEditUser from './AddEditUser'
import DeleteModal from '@/components/Modal/DeleteModal'
import Toast from '@/components/Toastify'

const UserManagement = () => {
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const debouncedSearch = useDebouncedValue(searchData, 500);
  const [openUserModal, setOpenUserModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery({
    page: currentPage,
    size: rowPerPage,
    search: debouncedSearch
  });
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(deleteId).unwrap();
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

  const tableData = userData?.data?.content?.map((item: any, index: number) => [
    (currentPage - 1) * rowPerPage + index + 1,
    `${item.firstName} ${item.middleName ? item.middleName + " " : ""}${item.lastName}`,
    item.username,
    item.password || "-",
    item.phoneNumber,
    item.email,
    item.roles?.length ? item.roles.map((role: any) => role.name).join(", ") : "-",
    <div className="flex justify-around">
      <div>
        <UpdateAction />
      </div>
      <div onClick={() => {
        setOpenDeleteModal(true);
        setDeleteId(item?.id);
      }}>
        <DeleteAction />
      </div>
    </div>
  ]);

  return (
    <>
      <PageHeaders title="User Management" description="Manage and create users for the library system." />
      <FormContainer className="flex flex-col gap-[1rem]">
        <div className="flex justify-between">
          <SearchInput value={searchData} onChange={handleSearchChange} placeholder="Search..." />
          <div className="flex gap-2">
            <BackButton>Back</BackButton>
            <Button variant="default" handleClick={() => setOpenUserModal(true)}>Add User</Button>
          </div>
        </div>
        <Table tableHead={tableHead}
          isLoading={userLoading}
          tableData={tableData}
          pagination={{
            page: currentPage,
            total: userData?.data?.totalPages || 1,
            limit: rowPerPage
          }}
          handlePageChange={handlePageChange}
          setRowPerPage={setRowPerPage}
          rowPerPage={rowPerPage}
        />
      </FormContainer>
      <AddEditUser
        open={openUserModal}
        setOpen={setOpenUserModal}
      />
      <DeleteModal
        open={openDeleteModal}
        close={() => setOpenDeleteModal(false)}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
    </>
  )
}

export default UserManagement
const tableHead = [
  "S.No.",
  "Name",
  "Username",
  "Password",
  "Phone",
  "Email",
  "Role",
  "Actions",
]