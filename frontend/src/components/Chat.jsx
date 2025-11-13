import { useState, useEffect } from 'react'
import { Send, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Chat() {
  const { token, API_URL } = useAuth()
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [ws, setWs] = useState(null)

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact._id)
      connectWebSocket(selectedContact._id)
    }
    return () => {
      if (ws) ws.close()
    }
  }, [selectedContact])

  const loadContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setContacts(response.data)
    } catch (error) {
      console.error('Failed to load contacts:', error)
    }
  }

  const loadMessages = async (contactId) => {
    try {
      const response = await axios.get(`${API_URL}/whatsapp/messages/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(response.data)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const connectWebSocket = (contactId) => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'
    const websocket = new WebSocket(`${wsUrl}/ws/chat/${contactId}`)
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'message') {
        setMessages(prev => [...prev, data.data])
      } else if (data.type === 'history') {
        setMessages(data.messages)
      }
    }
    
    setWs(websocket)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedContact) return

    try {
      await axios.post(
        `${API_URL}/whatsapp/send_message`,
        {
          phone: selectedContact.phone,
          message: newMessage,
          contact_id: selectedContact._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          sender: 'agent',
          message: newMessage,
          status: 'sent'
        }))
      }

      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div className="flex h-full">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <div
              key={contact._id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContact?._id === contact._id ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{contact.name}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedContact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedContact.name}</p>
                  <p className="text-sm text-gray-500">{selectedContact.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 chat-bg">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'client'
                        ? 'bg-white'
                        : 'whatsapp-light'
                    }`}
                  >
                    <p className="text-gray-800">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <p className="text-xl mb-2">Select a contact to start chatting</p>
              <p className="text-sm">Choose from your contacts on the left</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
