import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Contacts from '../components/Contacts'
import BulkMessage from '../components/BulkMessage'
import Campaigns from '../components/Campaigns'
import Templates from '../components/Templates'
import Analytics from '../components/Analytics'
import Chat from '../components/Chat'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/bulk-message" element={<BulkMessage />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
