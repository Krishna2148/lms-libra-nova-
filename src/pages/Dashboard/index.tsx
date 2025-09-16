import PageHeaders from '../../components/PageHeader/index';
import Access from '../../app/components/utils/Access';
import Table from '@/components/Table';

const Dashboard = () => {

  const tableData = [
    ["John Doe", "123 Main St", "123-456-7890", "Active", "2022-01-01", "2023-01-01"],
    ["Jane Smith", "456 Elm St", "987-654-3210", "Inactive", "2021-02-01", "2023-02-01"],
    ["Bob Johnson", "789 Oak St", "555-555-5555", "Active", "2022-03-01", "2023-03-01"],
  ];

  return (
    <>
      {Access.hasPermission("CREATE_USER") && (
        <PageHeaders
          title="A Library Management System Dashboard"
          description="A futuristic, innovative library combining knowledge and technology."
        />
      )}

<Table tableHead={tableHead} tableData={tableData}/>
      {Access.hasPermission("CREATE_USER") && (
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New User
          </button>
        </div>
      )}

      {Access.hasPermission("MANAGE_BOOKS") && (
        <div className="mt-4">
          <h2>Book Management Section</h2>
          {/* Book management content */}
        </div>
      )}

      {!Access.hasPermission("VIEW_DASHBOARD") && (
        <div className="text-red-500 p-4">
          You don't have permission to view this dashboard.
        </div>
      )}
    </>
  )
}

export default Dashboard
const tableHead = [
 "S>No", "Name", "Email", "Phone", "Address", "Action"
]