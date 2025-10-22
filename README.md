# Santhoshkumar Ravichandran - Data Analyst Portfolio

## 🎯 Overview

Welcome to my interactive data analyst portfolio! This project showcases my expertise in data analysis, AI-powered insights, and interactive dashboard development. The portfolio features a modern React frontend with Streamlit-powered dashboards and AI capabilities.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Modern UI**: Clean, minimalist design with custom color palette
- **Responsive Design**: Mobile-first approach with hover effects and animations
- **Interactive Components**: Skill bars, project cards, and smooth navigation
- **Professional Typography**: Poppins headings, Inter body text, Fira Code for code

### Backend (Python + Streamlit)
- **6 Interactive Dashboards**:
  1. Business Analytics Dashboard - Sales analysis with AI predictions
  2. Finance & Investment Insights - Stock analysis with trend alerts
  3. Social Media Sentiment Analyzer - Real-time sentiment analysis
  4. Recommendation Engine - Personalized recommendations
  5. Automated Reporting - AI-generated reports from CSV data
  6. What-If Scenario Analysis - Dynamic business scenario modeling

### AI Features
- **Sales Prediction**: Machine learning models for revenue forecasting
- **Trend Detection**: AI-powered anomaly detection in financial data
- **Sentiment Analysis**: Real-time social media sentiment processing
- **Recommendation System**: Collaborative filtering algorithms
- **Automated Reporting**: AI-generated insights and reports
- **Scenario Optimization**: AI-driven decision recommendations

### AI Assistant Chatbot
- **Natural Language Queries**: Ask questions in plain English
- **Instant Insights**: Get immediate answers about your data
- **Advanced Analytics**: Generate reports and predictions on demand

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM

### Backend
- Python 3.8+
- Streamlit
- Pandas
- NumPy
- Plotly
- OpenAI API (optional)
- HuggingFace Transformers (optional)

### Data & Storage
- CSV/Excel files
- MySQL (optional)

## 🎨 Design System

### Color Palette
- **Deep Blue** (#1E3A8A): Trust, professionalism
- **Vibrant Teal** (#14B8A6): Highlights, call-to-action
- **Soft Gray** (#F3F4F6): Background
- **Amber** (#FBBF24): Buttons, icons
- **Coral** (#F87171): Alerts, notifications

### Typography
- **Headings**: Poppins (Bold, Modern, Clean)
- **Body Text**: Inter (Readable, Minimalist)
- **Code**: Fira Code (Monospace)

## 📁 Project Structure

```
Santhoshkumar-Portfolio/
│
├── frontend/                  # React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── SkillBar.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Project[1-6].jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                   # Python/Streamlit applications
│   ├── dashboards/           # Individual dashboard apps
│   │   ├── business_analytics.py
│   │   ├── finance_insights.py
│   │   ├── social_media.py
│   │   ├── recommendation_engine.py
│   │   ├── automated_reporting.py
│   │   └── what_if_scenario.py
│   ├── ai_chatbot/
│   │   └── chatbot.py
│   ├── utils/                # Utility functions
│   ├── requirements.txt
│   └── venv/                 # Virtual environment
│
├── assets/                   # Static assets
│   ├── images/
│   ├── icons/
│   └── animations/
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Python 3.8+
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
```

### Running Individual Dashboards

```bash
# Business Analytics Dashboard
streamlit run dashboards/business_analytics.py

# Finance Insights Dashboard
streamlit run dashboards/finance_insights.py

# Social Media Analyzer
streamlit run dashboards/social_media.py

# Recommendation Engine
streamlit run dashboards/recommendation_engine.py

# Automated Reporting
streamlit run dashboards/automated_reporting.py

# What-If Scenario Analysis
streamlit run dashboards/what_if_scenario.py

# AI Chatbot
streamlit run ai_chatbot/chatbot.py
```

Each dashboard will run on `http://localhost:8501` (Streamlit's default port)

## 🎯 Portfolio Sections

### Home Page
- Hero section with tagline and CTA
- Quick stats (animated counters)
- Featured projects grid

### Projects Pages
Each project includes:
- Problem statement
- Dataset information
- Analysis & insights with charts
- Interactive demo links
- AI-powered features
- Code & documentation links

### AI Assistant Chatbot
- Floating chat interface
- Natural language processing
- Data query capabilities
- Report generation

### About/Skills
- Personal story
- Interactive skill bars
- Technical expertise showcase

### Contact
- Contact form with AI suggestions
- Social media links
- Professional networking

## 🤖 AI Integration

### OpenAI API (Optional)
For advanced AI features, set up your OpenAI API key:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

### HuggingFace Integration
The sentiment analysis uses HuggingFace transformers for local processing.

## 📊 Dashboard Features

### Business Analytics Dashboard
- Sales trend analysis
- Regional performance metrics
- Product KPIs
- AI-powered sales predictions
- Interactive filters and date ranges

### Finance & Investment Insights
- Real-time stock price visualization
- Technical analysis (moving averages)
- Risk metrics (volatility, Sharpe ratio)
- AI trend alerts for unusual patterns

### Social Media Sentiment Analyzer
- Real-time sentiment scoring
- Word cloud generation
- Hashtag analysis
- AI trending topics detection
- Engagement prediction

### Recommendation Engine
- User-item matrix analysis
- Collaborative filtering
- Content-based recommendations
- AI-powered personalized suggestions

### Automated Reporting
- CSV file upload and analysis
- Automatic data profiling
- AI-generated insights and reports
- Multiple export formats

### What-If Scenario Analysis
- Dynamic parameter adjustment
- Real-time KPI updates
- Business scenario modeling
- AI decision recommendations

## 🌐 Deployment

### Frontend (GitHub Pages)
```bash
cd frontend
npm run build
npm run deploy
```

### Backend (Streamlit Cloud)
1. Push backend code to GitHub
2. Connect to Streamlit Cloud
3. Deploy individual apps

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color palette.

### Fonts
Update font imports in `frontend/src/index.css` and `tailwind.config.js`.

### Content
Modify component files in `frontend/src/components/` and `frontend/src/pages/`.

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs
- Suggest improvements
- Fork for your own use

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Santhoshkumar Ravichandran**
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com)
- GitHub: [Your GitHub Profile](https://github.com)

---

*"Turning Data into Insights, with a Lovable AI Touch"* 🚀