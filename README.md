# WhatsApp Business CRM

A comprehensive WhatsApp Business CRM system with bulk messaging, campaign management, and real-time chat capabilities.

## 🚀 One-Click Deploy

### Deploy Backend to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/whatsapp-crm?referralCode=bonus)

### Deploy Frontend to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/harshkuhikar/WhatsApp-CRM)

## Features

- 🔐 **Authentication** - Secure login with JWT tokens and QR code scanning
- 💬 **Real-time Chat** - WebSocket-powered instant messaging
- 📤 **Bulk Messaging** - Send messages to thousands of contacts at once
- 📊 **Campaign Management** - Schedule and track marketing campaigns
- 📝 **Message Templates** - Create and reuse message templates
- 👥 **Contact Management** - Import, export, and manage contacts
- 📈 **Analytics Dashboard** - Track delivery rates, read rates, and responses
- 🎨 **Beautiful UI** - WhatsApp-themed professional interface

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide Icons

### Backend
- FastAPI (Python)
- MongoDB (Motor)
- WebSocket
- JWT Authentication
- WhatsApp Business API Integration

## Local Development

### Prerequisites
- Python 3.12+
- Node.js 18+
- MongoDB

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=whatsapp_crm
JWT_SECRET=your_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

WHATSAPP_TOKEN=your_whatsapp_token
PHONE_NUMBER_ID=your_phone_number_id
VERIFY_TOKEN=your_verify_token
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

3. Run the backend:
```bash
python main.py
```

Backend will run on http://localhost:8000

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas account (for production database)

### Steps

1. Push your code to GitHub

2. Import project to Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

3. Configure Environment Variables in Vercel:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `DATABASE_NAME` - Database name
   - `JWT_SECRET` - Secret key for JWT
   - `WHATSAPP_TOKEN` - WhatsApp Business API token
   - `PHONE_NUMBER_ID` - WhatsApp phone number ID
   - `VERIFY_TOKEN` - Webhook verification token

4. Deploy!

## API Documentation

Once deployed, visit `/docs` for interactive API documentation (Swagger UI).

## Usage

1. **Sign Up** - Create your account
2. **Add Contacts** - Import contacts via CSV or add manually
3. **Create Templates** - Build reusable message templates
4. **Send Bulk Messages** - Select contacts and send messages
5. **Track Campaigns** - Monitor delivery and response rates
6. **Chat** - Real-time messaging with contacts

## Features in Detail

### Bulk Messaging
- Send to unlimited contacts
- CSV import support
- Template integration
- Progress tracking
- Rate limiting protection

### Campaign Management
- Schedule campaigns
- Track metrics (sent, delivered, read, replied)
- Pause/resume campaigns
- Performance analytics

### Templates
- Create reusable templates
- Variable substitution
- Quick copy to clipboard
- Template library

### Analytics
- Delivery rates
- Read rates
- Response rates
- Campaign performance
- Recent activity tracking

## License

MIT

## Author

Harsh Kuhikar

## Support

For issues and questions, please open an issue on GitHub.
