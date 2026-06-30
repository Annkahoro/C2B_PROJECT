# C2B PathFinder — AI-Powered Learning Path Recommendation Platform

A demo system for Campus2Business (C2B) built as part of the BGT 4th Edition program. This platform integrates three conceptual pillars — the Learning Passport, the Skills Gap Diagnostic, and the Feedback Loop Engine — into one unified system with three dashboards.

## Quick start

```bash
# 1. Navigate to the project folder
cd C2B-PathFinder

# 2. Install client dependencies
cd client
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

## What you'll see

### Login screen
Choose one of three dashboards, each with demo profiles preloaded:

- **Learner Dashboard** — pick from 5 demo learners (Maria, James, Ana, Liam, Sophie), each with different backgrounds, skills, and career goals.
- **Company Admin Dashboard** — pick from 2 demo companies (TechFabrik GmbH, Basque Financial Group), each with departments and workforce data.
- **C2B Admin Dashboard** — access platform-wide analytics, the course catalogue, and the feedback loop.

### Learner Dashboard (Learning Passport + Skills Gap Diagnostic)
- **Passport tab** — visual history of completed courses, skill radar chart, progress toward target role.
- **Recommendations tab** — AI-generated course recommendations with confidence scores and plain-language explanations showing *why* each course is recommended.
- **Learning Path tab** — visual journey from current position through recommended courses to the target role.
- **Skills tab** — gap analysis showing which target skills are acquired vs remaining.

### Company Admin Dashboard (Skills Gap Diagnostic at organisational scale)
- **Overview tab** — company profile, department sizes, transformation goals, budget, and timeline.
- **Skill Heatmap tab** — colour-coded grid showing departments vs skills, with gap counts (e.g., 20/25 employees lack this skill). Includes critical gap alerts.
- **Training Roadmap tab** — AI-generated phased training plan with departments, programmes, and timeline per phase.
- **Progress tab** — simulated training progress tracking across departments.

### C2B Admin Dashboard (Feedback Loop Engine + platform management)
- **Analytics tab** — platform-wide metrics (learner count, completion trends, category distribution, top courses, dropout risk alerts).
- **Course Catalogue tab** — searchable and filterable list of all 30 courses with metadata.
- **Feedback Loop tab** — post-course feedback responses with impact scores, application rates, and how the data improves recommendations.
- **Users & Companies tab** — overview of registered learners and companies.

## Demo data

The system includes realistic seed data:
- **30 courses** across 9 categories (Digital Marketing, Data Analytics, Cloud & IT, Cybersecurity, Project Management, Leadership, Design, Microsoft 365, Automation)
- **5 learner profiles** with varied backgrounds, completed courses, and career goals
- **2 company profiles** with departments, employees, skill gaps, and AI-generated training plans
- **12 feedback responses** with impact scores and suggestions
- **15 AI recommendations** with confidence scores and explanations

## Tech stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6

## Project structure

```
C2B-PathFinder/
├── client/
│   ├── src/
│   │   ├── data/
│   │   │   └── seedData.js          # All demo data
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Role & profile selection
│   │   │   ├── learner/
│   │   │   │   └── LearnerDashboard.jsx
│   │   │   ├── company/
│   │   │   │   └── CompanyDashboard.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── App.jsx                  # Routing
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Tailwind imports
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── package.json
└── README.md
```

## For the Bilbao demo

1. Run `npm install` and `npm run dev` before your session
2. Have 2-3 browser tabs ready: one on Login, one on a Learner Dashboard, one on a Company Dashboard
3. Walk testers through the specific dashboard relevant to their persona
4. Key screens to demo: the AI recommendation cards with explanations, the workforce skill heatmap, and the feedback loop showing how the system improves

---

*C2B PathFinder — BGT 4th Edition — Campus2Business Challenge — 2026*.
