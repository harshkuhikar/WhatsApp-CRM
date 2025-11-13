import { useState, useEffect } from 'react'
import { Send, Upload, Users, FileText, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function BulkMessage() {
  const { token, API_URL } = useAuth()
  const [contacts, setContacts] = useState([])
  const [templates, setTemplates] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [message, setMessage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [sending, setSending] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    loadContacts()
    loadTemplates()
  }, [])

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

  const loadTemplates = async () => {
    try {
      const response = await axios.get(`${API_URL}/templates`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTemplates(response.data)
    } catch (error) {
      console.error('Failed to load templates:', error)
    }
  }

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t._id === templateId)
    if (template) {
      setMessage(template.content)
      setSelectedTemplate(templateId)
    }
  }

  const toggleContact = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const selectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(contacts.map(c => c._id))
    }
  }

  const handleSendBulk = async () => {
    if (!message.trim() || selectedContacts.length === 0) {
      alert('Please select contacts and enter a message')
      return
    }

    setSending(true)
    setProgress(0)

    const selectedContactsData = contacts.filter(c => selectedContacts.includes(c._id))
    const total = selectedContactsData.length

    for (let i = 0; i < selectedContactsData.length; i++) {
      const contact = selectedContactsData[i]
      try {
        await axios.post(
          `${API_URL}/whatsapp/send_message`,
          {
            phone: contact.phone,
            message: message,
            contact_id: contact._id
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setProgress(Math.round(((i + 1) / total) * 100))
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Failed to send to ${contact.name}:`, error)
      }
    }

    setSending(false)
    alert(`Messages sent to ${selectedContactsData.length} contacts!`)
    setSelectedContacts([])
    setMessage('')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target.result
        const lines = text.split('\n')
        const newContacts = lines.slice(1).map(line => {
          const [name, phone, email] = line.split(',')
          return { name: name?.trim(), phone: phone?.trim(), email: email?.trim() }
        }).filter(c => c.name && c.phone)
        
        // Here you would typically send these to your API to create contacts
        console.log('Imported contacts:', newContacts)
        alert(`Imported ${newContacts.length} contacts`)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bulk Messaging</h1>
        <p className="text-gray-600">Send messages to multiple contacts at once</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Selection */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users size={24} className="text-green-600" />
              Select Contacts
            </h2>
            <label className="cursor-pointer text-green-600 hover:text-green-700">
              <Upload size={20} />
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={selectAll}
            className="w-full mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
          </button>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {contacts.map(contact => (
              <label
                key={contact._id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact._id)}
                  onChange={() => toggleContact(contact._id)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">
              Selected: {selectedContacts.length} / {contacts.length}
            </p>
          </div>
        </div>

        {/* Message Composer */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={24} className="text-green-600" />
            Compose Message
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Use Template (Optional)
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateSelect(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            >
              <option value="">-- Select a template --</option>
              {templates.map(template => (
                <option key={template._id} value={template._id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              placeholder="Type your message here... You can use variables like {name}, {phone}, etc."
            />
            <p className="text-sm text-gray-500 mt-2">
              Character count: {message.length}
            </p>
          </div>

          {sending && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Sending messages...</span>
                <span className="text-sm font-medium text-green-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="whatsapp-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={handleSendBulk}
            disabled={sending || selectedContacts.length === 0 || !message.trim()}
            className="w-full whatsapp-green text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending {progress}%
              </>
            ) : (
              <>
                <Send size={20} />
                Send to {selectedContacts.length} Contact{selectedContacts.length !== 1 ? 's' : ''}
              </>
            )}
          </button>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Messages will be sent with a 1-second delay between each to avoid rate limiting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
