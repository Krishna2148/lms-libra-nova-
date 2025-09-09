import PageHeaders from '../../components/PageHeader/index';
import Access from '../../utils/Access';

const Dashboard = () => {
 

  return (
    <>
      {Access.hasPermission("CREATE_USER") && (
        <PageHeaders 
          title="A Library Management System Dashboard" 
          description="A futuristic, innovative library combining knowledge and technology." 
        />
      )}
      
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