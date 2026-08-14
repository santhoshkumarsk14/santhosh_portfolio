# Santhoshkumar Ravichandran — Java Backend Developer Portfolio

## 🎯 Overview

Personal portfolio site for a Java Backend Developer with 3.5+ years of experience building
scalable microservices and REST APIs with Spring Boot, RabbitMQ, and MySQL. The site is a
React single-page app with sections for About, Skills, Experience, and Contact.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Modern UI**: Clean, minimalist design with custom color palette
- **Responsive Design**: Mobile-first approach with hover effects and animations
- **Interactive Components**: Skill grid, experience timeline, and smooth navigation
- **Professional Typography**: Poppins headings, Inter body text, Fira Code for code

### Contact Backend (Python + Flask)
- Simple Flask API (`backend/contact_api.py`) that receives the contact form submission
  and saves it to a Google Sheet via `gspread`

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- lucide-react icons

### Backend (contact form only)
- Flask
- Flask-CORS
- gspread / oauth2client (Google Sheets integration)

## 📁 Project Structure

```
santhosh_portfolio/
│
├── frontend/                  # React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── SkillBar.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                   # Flask contact form API
│   ├── contact_api.py
│   └── requirements.txt
│
├── assets/                   # Static assets (resume, etc.)
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python 3.8+ (only needed for the contact form API)
- npm

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

### Contact API Setup (optional)

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
```

Set `GOOGLE_SHEETS_CREDENTIALS` and `SPREADSHEET_ID` in `contact_api.py` to your own Google
Sheets service account before running:

```bash
python contact_api.py
```

The API runs on `http://localhost:5000`.

## 🎯 Portfolio Sections

- **Hero** — name, title, location, resume download
- **Stats** — years of experience, microservices delivered, users served
- **About** — background summary and core focus areas
- **Skills** — languages, frameworks, architecture, database, messaging, cloud/DevOps, practices
- **Experience** — work history timeline with education
- **Contact** — contact form, direct contact info, and social links

## 🌐 Deployment

### Frontend (GitHub Pages)
```bash
cd frontend
npm run build
npm run deploy
```

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color palette.

### Fonts
Update font imports in `frontend/src/index.css` and `tailwind.config.js`.

### Content
Modify component files in `frontend/src/components/` and `frontend/src/pages/`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Santhoshkumar Ravichandran**
- Email: santhosh14.ravichandran@gmail.com
- LinkedIn: [santhoshkumar-ravichandran](https://linkedin.com/in/santhoshkumar-ravichandran)
- GitHub: [santhoshkumarsk14](https://github.com/santhoshkumarsk14)
