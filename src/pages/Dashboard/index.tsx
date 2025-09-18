import PageHeaders from '../../components/PageHeader/index';
import Access from '../../app/components/utils/Access';

const Dashboard = () => {
  const access = Access.hasRole("ROLE_ADMIN");
  console.log(access,"+++++++++++++++++555555+");

  return (
    <>
      {Access.hasRole("CREATE_USER") && (
        <PageHeaders
          title="A Library Management System Dashboard"
          description="A futuristic, innovative library combining knowledge and technology."
        />
      )}

      {Access.hasRole("CREATE_USER") && (
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New User
          </button>
        </div>
      )}

      {Access.hasRole("MANAGE_BOOKS") && (
        <div className="mt-4">
          <h2>Book Management Section</h2>
          {/* Book management content */}
        </div>
      )}

      {!Access.hasRole("VIEW_DASHBOARD") && (
        <div className="text-red-500 p-4">
          You don't have permission to view this dashboard.
        </div>
      )}
    </>
  )
}

export default Dashboard
