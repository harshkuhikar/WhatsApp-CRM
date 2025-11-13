import { NavLink } from 'react-router-dom'
import { MessageCircle, Users, Send, Megaphone, FileText, BarChart3, MessageSquare } from 'lucide-react'

export default function Sidebar({ isOpen }) {
  const navItems = [
    { path: '/', icon: MessageSquare, label: 'Chat' },
    { path: '/contacts', icon: Users, label: 'Contacts' },
    { path: '/bulk-message', icon: Send, label: 'Bulk Message' },
    { path: '/campaigns', icon: Megaphone, label: 'Campaigns' },
    { path: '/templates', icon: FileText, label: 'Templates' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' }
  ]

  return (
    <aside className={`whatsapp-bg text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle size={32} />
          {isOpen && <h1 className="text-xl font-bold">WhatsApp CRM</h1>}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-green-600' : 'hover:bg-green-700'
                }`
              }
            >
              <item.icon size={24} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
