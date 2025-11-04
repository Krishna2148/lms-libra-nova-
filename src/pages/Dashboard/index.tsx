import PageHeaders from "../../components/PageHeader/index";
// import Access from "../../app/components/utils/Access";
import FormContainer from "@/components/Form-Container";
import {
  ArchiveRestore,
  BookOpenCheck,
  ChevronRight,
  Loader,
  MailPlus,
  Notebook,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAllDetailsQuery } from "@/redux/user-mgmt/user/userApiSlice";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Chart Components
const BarChart = ({ data }: any) => (
  <div className="bg-white p-4 rounded-lg shadow w-full h-full flex flex-col justify-center">
    <h3 className="text-lg font-medium mb-4 text-center">Bar Chart</h3>
    <div className="flex-1">
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  </div>
);

const PieChart = ({ data }: any) => (
  <div className="bg-white p-4 rounded-lg shadow w-full h-full flex flex-col justify-center">
    <h3 className="text-lg font-medium mb-4 text-center">Pie Chart</h3>
    <div className="flex-1">
      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  </div>
);

const Dashboard = () => {
  // const access = Access.hasRole("ROLE_ADMIN");

  const { data: dashboardData } = useGetAllDetailsQuery({});

  const cardData = dashboardData?.data
  console.log(cardData, "+++++++++")

  // Constant data
  const labels = ["Users", "Books", "Memberships", "Reservations", "Borrowed Books"];
  const barData = {
    labels,
    datasets: [
      {
        label: "Count",
        data: [cardData?.totalUsers, cardData?.totalBooks, cardData?.totalMemberShip, cardData?.totalReservation, cardData?.totalBorrows],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        borderRadius: 4,
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Distribution",
        data: [cardData?.totalUsers, cardData?.totalBooks, cardData?.totalMemberShip, cardData?.totalReservation, cardData?.totalBorrows],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <>
      <PageHeaders
        title="A Library Management System Dashboard"
        description="A futuristic, innovative library combining knowledge and technology."
      />

      <FormContainer>
        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <DashboardCard
            title="Total Active Users"
            description="Users currently active in the system"
            count={cardData?.totalUsers || 0}
            icon={<Users className="w-6 h-6" />}
            bgGradient="from-blue-100 to-blue-200"
            iconGradient="from-blue-400 to-blue-600"
            link="/admin/user-mgmt/users"
          />
          <DashboardCard
            title="Total Active Roles"
            description="Roles currently active in the system"
            count={cardData?.totalRoles || 0}
            icon={<Loader className="w-6 h-6" />}
            bgGradient="from-red-100 to-red-200"
            iconGradient="from-red-400 to-red-600"
            link="/admin/user-mgmt/roles"
          />
          <DashboardCard
            title="Total Available Books"
            description="Books currently available in the system"
            count={cardData?.totalBooks || 0}
            icon={<BookOpenCheck className="w-6 h-6" />}
            bgGradient="from-orange-100 to-orange-200"
            iconGradient="from-orange-400 to-orange-600"
            link="/admin/book-mgmt"
          />
          <DashboardCard
            title="Total Reservation"
            description="Reservation currently active in the system"
            count={cardData?.totalReservation || 0}
            icon={<ArchiveRestore className="w-6 h-6" />}
            bgGradient="from-green-100 to-green-200"
            iconGradient="from-green-400 to-green-600"
            link="/admin/reservation"
          />
          <DashboardCard
            title="Total Active Membership"
            description="Membership currently active in the system"
            count={cardData?.totalMemberShip || 0}
            icon={<MailPlus className="w-6 h-6" />}
            bgGradient="from-purple-100 to-purple-200"
            iconGradient="from-purple-400 to-purple-600"
            link="/admin/membership"
          />
          <DashboardCard
            title="Total Borrow Books"
            description="Borrow currently active in the system"
            count={cardData?.totalBorrows || 0}
            icon={<Notebook className="w-6 h-6" />}
            bgGradient="from-slate-100 to-slate-200"
            iconGradient="from-slate-400 to-slate-600"
            link="/admin/borrow-books"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="h-[400px]">
            <BarChart data={barData} />
          </div>
          <div className="h-[400px]">
            <PieChart data={pieData} />
          </div>
        </div>
      </FormContainer>
    </>
  );
};

// DashboardCard Component
const DashboardCard = ({
  title,
  description,
  count,
  icon,
  bgGradient,
  iconGradient,
  link,
}: any) => (
  <div className={`bg-gradient-to-br ${bgGradient} shadow-lg p-3 rounded-lg flex flex-col gap-2`}>
    <div className="flex justify-between">
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-card-foreground">{title}</span>
        <span className="text-muted-foreground mt-1 text-sm">{description}</span>
      </div>
      <div className={`bg-gradient-to-br ${iconGradient} text-white p-3 rounded-xl`}>
        {icon}
      </div>
    </div>
    <span className="text-2xl font-bold text-card-foreground w-full flex ">
      {count}
    </span>
    <Link to={link} className="flex gap-1 justify-end text-blue-500 text-[0.85rem]">
      <span>View More Details</span>
      <ChevronRight className="w-5 h-5 mt-[3px]" />
    </Link>
  </div>
);

export default Dashboard;