import { useState } from 'react'
import { Plus, Play, Pause, Calendar, Users, TrendingUp } from 'lucide-react'

export default function Campaigns() {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale 2024',
      status: 'active',
      sent: 1250,
      delivered: 1180,
      read: 890,
      replied: 145,
      scheduled: '2024-06-15',
      contacts: 1500
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'scheduled',
      sent: 0,
      delivered: 0,
      read: 0,
      replied: 0,
      scheduled: '2024-06-20',
      contacts: 2000
    },
    {
      id: 3,
      name: 'Customer Feedback',
      status: 'completed',
      sent: 500,
      delivered: 485,
      read: 420,
      replied: 280,
      scheduled: '2024-06-01',
      contacts: 500
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'paused': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Campaigns</h1>
          <p className="text-gray-600">Manage and track your marketing campaigns</p>
        </div>
        <button className="whatsapp-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Total Campaigns</h3>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">12</p>
          <p className="text-sm text-green-600 mt-1">+3 this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Messages Sent</h3>
            <Users className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">15,420</p>
          <p className="text-sm text-blue-600 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Delivery Rate</h3>
            <TrendingUp className="text-purple-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">94.2%</p>
          <p className="text-sm text-purple-600 mt-1">+2.1% vs last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Response Rate</h3>
            <TrendingUp className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">18.5%</p>
          <p className="text-sm text-orange-600 mt-1">+5.2% vs last month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Campaign Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contacts</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Delivered</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Read</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Replied</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Scheduled</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{campaign.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{campaign.contacts.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.delivered.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.read.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.replied.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {campaign.scheduled}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {campaign.status === 'active' ? (
                        <button className="p-2 hover:bg-yellow-50 rounded-lg transition-colors">
                          <Pause size={16} className="text-yellow-600" />
                        </button>
                      ) : (
                        <button className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                          <Play size={16} className="text-green-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
