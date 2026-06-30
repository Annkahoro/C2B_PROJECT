// Shared seed data used by both client (mock) and server (MongoDB seeding)

const courses = [
  { _id: "c001", title: "Digital Marketing Fundamentals", category: "Digital Marketing", difficulty: "Beginner", duration: "20 hours", skillsTaught: ["SEO Basics", "Social Media Strategy", "Content Marketing"], prerequisites: [], tags: ["marketing", "digital", "beginner"], description: "Learn the foundations of digital marketing including SEO, social media, and content strategy.", rating: 4.5, completions: 342 },
  { _id: "c002", title: "Google Analytics & Data-Driven Marketing", category: "Digital Marketing", difficulty: "Intermediate", duration: "25 hours", skillsTaught: ["Google Analytics", "Data Analysis", "Campaign Tracking"], prerequisites: ["c001"], tags: ["marketing", "analytics", "data"], description: "Master Google Analytics to make data-driven marketing decisions.", rating: 4.3, completions: 218 },
  { _id: "c003", title: "Marketing Automation with HubSpot", category: "Digital Marketing", difficulty: "Intermediate", duration: "30 hours", skillsTaught: ["Marketing Automation", "Email Marketing", "CRM Integration"], prerequisites: ["c001"], tags: ["marketing", "automation", "crm"], description: "Automate your marketing workflows using HubSpot.", rating: 4.6, completions: 156 },
  { _id: "c004", title: "Advanced SEO & Content Strategy", category: "Digital Marketing", difficulty: "Advanced", duration: "35 hours", skillsTaught: ["Advanced SEO", "Content Strategy", "Technical SEO"], prerequisites: ["c001", "c002"], tags: ["marketing", "seo", "advanced"], description: "Deep dive into technical SEO and advanced content strategy.", rating: 4.7, completions: 89 },
  { _id: "c005", title: "Data Analytics Fundamentals", category: "Data Analytics", difficulty: "Beginner", duration: "25 hours", skillsTaught: ["Data Literacy", "Excel Advanced", "Basic Statistics"], prerequisites: [], tags: ["data", "analytics", "beginner"], description: "Build a solid foundation in data analytics and statistical thinking.", rating: 4.4, completions: 456 },
  { _id: "c006", title: "SQL for Data Analysis", category: "Data Analytics", difficulty: "Intermediate", duration: "30 hours", skillsTaught: ["SQL", "Database Querying", "Data Extraction"], prerequisites: ["c005"], tags: ["data", "sql", "database"], description: "Master SQL to extract and analyse data from relational databases.", rating: 4.5, completions: 312 },
  { _id: "c007", title: "Data Visualization with Power BI", category: "Data Analytics", difficulty: "Intermediate", duration: "28 hours", skillsTaught: ["Power BI", "Data Visualization", "Dashboard Design"], prerequisites: ["c005"], tags: ["data", "visualization", "powerbi"], description: "Create compelling data visualizations and dashboards with Power BI.", rating: 4.6, completions: 278 },
  { _id: "c008", title: "Python for Data Science", category: "Data Analytics", difficulty: "Advanced", duration: "40 hours", skillsTaught: ["Python", "Pandas", "Data Wrangling"], prerequisites: ["c005", "c006"], tags: ["data", "python", "advanced"], description: "Use Python and Pandas for advanced data manipulation and analysis.", rating: 4.8, completions: 134 },
  { _id: "c009", title: "Machine Learning Essentials", category: "Data Analytics", difficulty: "Advanced", duration: "45 hours", skillsTaught: ["Machine Learning", "Predictive Analytics", "Model Evaluation"], prerequisites: ["c008"], tags: ["data", "ml", "ai"], description: "Understand and apply core machine learning algorithms.", rating: 4.7, completions: 67 },
  { _id: "c010", title: "Cloud Computing Fundamentals", category: "Cloud & IT", difficulty: "Beginner", duration: "20 hours", skillsTaught: ["Cloud Concepts", "AWS Basics", "Cloud Architecture"], prerequisites: [], tags: ["cloud", "it", "aws"], description: "Introduction to cloud computing concepts and AWS services.", rating: 4.3, completions: 389 },
  { _id: "c011", title: "AWS Solutions Architect", category: "Cloud & IT", difficulty: "Intermediate", duration: "40 hours", skillsTaught: ["AWS Architecture", "Cloud Security", "Scalable Design"], prerequisites: ["c010"], tags: ["cloud", "aws", "architecture"], description: "Design resilient, high-performing cloud architectures on AWS.", rating: 4.5, completions: 198 },
  { _id: "c012", title: "DevOps & CI/CD Pipelines", category: "Cloud & IT", difficulty: "Advanced", duration: "35 hours", skillsTaught: ["DevOps", "CI/CD", "Docker", "Kubernetes"], prerequisites: ["c010", "c011"], tags: ["cloud", "devops", "automation"], description: "Build automated deployment pipelines with Docker and Kubernetes.", rating: 4.6, completions: 112 },
  { _id: "c013", title: "Cybersecurity Fundamentals", category: "Cybersecurity", difficulty: "Beginner", duration: "22 hours", skillsTaught: ["Security Awareness", "Threat Identification", "Risk Assessment"], prerequisites: [], tags: ["security", "cyber", "beginner"], description: "Understand the fundamentals of cybersecurity and threat landscapes.", rating: 4.2, completions: 267 },
  { _id: "c014", title: "Network Security & Ethical Hacking", category: "Cybersecurity", difficulty: "Intermediate", duration: "35 hours", skillsTaught: ["Network Security", "Penetration Testing", "Vulnerability Assessment"], prerequisites: ["c013"], tags: ["security", "hacking", "network"], description: "Learn network security principles and ethical hacking techniques.", rating: 4.4, completions: 145 },
  { _id: "c015", title: "Agile & Scrum Master Certification", category: "Project Management", difficulty: "Beginner", duration: "18 hours", skillsTaught: ["Agile Methodology", "Scrum Framework", "Sprint Planning"], prerequisites: [], tags: ["agile", "scrum", "management"], description: "Master Agile principles and the Scrum framework.", rating: 4.5, completions: 534 },
  { _id: "c016", title: "Project Management Professional (PMP)", category: "Project Management", difficulty: "Intermediate", duration: "40 hours", skillsTaught: ["Project Planning", "Risk Management", "Stakeholder Management"], prerequisites: ["c015"], tags: ["project", "management", "pmp"], description: "Prepare for PMP certification with comprehensive project management training.", rating: 4.3, completions: 289 },
  { _id: "c017", title: "Leadership & Change Management", category: "Leadership", difficulty: "Intermediate", duration: "25 hours", skillsTaught: ["Leadership", "Change Management", "Team Building"], prerequisites: [], tags: ["leadership", "management", "change"], description: "Develop leadership skills for driving organisational change.", rating: 4.4, completions: 312 },
  { _id: "c018", title: "Strategic Digital Transformation", category: "Leadership", difficulty: "Advanced", duration: "30 hours", skillsTaught: ["Digital Strategy", "Transformation Planning", "Innovation Management"], prerequisites: ["c017"], tags: ["leadership", "digital", "strategy"], description: "Lead digital transformation initiatives at the strategic level.", rating: 4.7, completions: 78 },
  { _id: "c019", title: "UX/UI Design Fundamentals", category: "Design", difficulty: "Beginner", duration: "28 hours", skillsTaught: ["UX Research", "UI Design", "Prototyping"], prerequisites: [], tags: ["design", "ux", "ui"], description: "Learn user-centred design principles and prototyping.", rating: 4.5, completions: 234 },
  { _id: "c020", title: "Design Thinking for Business", category: "Design", difficulty: "Intermediate", duration: "20 hours", skillsTaught: ["Design Thinking", "Innovation", "Problem Framing"], prerequisites: ["c019"], tags: ["design", "thinking", "innovation"], description: "Apply design thinking to solve complex business problems.", rating: 4.6, completions: 189 },
  { _id: "c021", title: "Power Apps Fundamentals", category: "Microsoft 365", difficulty: "Beginner", duration: "15 hours", skillsTaught: ["Power Apps", "Low-Code Development", "Business Apps"], prerequisites: [], tags: ["microsoft", "power", "lowcode"], description: "Build custom business applications with Microsoft Power Apps.", rating: 4.3, completions: 298 },
  { _id: "c022", title: "Power Automate & Workflow Automation", category: "Microsoft 365", difficulty: "Intermediate", duration: "20 hours", skillsTaught: ["Power Automate", "Workflow Automation", "Process Optimization"], prerequisites: ["c021"], tags: ["microsoft", "automation", "workflow"], description: "Automate business processes with Microsoft Power Automate.", rating: 4.4, completions: 176 },
  { _id: "c023", title: "Microsoft 365 Copilot for Business", category: "Microsoft 365", difficulty: "Intermediate", duration: "18 hours", skillsTaught: ["AI Tools", "Copilot", "Productivity"], prerequisites: ["c021", "c022"], tags: ["microsoft", "ai", "copilot"], description: "Leverage AI-powered Copilot tools across the Microsoft 365 suite.", rating: 4.8, completions: 89 },
  { _id: "c024", title: "RPA Basics with UiPath", category: "Automation", difficulty: "Beginner", duration: "22 hours", skillsTaught: ["RPA", "UiPath", "Process Automation"], prerequisites: [], tags: ["rpa", "automation", "uipath"], description: "Introduction to Robotic Process Automation using UiPath.", rating: 4.2, completions: 213 },
  { _id: "c025", title: "IoT Fundamentals", category: "Cloud & IT", difficulty: "Beginner", duration: "20 hours", skillsTaught: ["IoT Concepts", "Sensor Networks", "Edge Computing"], prerequisites: [], tags: ["iot", "technology", "sensors"], description: "Understand IoT architecture, sensors, and edge computing.", rating: 4.1, completions: 167 },
  { _id: "c026", title: "A/B Testing & Experimentation", category: "Digital Marketing", difficulty: "Intermediate", duration: "15 hours", skillsTaught: ["A/B Testing", "Experimentation", "Statistical Significance"], prerequisites: ["c001", "c005"], tags: ["marketing", "testing", "data"], description: "Design and analyse A/B tests for data-driven decisions.", rating: 4.5, completions: 143 },
  { _id: "c027", title: "Business Intelligence with Tableau", category: "Data Analytics", difficulty: "Intermediate", duration: "30 hours", skillsTaught: ["Tableau", "BI Dashboards", "Data Storytelling"], prerequisites: ["c005"], tags: ["data", "tableau", "bi"], description: "Create interactive BI dashboards and tell stories with data.", rating: 4.6, completions: 201 },
  { _id: "c028", title: "ITIL 4 Foundation", category: "Project Management", difficulty: "Beginner", duration: "20 hours", skillsTaught: ["ITIL", "Service Management", "IT Governance"], prerequisites: [], tags: ["itil", "it", "governance"], description: "Master IT service management with ITIL 4 framework.", rating: 4.1, completions: 345 },
  { _id: "c029", title: "AI for Business Leaders", category: "Leadership", difficulty: "Beginner", duration: "15 hours", skillsTaught: ["AI Literacy", "AI Strategy", "Ethical AI"], prerequisites: [], tags: ["ai", "leadership", "strategy"], description: "Understand AI capabilities and how to apply them strategically.", rating: 4.5, completions: 278 },
  { _id: "c030", title: "Lean Six Sigma Green Belt", category: "Project Management", difficulty: "Intermediate", duration: "35 hours", skillsTaught: ["Lean", "Six Sigma", "Process Improvement", "DMAIC"], prerequisites: [], tags: ["lean", "sixsigma", "quality"], description: "Apply Lean Six Sigma methodology to improve business processes.", rating: 4.4, completions: 189 },
];

const skills = [
  "SEO Basics", "Social Media Strategy", "Content Marketing", "Google Analytics", "Data Analysis",
  "Campaign Tracking", "Marketing Automation", "Email Marketing", "CRM Integration", "Advanced SEO",
  "Content Strategy", "Technical SEO", "Data Literacy", "Excel Advanced", "Basic Statistics",
  "SQL", "Database Querying", "Data Extraction", "Power BI", "Data Visualization",
  "Dashboard Design", "Python", "Pandas", "Data Wrangling", "Machine Learning",
  "Predictive Analytics", "Model Evaluation", "Cloud Concepts", "AWS Basics", "Cloud Architecture",
  "AWS Architecture", "Cloud Security", "Scalable Design", "DevOps", "CI/CD",
  "Docker", "Kubernetes", "Security Awareness", "Threat Identification", "Risk Assessment",
  "Network Security", "Penetration Testing", "Vulnerability Assessment", "Agile Methodology", "Scrum Framework",
  "Sprint Planning", "Project Planning", "Risk Management", "Stakeholder Management", "Leadership",
  "Change Management", "Team Building", "Digital Strategy", "Transformation Planning", "Innovation Management",
  "UX Research", "UI Design", "Prototyping", "Design Thinking", "Innovation",
  "Problem Framing", "Power Apps", "Low-Code Development", "Business Apps", "Power Automate",
  "Workflow Automation", "Process Optimization", "AI Tools", "Copilot", "Productivity",
  "RPA", "UiPath", "Process Automation", "IoT Concepts", "Sensor Networks",
  "Edge Computing", "A/B Testing", "Experimentation", "Statistical Significance", "Tableau",
  "BI Dashboards", "Data Storytelling", "ITIL", "Service Management", "IT Governance",
  "AI Literacy", "AI Strategy", "Ethical AI", "Lean", "Six Sigma", "Process Improvement", "DMAIC"
];

const learners = [
  {
    _id: "l001", name: "Maria Garcia", email: "maria@example.com", role: "student",
    currentRole: "Junior Marketing Specialist", industry: "Retail", experienceYears: 3,
    targetRole: "Data-Driven Marketing Manager", motivation: "upskill",
    currentSkills: ["SEO Basics", "Social Media Strategy", "Content Marketing", "Email Marketing"],
    completedCourses: [
      { courseId: "c001", completedAt: "2025-09-15", score: 88, rating: 5 },
      { courseId: "c003", completedAt: "2025-12-01", score: 82, rating: 4 },
      { courseId: "c005", completedAt: "2026-02-20", score: 91, rating: 5 },
    ],
    goalSkills: ["Google Analytics", "Data Analysis", "A/B Testing", "Marketing Automation", "Data Visualization"],
  },
  {
    _id: "l002", name: "James Chen", email: "james@example.com", role: "student",
    currentRole: "IT Support Specialist", industry: "Technology", experienceYears: 5,
    targetRole: "Cloud Solutions Architect", motivation: "reskill",
    currentSkills: ["Security Awareness", "ITIL", "Service Management"],
    completedCourses: [
      { courseId: "c013", completedAt: "2025-08-10", score: 79, rating: 4 },
      { courseId: "c028", completedAt: "2025-10-22", score: 85, rating: 3 },
      { courseId: "c010", completedAt: "2026-01-15", score: 92, rating: 5 },
    ],
    goalSkills: ["AWS Architecture", "Cloud Security", "Scalable Design", "DevOps", "CI/CD"],
  },
  {
    _id: "l003", name: "Ana Fernandez", email: "ana@example.com", role: "student",
    currentRole: "Operations Coordinator", industry: "Manufacturing", experienceYears: 7,
    targetRole: "Process Automation Lead", motivation: "upskill",
    currentSkills: ["Lean", "Six Sigma", "Process Improvement", "DMAIC"],
    completedCourses: [
      { courseId: "c030", completedAt: "2025-07-05", score: 94, rating: 5 },
      { courseId: "c015", completedAt: "2025-11-18", score: 87, rating: 4 },
      { courseId: "c024", completedAt: "2026-03-10", score: 90, rating: 5 },
    ],
    goalSkills: ["RPA", "Power Automate", "Workflow Automation", "IoT Concepts", "Power Apps"],
  },
  {
    _id: "l004", name: "Liam O'Brien", email: "liam@example.com", role: "student",
    currentRole: "Graduate / Career Changer", industry: "Hospitality", experienceYears: 1,
    targetRole: "Data Analyst", motivation: "reskill",
    currentSkills: ["Excel Advanced"],
    completedCourses: [
      { courseId: "c005", completedAt: "2026-04-01", score: 76, rating: 4 },
    ],
    goalSkills: ["SQL", "Data Visualization", "Power BI", "Python", "Basic Statistics"],
  },
  {
    _id: "l005", name: "Sophie Laurent", email: "sophie@example.com", role: "student",
    currentRole: "Project Manager", industry: "Financial Services", experienceYears: 10,
    targetRole: "Head of Digital Transformation", motivation: "upskill",
    currentSkills: ["Project Planning", "Risk Management", "Stakeholder Management", "Agile Methodology", "Scrum Framework", "Leadership"],
    completedCourses: [
      { courseId: "c015", completedAt: "2025-03-12", score: 96, rating: 5 },
      { courseId: "c016", completedAt: "2025-06-30", score: 93, rating: 5 },
      { courseId: "c017", completedAt: "2025-09-20", score: 91, rating: 4 },
      { courseId: "c029", completedAt: "2026-01-08", score: 88, rating: 5 },
      { courseId: "c005", completedAt: "2026-04-15", score: 84, rating: 4 },
    ],
    goalSkills: ["Digital Strategy", "Transformation Planning", "Innovation Management", "AI Strategy", "Data Literacy"],
  },
];

const companies = [
  {
    _id: "comp001", name: "TechFabrik GmbH", industry: "Manufacturing", size: 180,
    contactPerson: "Klaus Weber", contactRole: "Head of L&D",
    goals: ["Industry 4.0 Transformation", "Data-Driven Operations", "Process Automation"],
    budget: "€120,000", timeline: "12 months",
    departments: [
      {
        name: "Operations", employeeCount: 45,
        targetSkills: ["IoT Concepts", "RPA", "Data Literacy", "Power BI", "Lean"],
        employees: [
          { name: "Hans Mueller", role: "Floor Supervisor", skills: ["Lean", "Six Sigma"] },
          { name: "Eva Schmidt", role: "Quality Inspector", skills: ["Six Sigma", "Process Improvement"] },
          { name: "Thomas Braun", role: "Operations Analyst", skills: ["Excel Advanced", "Data Literacy", "Lean"] },
          { name: "Petra Keller", role: "Line Manager", skills: ["Leadership", "Lean"] },
          { name: "Stefan Wolf", role: "Process Engineer", skills: ["Lean", "Six Sigma", "DMAIC"] },
        ],
        skillGaps: { "IoT Concepts": { lacking: 42, total: 45 }, "RPA": { lacking: 40, total: 45 }, "Data Literacy": { lacking: 30, total: 45 }, "Power BI": { lacking: 43, total: 45 }, "Lean": { lacking: 10, total: 45 } }
      },
      {
        name: "IT", employeeCount: 25,
        targetSkills: ["Cloud Concepts", "AWS Basics", "DevOps", "Cybersecurity Fundamentals", "IoT Concepts"],
        employees: [
          { name: "Martin Fischer", role: "IT Manager", skills: ["Cloud Concepts", "Security Awareness", "ITIL"] },
          { name: "Anna Bauer", role: "System Admin", skills: ["Security Awareness", "ITIL", "Service Management"] },
          { name: "Felix Richter", role: "Network Engineer", skills: ["Network Security", "Security Awareness"] },
        ],
        skillGaps: { "Cloud Concepts": { lacking: 18, total: 25 }, "AWS Basics": { lacking: 22, total: 25 }, "DevOps": { lacking: 24, total: 25 }, "Security Awareness": { lacking: 8, total: 25 }, "IoT Concepts": { lacking: 20, total: 25 } }
      },
      {
        name: "Marketing & Sales", employeeCount: 30,
        targetSkills: ["Data Analysis", "Google Analytics", "Marketing Automation", "CRM Integration", "A/B Testing"],
        employees: [
          { name: "Lisa Wagner", role: "Marketing Lead", skills: ["SEO Basics", "Social Media Strategy", "Content Marketing"] },
          { name: "Max Hoffman", role: "Sales Manager", skills: ["CRM Integration", "Stakeholder Management"] },
          { name: "Julia Klein", role: "Digital Marketing Specialist", skills: ["SEO Basics", "Social Media Strategy", "Email Marketing"] },
        ],
        skillGaps: { "Data Analysis": { lacking: 25, total: 30 }, "Google Analytics": { lacking: 27, total: 30 }, "Marketing Automation": { lacking: 28, total: 30 }, "CRM Integration": { lacking: 20, total: 30 }, "A/B Testing": { lacking: 30, total: 30 } }
      },
      {
        name: "Management", employeeCount: 15,
        targetSkills: ["Digital Strategy", "AI Literacy", "Change Management", "Data Literacy", "Agile Methodology"],
        employees: [
          { name: "Friedrich Schulz", role: "CEO", skills: ["Leadership", "Stakeholder Management"] },
          { name: "Ingrid Zimmerman", role: "COO", skills: ["Leadership", "Lean", "Change Management"] },
          { name: "Klaus Weber", role: "Head of L&D", skills: ["Leadership", "Change Management", "Team Building"] },
        ],
        skillGaps: { "Digital Strategy": { lacking: 13, total: 15 }, "AI Literacy": { lacking: 14, total: 15 }, "Change Management": { lacking: 8, total: 15 }, "Data Literacy": { lacking: 12, total: 15 }, "Agile Methodology": { lacking: 11, total: 15 } }
      }
    ],
    trainingPlan: {
      phases: [
        { phase: 1, title: "Foundation (Month 1–3)", departments: ["IT", "Management"], programmes: ["Cloud Computing Fundamentals", "AI for Business Leaders", "Leadership & Change Management"], description: "Start with IT (cloud foundation for Industry 4.0) and Management (strategic alignment and AI literacy)." },
        { phase: 2, title: "Core Skills (Month 3–6)", departments: ["Operations", "Marketing & Sales"], programmes: ["IoT Fundamentals", "RPA Basics with UiPath", "Data Analytics Fundamentals", "Digital Marketing Fundamentals"], description: "Train the largest departments on their primary skill gaps. Operations focuses on IoT and automation; Marketing on data-driven approaches." },
        { phase: 3, title: "Integration (Month 6–9)", departments: ["Operations", "IT", "Marketing & Sales"], programmes: ["Data Visualization with Power BI", "Google Analytics & Data-Driven Marketing", "DevOps & CI/CD Pipelines"], description: "Connect the dots: Operations learns to visualise their IoT data, Marketing masters analytics, IT builds deployment pipelines." },
        { phase: 4, title: "Advanced (Month 9–12)", departments: ["All"], programmes: ["Strategic Digital Transformation", "Marketing Automation with HubSpot", "Power Automate & Workflow Automation"], description: "Advanced specialisation and cross-departmental integration. Leaders drive transformation with data from all departments." },
      ]
    }
  },
  {
    _id: "comp002", name: "Basque Financial Group", industry: "Financial Services", size: 320,
    contactPerson: "Miren Etxebarria", contactRole: "CHRO",
    goals: ["Data-Driven Culture", "Regulatory Compliance", "Client Digital Experience"],
    budget: "€200,000", timeline: "18 months",
    departments: [
      {
        name: "Risk & Compliance", employeeCount: 40,
        targetSkills: ["Data Analysis", "Python", "Security Awareness", "Risk Management", "SQL"],
        employees: [],
        skillGaps: { "Data Analysis": { lacking: 32, total: 40 }, "Python": { lacking: 38, total: 40 }, "Security Awareness": { lacking: 15, total: 40 }, "Risk Management": { lacking: 10, total: 40 }, "SQL": { lacking: 35, total: 40 } }
      },
      {
        name: "Client Services", employeeCount: 85,
        targetSkills: ["CRM Integration", "Data Literacy", "UX Research", "AI Tools", "Digital Strategy"],
        employees: [],
        skillGaps: { "CRM Integration": { lacking: 70, total: 85 }, "Data Literacy": { lacking: 60, total: 85 }, "UX Research": { lacking: 80, total: 85 }, "AI Tools": { lacking: 82, total: 85 }, "Digital Strategy": { lacking: 75, total: 85 } }
      },
      {
        name: "Technology", employeeCount: 50,
        targetSkills: ["Cloud Concepts", "DevOps", "AWS Architecture", "Cybersecurity Fundamentals", "Machine Learning"],
        employees: [],
        skillGaps: { "Cloud Concepts": { lacking: 20, total: 50 }, "DevOps": { lacking: 35, total: 50 }, "AWS Architecture": { lacking: 40, total: 50 }, "Network Security": { lacking: 25, total: 50 }, "Machine Learning": { lacking: 45, total: 50 } }
      }
    ],
    trainingPlan: {
      phases: [
        { phase: 1, title: "Foundation (Month 1–4)", departments: ["Technology", "Risk & Compliance"], programmes: ["Cloud Computing Fundamentals", "Data Analytics Fundamentals", "Cybersecurity Fundamentals"], description: "Build technical and data foundations in the most critical departments." },
        { phase: 2, title: "Data Capability (Month 4–8)", departments: ["Risk & Compliance", "Client Services"], programmes: ["SQL for Data Analysis", "Python for Data Science", "UX/UI Design Fundamentals"], description: "Build data querying and analysis skills across the organisation." },
        { phase: 3, title: "Digital Experience (Month 8–14)", departments: ["Client Services", "Technology"], programmes: ["AI for Business Leaders", "Marketing Automation with HubSpot", "AWS Solutions Architect"], description: "Transform client-facing operations with AI and digital tools." },
        { phase: 4, title: "Advanced (Month 14–18)", departments: ["All"], programmes: ["Machine Learning Essentials", "Strategic Digital Transformation", "Design Thinking for Business"], description: "Advanced capabilities and strategic alignment across the group." },
      ]
    }
  }
];

const feedbackData = [
  { courseId: "c001", learnerId: "l001", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "More real-world case studies would help", impactScore: 92 },
  { courseId: "c003", learnerId: "l001", relevance: 4, applied: true, appliedWithin30Days: false, suggestion: "Needs more hands-on exercises", impactScore: 78 },
  { courseId: "c005", learnerId: "l001", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "", impactScore: 95 },
  { courseId: "c013", learnerId: "l002", relevance: 3, applied: false, appliedWithin30Days: false, suggestion: "Too theoretical, needs practical labs", impactScore: 45 },
  { courseId: "c010", learnerId: "l002", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "Excellent course, very practical", impactScore: 96 },
  { courseId: "c030", learnerId: "l003", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "", impactScore: 98 },
  { courseId: "c015", learnerId: "l003", relevance: 4, applied: true, appliedWithin30Days: true, suggestion: "Would benefit from industry-specific examples", impactScore: 85 },
  { courseId: "c005", learnerId: "l004", relevance: 4, applied: true, appliedWithin30Days: false, suggestion: "Pace was a bit fast for complete beginners", impactScore: 72 },
  { courseId: "c015", learnerId: "l005", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "", impactScore: 97 },
  { courseId: "c016", learnerId: "l005", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "Best course I have taken", impactScore: 98 },
  { courseId: "c017", learnerId: "l005", relevance: 4, applied: true, appliedWithin30Days: true, suggestion: "Could use more change management frameworks", impactScore: 88 },
  { courseId: "c029", learnerId: "l005", relevance: 5, applied: true, appliedWithin30Days: true, suggestion: "Eye-opening for AI strategy", impactScore: 94 },
];

const recommendations = {
  l001: [
    { courseId: "c002", score: 92, reason: "Fills your Google Analytics gap. 85% of marketers who completed Digital Marketing Fundamentals took this next.", technique: "skill_gap + collaborative" },
    { courseId: "c026", score: 87, reason: "A/B Testing is a key gap for your Data-Driven Marketing Manager goal. This builds on your data analytics foundation.", technique: "skill_gap + content" },
    { courseId: "c007", score: 81, reason: "Power BI skills will help you visualise marketing campaign data. Popular among marketers transitioning to data-driven roles.", technique: "content + collaborative" },
  ],
  l002: [
    { courseId: "c011", score: 95, reason: "Direct path to your Cloud Solutions Architect goal. You've already completed Cloud Fundamentals with a 92% score — you're ready.", technique: "skill_gap + sequence" },
    { courseId: "c014", score: 78, reason: "Deepens your security knowledge alongside cloud architecture. 68% of cloud architects also have security certifications.", technique: "content + collaborative" },
    { courseId: "c012", score: 72, reason: "DevOps skills are essential for modern cloud architecture. Best taken after AWS Solutions Architect.", technique: "skill_gap + sequence" },
  ],
  l003: [
    { courseId: "c021", score: 89, reason: "Power Apps complements your RPA skills. 90% of automation leads in manufacturing use Power Platform.", technique: "skill_gap + collaborative" },
    { courseId: "c022", score: 86, reason: "Power Automate is the natural next step after Power Apps. Together they cover end-to-end process automation.", technique: "sequence + skill_gap" },
    { courseId: "c025", score: 80, reason: "IoT fundamentals will connect your automation skills to Industry 4.0 sensor data.", technique: "skill_gap + content" },
  ],
  l004: [
    { courseId: "c006", score: 94, reason: "SQL is the #1 most-requested skill for Data Analysts. This is your highest-priority gap.", technique: "skill_gap" },
    { courseId: "c007", score: 88, reason: "Power BI is the most common visualisation tool in your target role. 78% of Data Analysts in the Basque region use it.", technique: "skill_gap + collaborative" },
    { courseId: "c027", score: 75, reason: "Tableau is an alternative to Power BI — having both on your CV makes you more versatile.", technique: "content" },
  ],
  l005: [
    { courseId: "c018", score: 96, reason: "Strategic Digital Transformation is the capstone for your Head of Digital Transformation goal. You have all prerequisites.", technique: "skill_gap + sequence" },
    { courseId: "c020", score: 82, reason: "Design Thinking complements your leadership and strategy skills with innovation methodology.", technique: "content + skill_gap" },
    { courseId: "c007", score: 74, reason: "Data Visualization will help you communicate transformation progress to stakeholders — a key leadership skill.", technique: "content + collaborative" },
  ],
};

const platformAnalytics = {
  totalLearners: 1247,
  totalCompanies: 38,
  totalCourses: 30,
  avgCompletionRate: 78,
  avgSatisfaction: 4.4,
  monthlyActiveUsers: 834,
  completionsByMonth: [
    { month: "Oct 2025", completions: 89 },
    { month: "Nov 2025", completions: 112 },
    { month: "Dec 2025", completions: 78 },
    { month: "Jan 2026", completions: 134 },
    { month: "Feb 2026", completions: 156 },
    { month: "Mar 2026", completions: 178 },
    { month: "Apr 2026", completions: 201 },
    { month: "May 2026", completions: 189 },
    { month: "Jun 2026", completions: 223 },
  ],
  topCourses: [
    { courseId: "c015", title: "Agile & Scrum Master", completions: 534, rating: 4.5 },
    { courseId: "c005", title: "Data Analytics Fundamentals", completions: 456, rating: 4.4 },
    { courseId: "c010", title: "Cloud Computing Fundamentals", completions: 389, rating: 4.3 },
    { courseId: "c013", title: "Cybersecurity Fundamentals", completions: 267, rating: 4.2 },
    { courseId: "c001", title: "Digital Marketing Fundamentals", completions: 342, rating: 4.5 },
  ],
  dropoutRiskCourses: [
    { courseId: "c009", title: "Machine Learning Essentials", dropoutRate: 38, reason: "High difficulty + weak prerequisites" },
    { courseId: "c012", title: "DevOps & CI/CD Pipelines", dropoutRate: 29, reason: "Requires strong cloud foundation" },
    { courseId: "c008", title: "Python for Data Science", dropoutRate: 25, reason: "Programming barrier for non-tech learners" },
  ],
  categoryDistribution: [
    { category: "Data Analytics", percentage: 28 },
    { category: "Digital Marketing", percentage: 18 },
    { category: "Cloud & IT", percentage: 16 },
    { category: "Project Management", percentage: 14 },
    { category: "Leadership", percentage: 10 },
    { category: "Cybersecurity", percentage: 6 },
    { category: "Design", percentage: 4 },
    { category: "Microsoft 365", percentage: 3 },
    { category: "Automation", percentage: 1 },
  ],
};

export { courses, skills, learners, companies, feedbackData, recommendations, platformAnalytics };
