import React, { useState } from 'react';
import { courses, recommendations as allRecs, skills as allSkills } from '../../data/seedData';
import { LogOut, BookOpen, Target, TrendingUp, Award, Sparkles, ChevronRight, Star, CheckCircle2, Circle, ArrowRight, Brain, Users, BarChart3, Clock, X, Save, User, Briefcase, MapPin, Calendar } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const tabs = ['Passport', 'Recommendations', 'Learning Path', 'Skills'];

export default function LearnerDashboard({ user, onLogout, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('Passport');
  const [showProfile, setShowProfile] = useState(false);
  const recs = allRecs[user._id] || [];
  const completedCourseData = (user.completedCourses || []).map(cc => {
    const course = courses.find(c => c._id === cc.courseId);
    return { ...cc, course };
  });

  // Skill progress
  const acquiredSkills = new Set(user.currentSkills);
  completedCourseData.forEach(cc => { if (cc.course) cc.course.skillsTaught.forEach(s => acquiredSkills.add(s)); });
  const allGoalSkills = user.goalSkills || [];
  const skillProgress = allGoalSkills.map(s => ({ skill: s, acquired: acquiredSkills.has(s) }));
  const progressPct = allGoalSkills.length > 0 ? Math.round((skillProgress.filter(s => s.acquired).length / allGoalSkills.length) * 100) : 0;

  // Radar data
  const categories = [...new Set(courses.map(c => c.category))].slice(0, 6);
  const radarData = categories.map(cat => {
    const catCourses = completedCourseData.filter(cc => cc.course?.category === cat);
    return { category: cat.split(' ')[0], score: catCourses.length > 0 ? Math.round(catCourses.reduce((a, b) => a + b.score, 0) / catCourses.length) : 0 };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">C2B</span></div>
            <span className="font-bold text-gray-900">PathFinder</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Learner</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right"><p className="text-sm font-medium text-gray-900">{user.name}</p><p className="text-xs text-gray-500">{user.currentRole}</p></div>
            <button
              onClick={() => setShowProfile(true)}
              className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs hover:bg-blue-700 hover:ring-2 hover:ring-blue-300 transition-all"
              title="Profile settings"
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </button>
            <button onClick={onLogout} className="text-gray-400 hover:text-gray-600"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* Profile settings panel */}
      {showProfile && (
        <ProfilePanel user={user} onClose={() => setShowProfile(false)} onSave={(updated) => { onUpdateUser(updated); setShowProfile(false); }} />
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'Passport' && <PassportView user={user} completedCourseData={completedCourseData} progressPct={progressPct} radarData={radarData} acquiredSkills={acquiredSkills} />}
        {activeTab === 'Recommendations' && <RecommendationsView recs={recs} courses={courses} user={user} />}
        {activeTab === 'Learning Path' && <LearningPathView user={user} completedCourseData={completedCourseData} recs={recs} courses={courses} />}
        {activeTab === 'Skills' && <SkillsView user={user} skillProgress={skillProgress} acquiredSkills={acquiredSkills} progressPct={progressPct} />}
      </main>
    </div>
  );
}

function PassportView({ user, completedCourseData, progressPct, radarData, acquiredSkills }) {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="text-blue-200">Your Learning Passport — a living record of your journey</p>
            <div className="flex items-center gap-6 mt-6">
              <div><p className="text-3xl font-bold">{completedCourseData.length}</p><p className="text-blue-200 text-sm">Courses completed</p></div>
              <div className="w-px h-12 bg-blue-400/30" />
              <div><p className="text-3xl font-bold">{acquiredSkills.size}</p><p className="text-blue-200 text-sm">Skills acquired</p></div>
              <div className="w-px h-12 bg-blue-400/30" />
              <div><p className="text-3xl font-bold">{progressPct}%</p><p className="text-blue-200 text-sm">Goal progress</p></div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Target role</p>
            <p className="text-lg font-semibold">{user.targetRole}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">{user.motivation === 'upskill' ? '↑ Upskilling' : '↔ Reskilling'}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-blue-200 mb-1"><span>Progress toward {user.targetRole}</span><span>{progressPct}%</span></div>
          <div className="h-2.5 bg-blue-900/40 rounded-full"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} /></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Completed courses */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" /> Course History</h2>
          <div className="space-y-3">
            {completedCourseData.map((cc, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{cc.course?.title}</h3>
                  <p className="text-xs text-gray-500">{cc.course?.category} • {cc.course?.difficulty} • Completed {new Date(cc.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{cc.score}%</p>
                  <div className="flex gap-0.5">{Array(5).fill(0).map((_, j) => <Star key={j} className={`w-3 h-3 ${j < cc.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill radar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-600" /> Skill Profile</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase">Skills acquired</p>
            <div className="flex flex-wrap gap-1.5">
              {[...acquiredSkills].slice(0, 8).map(s => (
                <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{s}</span>
              ))}
              {acquiredSkills.size > 8 && <span className="text-xs text-gray-400">+{acquiredSkills.size - 8} more</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationsView({ recs, courses, user }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
        <p className="text-gray-500 mt-1">Personalised for your goal: <span className="font-medium text-gray-700">{user.targetRole}</span></p>
      </div>
      <div className="space-y-4">
        {recs.map((rec, i) => {
          const course = courses.find(c => c._id === rec.courseId);
          if (!course) return null;
          const techIcons = { skill_gap: Target, collaborative: Users, content: BookOpen, sequence: ArrowRight };
          const techniques = rec.technique.split(' + ').map(t => t.trim());
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-indigo-600' : 'bg-violet-600'}`}>
                    #{i + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{course.category} • {course.difficulty} • {course.duration}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">{rec.score}% match</span>
                    </div>
                  </div>
                  {/* AI Explanation */}
                  <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Why we recommend this</p>
                        <p className="text-sm text-blue-700 mt-1">{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                  {/* Techniques used */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400">AI techniques:</span>
                    {techniques.map((t, j) => (
                      <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{t.replace('_', ' ')}</span>
                    ))}
                  </div>
                  {/* Skills this fills */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Skills you'll gain:</span>
                    {course.skillsTaught.slice(0, 3).map(s => (
                      <span key={s} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LearningPathView({ user, completedCourseData, recs, courses }) {
  const recCourses = recs.map(r => courses.find(c => c._id === r.courseId)).filter(Boolean);
  // Future courses based on prerequisites of recommended courses
  const futureCourses = [];
  recCourses.forEach(rc => {
    const nextIds = courses.filter(c => c.prerequisites.includes(rc._id) && !completedCourseData.some(cc => cc.courseId === c._id)).slice(0, 1);
    futureCourses.push(...nextIds);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Learning Path</h1>
        <p className="text-gray-500 mt-1">From <span className="font-medium text-gray-700">{user.currentRole}</span> to <span className="font-medium text-gray-700">{user.targetRole}</span></p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="relative">
          {/* Completed */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Completed</p>
          {completedCourseData.map((cc, i) => (
            <div key={i} className="flex items-center gap-4 mb-1">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                {(i < completedCourseData.length - 1 || recCourses.length > 0) && <div className="w-0.5 h-10 bg-green-300" />}
              </div>
              <div className="flex-1 py-2">
                <p className="font-medium text-gray-900">{cc.course?.title}</p>
                <p className="text-xs text-gray-500">{cc.course?.category} • Score: {cc.score}%</p>
              </div>
            </div>
          ))}

          {/* Recommended (current) */}
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4 mt-4">Recommended next</p>
          {recCourses.map((rc, i) => (
            <div key={i} className="flex items-center gap-4 mb-1">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ring-4 ring-blue-100"><Sparkles className="w-4 h-4 text-white" /></div>
                {(i < recCourses.length - 1 || futureCourses.length > 0) && <div className="w-0.5 h-10 bg-blue-200 border-l-2 border-dashed border-blue-300" />}
              </div>
              <div className="flex-1 py-2 bg-blue-50 rounded-xl px-4">
                <p className="font-medium text-blue-900">{rc.title}</p>
                <p className="text-xs text-blue-600">{rc.category} • {rc.difficulty} • {recs[i]?.score}% match</p>
              </div>
            </div>
          ))}

          {/* Future */}
          {futureCourses.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-4">Future possibilities</p>
              {futureCourses.slice(0, 2).map((fc, i) => (
                <div key={i} className="flex items-center gap-4 mb-1">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><Circle className="w-4 h-4 text-gray-400" /></div>
                    {i < 1 && <div className="w-0.5 h-10 bg-gray-200 border-l-2 border-dashed border-gray-300" />}
                  </div>
                  <div className="flex-1 py-2 opacity-60">
                    <p className="font-medium text-gray-700">{fc.title}</p>
                    <p className="text-xs text-gray-500">{fc.category} • {fc.difficulty}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Goal */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center"><Award className="w-5 h-5 text-white" /></div>
            <div className="flex-1 bg-amber-50 rounded-xl px-4 py-3 border border-amber-200">
              <p className="font-semibold text-amber-900">{user.targetRole}</p>
              <p className="text-xs text-amber-700">Your target role — keep going!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePanel({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    currentRole: user.currentRole,
    industry: user.industry,
    experienceYears: user.experienceYears,
    targetRole: user.targetRole,
    motivation: user.motivation,
    goalSkills: user.goalSkills || [],
  });
  const [skillSearch, setSkillSearch] = useState('');
  const [saved, setSaved] = useState(false);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const toggleSkill = (skill) => {
    setForm(f => ({
      ...f,
      goalSkills: f.goalSkills.includes(skill)
        ? f.goalSkills.filter(s => s !== skill)
        : [...f.goalSkills, skill],
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onSave({ ...user, ...form });
    }, 600);
  };

  const filteredSkills = allSkills.filter(s =>
    s.toLowerCase().includes(skillSearch.toLowerCase()) && !form.goalSkills.includes(s)
  ).slice(0, 20);

  const initials = form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col">
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">{initials}</div>
            <div>
              <h2 className="text-white font-semibold text-lg">Profile Settings</h2>
              <p className="text-blue-200 text-xs">Learner account</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Personal info */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <input value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Industry</label>
                  <input value={form.industry} onChange={e => set('industry', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Years of Experience</label>
                  <input type="number" min="0" max="50" value={form.experienceYears} onChange={e => set('experienceYears', Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Career info */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" /> Career</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Current Role</label>
                <input value={form.currentRole} onChange={e => set('currentRole', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Target Role</label>
                <input value={form.targetRole} onChange={e => set('targetRole', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Motivation</label>
                <div className="flex gap-3">
                  {[{ val: 'upskill', label: '↑ Upskilling', desc: 'Advancing in my current field' }, { val: 'reskill', label: '↔ Reskilling', desc: 'Transitioning to a new field' }].map(opt => (
                    <button key={opt.val} onClick={() => set('motivation', opt.val)}
                      className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${form.motivation === opt.val ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <p className={`text-sm font-semibold ${form.motivation === opt.val ? 'text-blue-700' : 'text-gray-700'}`}>{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Goal skills */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Target className="w-3.5 h-3.5" /> Goal Skills</h3>
            {/* Selected skills */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[36px]">
              {form.goalSkills.length === 0 && <p className="text-sm text-gray-400 italic">No goal skills selected</p>}
              {form.goalSkills.map(s => (
                <span key={s} className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                  {s}
                  <button onClick={() => toggleSkill(s)} className="hover:text-blue-900 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            {/* Search to add */}
            <input
              placeholder="Search and add skills..."
              value={skillSearch}
              onChange={e => setSkillSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            {skillSearch && (
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {filteredSkills.map(s => (
                  <button key={s} onClick={() => { toggleSkill(s); setSkillSearch(''); }}
                    className="text-xs bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-2.5 py-1 rounded-full transition-colors">
                    + {s}
                  </button>
                ))}
                {filteredSkills.length === 0 && <p className="text-xs text-gray-400">No matching skills</p>}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saved}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save changes</>}
          </button>
        </div>
      </div>
    </>
  );
}

function SkillsView({ user, skillProgress, acquiredSkills, progressPct }) {
  const chartData = skillProgress.map(s => ({ skill: s.skill.length > 15 ? s.skill.slice(0, 15) + '..' : s.skill, value: s.acquired ? 100 : 0 }));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Skills Gap Analysis</h1>
        <p className="text-gray-500 mt-1">Tracking your progress toward <span className="font-medium text-gray-700">{user.targetRole}</span></p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-blue-600">{skillProgress.filter(s => s.acquired).length}</div>
          <p className="text-sm text-gray-500 mt-1">Skills acquired</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-red-500">{skillProgress.filter(s => !s.acquired).length}</div>
          <p className="text-sm text-gray-500 mt-1">Skills remaining</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-green-600">{progressPct}%</div>
          <p className="text-sm text-gray-500 mt-1">Goal completion</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Target skills for {user.targetRole}</h2>
        <div className="space-y-3">
          {skillProgress.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              {s.acquired
                ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                : <Circle className="w-5 h-5 text-red-300 flex-shrink-0" />}
              <span className={`text-sm ${s.acquired ? 'text-gray-900' : 'text-gray-500'}`}>{s.skill}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${s.acquired ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {s.acquired ? 'Acquired' : 'Gap'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills progress chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="skill" tick={{ fontSize: 11 }} width={120} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
