import React, { useState } from 'react';
import { courses, platformAnalytics, feedbackData, learners, companies } from '../../data/seedData';
import { LogOut, BarChart3, BookOpen, MessageSquare, Users, TrendingUp, AlertTriangle, Star, ThumbsUp, ThumbsDown, Clock, Eye, ShieldAlert, ArrowLeft } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import LearnerDashboard from '../learner/LearnerDashboard';
import CompanyDashboard from '../company/CompanyDashboard';

const tabs = ['Analytics', 'Course Catalogue', 'Feedback Loop', 'Users & Companies'];
const PIE_COLORS = ['#2563eb', '#0d9488', '#7c3aed', '#dc2626', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];

export default function AdminDashboard({ user, onLogout, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('Analytics');
  const [impersonating, setImpersonating] = useState(null);
  const analytics = platformAnalytics;

  // Render impersonated dashboard with admin banner
  if (impersonating) {
    const iUser = impersonating.type === 'learner'
      ? { ...impersonating.data, role: 'student' }
      : { ...impersonating.data, role: 'company' };

    return (
      <div>
        {/* Admin mode banner */}
        <div className="bg-purple-700 text-white px-6 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-purple-300" />
            <span className="text-sm">
              <span className="text-purple-300">Admin view —</span>{' '}
              <span className="font-semibold">viewing as {impersonating.data.name}</span>{' '}
              <span className="text-purple-300 text-xs">({impersonating.type === 'learner' ? 'Learner' : 'Company'})</span>
            </span>
          </div>
          <button
            onClick={() => setImpersonating(null)}
            className="flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin
          </button>
        </div>

        {impersonating.type === 'learner'
          ? <LearnerDashboard user={iUser} onLogout={() => setImpersonating(null)} onUpdateUser={() => {}} />
          : <CompanyDashboard user={iUser} onLogout={() => setImpersonating(null)} onUpdateUser={() => {}} />
        }
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">C2B</span></div>
            <span className="font-bold text-gray-900">PathFinder</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right"><p className="text-sm font-medium text-gray-900">{user.name}</p><p className="text-xs text-gray-500">Platform Administrator</p></div>
            <button onClick={onLogout} className="text-gray-400 hover:text-gray-600"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === t ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'Analytics' && <AnalyticsView analytics={analytics} />}
        {activeTab === 'Course Catalogue' && <CatalogueView />}
        {activeTab === 'Feedback Loop' && <FeedbackView />}
        {activeTab === 'Users & Companies' && <UsersView onImpersonate={setImpersonating} />}
      </main>
    </div>
  );
}

function AnalyticsView({ analytics }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-1">Platform Analytics</h1>
        <p className="text-purple-200">C2B PathFinder performance overview</p>
        <div className="flex items-center gap-8 mt-6">
          <div><p className="text-3xl font-bold">{analytics.totalLearners.toLocaleString()}</p><p className="text-purple-200 text-sm">Total learners</p></div>
          <div className="w-px h-12 bg-purple-400/30" />
          <div><p className="text-3xl font-bold">{analytics.totalCompanies}</p><p className="text-purple-200 text-sm">Companies</p></div>
          <div className="w-px h-12 bg-purple-400/30" />
          <div><p className="text-3xl font-bold">{analytics.totalCourses}</p><p className="text-purple-200 text-sm">Courses</p></div>
          <div className="w-px h-12 bg-purple-400/30" />
          <div><p className="text-3xl font-bold">{analytics.avgCompletionRate}%</p><p className="text-purple-200 text-sm">Avg completion</p></div>
          <div className="w-px h-12 bg-purple-400/30" />
          <div><p className="text-3xl font-bold">{analytics.avgSatisfaction}</p><p className="text-purple-200 text-sm">Avg rating</p></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Completions trend */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-600" /> Course completions trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analytics.completionsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="completions" stroke="#7c3aed" strokeWidth={3} dot={{ fill: '#7c3aed', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-600" /> By category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={analytics.categoryDistribution} dataKey="percentage" nameKey="category" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                {analytics.categoryDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {analytics.categoryDistribution.slice(0, 5).map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} /><span className="text-gray-600">{c.category}</span></div>
                <span className="font-medium text-gray-900">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top courses */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-amber-500" /> Top courses</h2>
          <div className="space-y-3">
            {analytics.topCourses.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">#{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.completions} completions</p>
                </div>
                <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="text-sm font-medium">{c.rating}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Dropout risks */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> Dropout risk alerts</h2>
          <div className="space-y-3">
            {analytics.dropoutRiskCourses.map((c, i) => (
              <div key={i} className="p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{c.title}</p>
                  <span className="text-sm font-bold text-red-600">{c.dropoutRate}% dropout</span>
                </div>
                <p className="text-xs text-red-600 mt-1">{c.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogueView() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || c.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Course Catalogue</h1><p className="text-gray-500 mt-1">{courses.length} courses across {new Set(courses.map(c => c.category)).size} categories</p></div>
      </div>
      <div className="flex gap-4">
        <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 text-left">
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Course</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Difficulty</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Completions</th>
          </tr></thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c._id} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-5 py-3">
                  <p className="text-sm font-medium text-gray-900">{c.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.skillsTaught.slice(0, 3).join(', ')}</p>
                </td>
                <td className="px-5 py-3"><span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md">{c.category}</span></td>
                <td className="px-5 py-3"><span className={`text-xs px-2 py-1 rounded-md ${c.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' : c.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>{c.difficulty}</span></td>
                <td className="px-5 py-3 text-sm text-gray-600">{c.duration}</td>
                <td className="px-5 py-3"><div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="text-sm font-medium">{c.rating}</span></div></td>
                <td className="px-5 py-3 text-sm text-gray-600">{c.completions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeedbackView() {
  const avgImpact = Math.round(feedbackData.reduce((a, f) => a + f.impactScore, 0) / feedbackData.length);
  const appliedRate = Math.round((feedbackData.filter(f => f.applied).length / feedbackData.length) * 100);
  const applied30 = Math.round((feedbackData.filter(f => f.appliedWithin30Days).length / feedbackData.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback Loop Engine</h1>
        <p className="text-gray-500 mt-1">Post-course feedback that makes the recommendation system smarter over time</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-purple-600">{avgImpact}</p><p className="text-sm text-gray-500 mt-1">Avg impact score</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{appliedRate}%</p><p className="text-sm text-gray-500 mt-1">On-the-job application rate</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-blue-600">{applied30}%</p><p className="text-sm text-gray-500 mt-1">Applied within 30 days</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-purple-600" /> Recent feedback responses</h2>
        <div className="space-y-3">
          {feedbackData.map((f, i) => {
            const course = courses.find(c => c._id === f.courseId);
            const learner = learners.find(l => l._id === f.learnerId);
            return (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.impactScore >= 80 ? 'bg-green-100' : f.impactScore >= 50 ? 'bg-amber-100' : 'bg-red-100'}`}>
                  {f.impactScore >= 80 ? <ThumbsUp className="w-5 h-5 text-green-600" /> : f.impactScore >= 50 ? <Clock className="w-5 h-5 text-amber-600" /> : <ThumbsDown className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{learner?.name} on "{course?.title}"</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${f.impactScore >= 80 ? 'bg-green-100 text-green-700' : f.impactScore >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      Impact: {f.impactScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>Relevance: {f.relevance}/5</span>
                    <span>Applied on job: {f.applied ? 'Yes' : 'No'}</span>
                    <span>Within 30 days: {f.appliedWithin30Days ? 'Yes' : 'No'}</span>
                  </div>
                  {f.suggestion && <p className="text-sm text-gray-600 mt-2 italic">"{f.suggestion}"</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How feedback improves recommendations */}
      <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
        <h3 className="font-semibold text-purple-900 mb-3">How this data improves recommendations</h3>
        <div className="grid grid-cols-3 gap-4 text-sm text-purple-800">
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <p className="font-medium">Low-impact courses flagged</p>
            <p className="text-xs text-purple-600 mt-1">Courses with impact &lt;50 for specific profiles are deprioritised in future recommendations</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <p className="font-medium">Application rate by role</p>
            <p className="text-xs text-purple-600 mt-1">If marketers don't apply a course but engineers do, it's recommended differently per role</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <p className="font-medium">Curriculum intelligence</p>
            <p className="text-xs text-purple-600 mt-1">Learner suggestions surface gaps in C2B's catalogue — informing new course development</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersView({ onImpersonate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Companies</h1>
          <p className="text-gray-500 mt-1">Click <span className="font-medium text-purple-600">View as</span> to open any profile exactly as that user sees it</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 text-sm text-purple-700">
          <ShieldAlert className="w-4 h-4" />
          <span>Admin impersonation mode</span>
        </div>
      </div>

      {/* Learners */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" /> Learners
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium ml-1">{learners.length} profiles</span>
        </h2>
        <div className="space-y-3">
          {learners.map(l => (
            <div key={l._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50/50 transition-colors group">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {l.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{l.name}</p>
                <p className="text-xs text-gray-500 truncate">{l.currentRole} → {l.targetRole}</p>
                <p className="text-xs text-gray-400">{l.industry} • {l.experienceYears}y exp</p>
              </div>
              <div className="text-right mr-4">
                <p className="text-sm font-medium text-gray-900">{l.completedCourses.length} courses</p>
                <p className="text-xs text-gray-500">{l.currentSkills.length} skills</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${l.motivation === 'upskill' ? 'bg-blue-100 text-blue-600' : 'bg-violet-100 text-violet-600'}`}>
                  {l.motivation === 'upskill' ? 'Upskilling' : 'Reskilling'}
                </span>
              </div>
              <button
                onClick={() => onImpersonate({ type: 'learner', data: l })}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
              >
                <Eye className="w-3.5 h-3.5" /> View as
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Companies */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" /> Companies
          <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium ml-1">{companies.length} profiles</span>
        </h2>
        <div className="space-y-3">
          {companies.map(c => (
            <div key={c._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50/50 transition-colors group">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{c.name}</p>
                <p className="text-xs text-gray-500">{c.industry} • {c.size} employees • {c.departments.length} departments</p>
                <p className="text-xs text-gray-400">{c.contactPerson} ({c.contactRole})</p>
              </div>
              <div className="text-right mr-4">
                <p className="text-xs font-medium text-gray-700">{c.budget}</p>
                <p className="text-xs text-gray-500">{c.timeline}</p>
                <p className="text-xs text-gray-400">{c.goals.length} goals</p>
              </div>
              <button
                onClick={() => onImpersonate({ type: 'company', data: c })}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
              >
                <Eye className="w-3.5 h-3.5" /> View as
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
