import { BarChart3, TrendingUp, Users, MessageCircle, Clock, CheckCircle } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your messaging performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <MessageCircle size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="text-3xl font-bold mb-1">24,580</p>
          <p className="text-green-100">Total Messages Sent</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="text-3xl font-bold mb-1">23,145</p>
          <p className="text-blue-100">Messages Delivered</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="text-3xl font-bold mb-1">3,420</p>
          <p className="text-purple-100">Total Contacts</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="text-3xl font-bold mb-1">94.2%</p>
          <p className="text-orange-100">Delivery Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Message Statistics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivered</span>
                <span className="font-semibold">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Read</span>
                <span className="font-semibold">78.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Replied</span>
                <span className="font-semibold">18.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Bulk message sent</p>
                <p className="text-sm text-gray-500">Sent to 1,250 contacts</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">New contacts added</p>
                <p className="text-sm text-gray-500">45 contacts imported</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Campaign scheduled</p>
                <p className="text-sm text-gray-500">Product Launch campaign</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Top Performing Campaigns</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Campaign</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sent</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Delivered</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Read Rate</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reply Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">Summer Sale 2024</td>
                <td className="px-4 py-3 text-gray-600">1,250</td>
                <td className="px-4 py-3 text-gray-600">1,180</td>
                <td className="px-4 py-3"><span className="text-green-600 font-medium">75.4%</span></td>
                <td className="px-4 py-3"><span className="text-blue-600 font-medium">11.6%</span></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">Customer Feedback</td>
                <td className="px-4 py-3 text-gray-600">500</td>
                <td className="px-4 py-3 text-gray-600">485</td>
                <td className="px-4 py-3"><span className="text-green-600 font-medium">84.0%</span></td>
                <td className="px-4 py-3"><span className="text-blue-600 font-medium">56.0%</span></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">New Product Launch</td>
                <td className="px-4 py-3 text-gray-600">2,000</td>
                <td className="px-4 py-3 text-gray-600">1,920</td>
                <td className="px-4 py-3"><span className="text-green-600 font-medium">68.2%</span></td>
                <td className="px-4 py-3"><span className="text-blue-600 font-medium">8.5%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
