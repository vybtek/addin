import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsCharts = () => {
  const earningData = {
    labels: [
      "Jun (24)",
      "Jul (24)",
      "Aug (24)",
      "Sep (24)",
      "Oct (24)",
      "Nov (24)",
      "Dec (24)",
      "Jan (25)",
      "Feb (25)",
      "Mar (25)",
      "Apr (25)",
      "May (25)",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        fill: false,
        tension: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const earningOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.1,
          callback: (value) => value.toFixed(1),
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const projectData = {
    labels: ["Pending Offer", "Processing Contract", "Completed Contract"],
    datasets: [
      {
        label: "Projects",
        data: [0, 0, 0],
        backgroundColor: ["#FBBF24", "#3B82F6", "#10B981"],
        borderWidth: 0,
      },
    ],
  };

  const projectOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">
        Earning Stats
      </h3>
      <div className="h-64">
        <Line data={earningData} options={earningOptions} />
      </div>
      <h3 className="font-semibold text-lg text-gray-800 mt-6 mb-4">
        Project Stats
      </h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm">
          <span className="w-4 h-4 bg-yellow-400 mr-2 rounded"></span> Pending
          Offer
        </div>
        <div className="flex items-center text-sm">
          <span className="w-4 h-4 bg-blue-500 mr-2 rounded"></span> Processing
          Contract
        </div>
        <div className="flex items-center text-sm">
          <span className="w-4 h-4 bg-green-500 mr-2 rounded"></span> Completed
          Contract
        </div>
      </div>
      <div className="h-32">
        <Bar data={projectData} options={projectOptions} />
      </div>
    </div>
  );
};

export default StatsCharts;