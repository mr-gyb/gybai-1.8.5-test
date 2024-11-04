import React from 'react';
import { Star, Briefcase, Users, MessageSquare, Gift, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const rating = 4.7;
  const fullStars = Math.floor(rating);

  const earningsData = [
    { day: 'Mon', dailyEarnings: 120, weeklyTrend: 130 },
    { day: 'Tue', dailyEarnings: 150, weeklyTrend: 155 },
    { day: 'Wed', dailyEarnings: 180, weeklyTrend: 170 },
    { day: 'Thu', dailyEarnings: 200, weeklyTrend: 180 },
    { day: 'Fri', dailyEarnings: 170, weeklyTrend: 190 },
    { day: 'Sat', dailyEarnings: 220, weeklyTrend: 210 },
    { day: 'Sun', dailyEarnings: 250, weeklyTrend: 220 },
  ];

  const dashboardButtons = [
    { to: "/work-history", icon: Briefcase, label: "Work History" },
    { to: "/invites", icon: Users, label: "Invites" },
    { to: "/reviews", icon: MessageSquare, label: "Reviews" },
    { to: "/rewards", icon: Gift, label: "Rewards" },
    { to: "/payments", icon: DollarSign, label: "Payments" },
    { to: "/earnings", icon: TrendingUp, label: "Earnings" },
  ];

  return (
    <div className="space-y-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <Star className="w-16 h-16 text-yellow-400 fill-current" />
          <span className="text-6xl font-bold ml-4 text-navy-blue">{rating}</span>
        </div>
        <div className="flex mt-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 ${
                index < fullStars
                  ? 'text-yellow-400 fill-current'
                  : index === fullStars
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {dashboardButtons.map((button) => (
          <Link
            key={button.to}
            to={button.to}
            className="bg-navy-blue text-white rounded-lg p-4 text-center font-semibold hover:bg-gold hover:text-navy-blue transition-colors duration-300 flex flex-col items-center justify-center"
          >
            <button.icon size={24} className="mb-2" />
            <span>{button.label}</span>
          </Link>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-4 sm:p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">Earnings Overview</h2>
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-navy-blue mr-2"></div>
            <span>Daily Earnings</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gold mr-2"></div>
            <span>Weekly Trend</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dailyEarnings" fill="#0f2a4a" name="Daily Earnings" />
            <Bar dataKey="weeklyTrend" fill="#d4af37" name="Weekly Trend" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;