import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data for the dashboard
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Pro',
    creditsUsed: 25000,
    creditsTotal: 50000,
    recentHumanizations: [
      { id: 1, date: '2025-05-20', characters: 1250, status: 'completed' },
      { id: 2, date: '2025-05-18', characters: 3200, status: 'completed' },
      { id: 3, date: '2025-05-15', characters: 1800, status: 'completed' },
      { id: 4, date: '2025-05-12', characters: 2500, status: 'completed' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">{userData.name}</span>
            <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Credit Usage Card */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Credit Usage</h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    <span>{userData.creditsUsed} / {userData.creditsTotal} characters</span>
                    <span>{Math.round((userData.creditsUsed / userData.creditsTotal) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(userData.creditsUsed / userData.creditsTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    href="/marketing/pricing" 
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Upgrade your plan →
                  </Link>
                </div>
              </div>
            </div>

            {/* Current Plan Card */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Plan</h3>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {userData.plan}
                  </span>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    Your plan renews on June 20, 2025
                  </p>
                </div>
                <div className="mt-4">
                  <Link 
                    href="/marketing/pricing" 
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Change plan →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <Link 
                    href="/" 
                    className="block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    ✏️ New Humanization
                  </Link>
                  <Link 
                    href="/dashboard/history" 
                    className="block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    📜 View History
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    ⚙️ Account Settings
                  </Link>
                  <Link 
                    href="/marketing/contact" 
                    className="block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    📞 Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Humanizations */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Humanizations</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your latest AI text humanization activities</p>
              </div>
              <Link 
                href="/dashboard/history" 
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all
              </Link>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Characters
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {userData.recentHumanizations.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.characters}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips and Tricks */}
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Tips for Better Humanization</h3>
            <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>Break up long paragraphs for better readability</li>
              <li>Use the &quot;high&quot; strength setting for more thorough humanization</li>
              <li>For academic content, select the &quot;advanced&quot; readability level</li>
              <li>Save your humanized text to your account for future reference</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
