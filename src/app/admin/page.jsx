"use client"
import React from 'react';
import Head from 'next/head';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const cards = [
    { id: 1, color: 'bg-blue-500', value: 655, label: 'Projects', icon: '⏳', route: '/projects' },
    { id: 2, color: 'bg-purple-500', value: 3, label: 'Withdrawn Request', icon: '$', route: '/withdrawn' },
    { id: 3, color: 'bg-yellow-500', value: 2179, label: 'Registered Users', icon: '👤', route: '/users' },
    { id: 4, color: 'bg-red-500', value: 59, label: 'Contract', icon: '✅', route: '/contracts' },
    { id: 5, color: 'bg-green-500', value: 1873, label: 'Unread Notification', icon: '🔔', route: '/notifications' },
    { id: 6, color: 'bg-teal-500', value: 2174, label: 'Total Tutor', icon: '👩‍🏫', route: '/tutors' },
    { id: 7, color: 'bg-pink-500', value: 5, label: 'Total Employer', icon: '👨‍💼', route: '/employers' },
    { id: 8, color: 'bg-gray-500', value: 890, label: 'Contact Request', icon: '📞', route: '/contact-requests' },
    { id: 9, color: 'bg-red-600', value: 11, label: 'Dispute', icon: '⚠️', route: '/disputes' },
    { id: 10, color: 'bg-green-600', value: 76, label: 'Milestones', icon: '📍', route: '/milestones' },
    { id: 11, color: 'bg-lime-500', value: 1334, label: 'Applications', icon: '📝', route: '/applications' },
    { id: 12, color: 'bg-purple-600', value: 41, label: 'Reviews', icon: '⭐', route: '/reviews' },
    { id: 13, color: 'bg-orange-500', value: 64, label: 'Message board', icon: '💬', route: '/messages' },
    { id: 14, color: 'bg-cyan-500', value: 57, label: 'Invoice', icon: '📄', route: '/invoices' },
    { id: 15, color: 'bg-gray-600', value: 72, label: 'Total Offer', icon: '🎁', route: '/offers' },
    { id: 16, color: 'bg-pink-600', value: 142, label: 'Escrow', icon: '🛡️', route: '/escrow' },
  ];

  const graphs = [
    {
      id: 1,
      color: 'bg-teal-200',
      label: 'Project Graph',
      data: [25, 25, 30, 40, 50, 30, 20, 10],
      borderColor: 'rgba(20, 184, 166, 1)',
      backgroundColor: 'rgba(20, 184, 166, 0.2)',
    },
    {
      id: 2,
      color: 'bg-blue-200',
      label: 'Member Graph',
      data: [100, 300, 200, 100, 50, 200, 400, 300],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
    {
      id: 3,
      color: 'bg-pink-200',
      label: 'Add Fund Graph',
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(236, 72, 153, 0.2)',
    },
    {
      id: 4,
      color: 'bg-purple-200',
      label: 'Profit Graph',
      data: [0, 150, 450, 300, 150, 0, 0, 0],
      borderColor: 'rgba(168, 85, 247, 1)',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
    },
  ];

  const data = (graph) => ({
    labels: ['2024-08', '2024-10', '2024-12', '2025-02', '2025-04', '2025-06', '2025-08'],
    datasets: [
      {
        label: graph.label,
        data: graph.data,
        borderColor: graph.borderColor,
        backgroundColor: graph.backgroundColor,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard <span className="text-gray-400">Home / Dashboard</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <Link href={card.route} key={card.id}>
            <div className={`${card.color} text-white p-4 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1`}>
              <h2 className="text-3xl font-bold">{card.value}</h2>
              <p className="text-sm mt-2">{card.label}</p>
              <span className="text-xl block my-2">{card.icon}</span>
              <p className="text-xs">More info <span className="inline-block w-4 h-4 bg-white bg-opacity-70 rounded-full text-black text-center">ⓘ</span></p>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {graphs.map(graph => (
          <div key={graph.id} className={`${graph.color} p-6 rounded-lg shadow-md`}>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{graph.label}</h2>
            <div className="h-64">
              <Line data={data(graph)} options={options} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
