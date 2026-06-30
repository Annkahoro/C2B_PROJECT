import React, { useState } from 'react';
import { LogOut, Building2, Users, AlertTriangle, TrendingUp, Calendar, Target, ChevronRight, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const tabs = ['Overview', 'Skill Heatmap', 'Training Roadmap', 'Progress'];

const PIE_COLORS = ['#2563eb', '#0d9488', '#7c3aed', '#dc2626', '#f59e0b'];

export default function CompanyDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const totalEmployees = user.departments.reduce((a, d) => a + d.employeeCount, 0);
  const totalGaps = user.departments.reduce((a, d) => {
    return a + Object.values(d.skillGaps).reduce((b, g) => b + g.lacking, 0);
  }, 0);
  const avgGapPct = Math.round((totalGaps / (user.departments.reduce((a, d) => a + Object.values(d.skillGaps).reduce((b, g) => b + g.total, 0), 0) || 1)) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">C2B</span></div>
            <span className="font-bold text-gray-900">PathFinder</span>
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">Company</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right"><p className="text-sm font-medium text-gray-900">{user.name}</p><p className="text-xs text-gray-500">{user.contactPerson} — {user.contactRole}</p></div>
            <button onClick={onLogout} className="text-gray-400 hover:text-gray-600"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === t ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'Overview' && <OverviewView user={user} totalEmployees={totalEmployees} avgGapPct={avgGapPct} />}
        {activeTab === 'Skill Heatmap' && <HeatmapView user={user} />}
        {activeTab === 'Training Roadmap' && <RoadmapView user={user} />}
        {activeTab === 'Progress' && <ProgressView user={user} totalEmployees={totalEmployees} />}
      </main>
    </div>
  );
}

function OverviewView({ user, totalEmployees, avgGapPct }) {
  const deptData = user.departments.map(d => ({ name: d.name.length > 12 ? d.name.slice(0, 12) + '..' : d.name, employees: d.employeeCount }));
  const goalData = user.goals.map((g, i) => ({ name: g, value: Math.round(100 / user.goals.length) }));

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-teal-200">{user.industry} • {user.size} employees • {user.departments.length} departments</p>
            <div className="flex items-center gap-6 mt-6">
              <div><p className="text-3xl font-bold">{totalEmployees}</p><p className="text-teal-200 text-sm">Employees to train</p></div>
              <div className="w-px h-12 bg-teal-400/30" />
              <div><p className="text-3xl font-bold">{avgGapPct}%</p><p className="text-teal-200 text-sm">Average skill gap</p></div>
              <div className="w-px h-12 bg-teal-400/30" />
              <div><p className="text-3xl font-bold">{user.trainingPlan.phases.length}</p><p className="text-teal-200 text-sm">Training phases</p></div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-teal-200">Budget</p>
            <p className="text-xl font-semibold">{user.budget}</p>
            <p className="text-sm text-teal-200 mt-2">Timeline</p>
            <p className="text-lg font-semibold">{user.timeline}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-teal-600" /> Departments</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="employees" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-teal-600" /> Transformation goals</h2>
          <div className="space-y-3">
            {user.goals.map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">{i + 1}</div>
                <span className="text-sm font-medium text-teal-900">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeatmapView({ user }) {
  // Collect all unique skills across departments
  const allSkills = [...new Set(user.departments.flatMap(d => Object.keys(d.skillGaps)))];

  const getColor = (pct) => {
    if (pct >= 80) return 'bg-red-500 text-white';
    if (pct >= 60) return 'bg-red-300 text-red-900';
    if (pct >= 40) return 'bg-amber-300 text-amber-900';
    if (pct >= 20) return 'bg-yellow-200 text-yellow-800';
    return 'bg-green-200 text-green-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Workforce Skill Heatmap</h1>
        <p className="text-gray-500 mt-1">Colour-coded by gap severity — red means most employees lack this skill</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <span className="text-gray-500">Gap severity:</span>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-green-200" /><span className="text-gray-600">&lt;20%</span></div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-yellow-200" /><span className="text-gray-600">20-40%</span></div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-amber-300" /><span className="text-gray-600">40-60%</span></div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-red-300" /><span className="text-gray-600">60-80%</span></div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-red-500" /><span className="text-gray-600">&gt;80%</span></div>
      </div>

      {/* Heatmap table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-r border-gray-200 min-w-[160px]">Department</th>
                {allSkills.map(s => (
                  <th key={s} className="px-3 py-3 text-xs font-medium text-gray-600 border-b border-r border-gray-200 min-w-[110px]">
                    <div className="transform -rotate-0">{s}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {user.departments.map((dept, di) => (
                <tr key={di} className="border-b border-gray-100">
                  <td className="px-4 py-3 border-r border-gray-200">
                    <p className="font-medium text-gray-900 text-sm">{dept.name}</p>
                    <p className="text-xs text-gray-500">{dept.employeeCount} employees</p>
                  </td>
                  {allSkills.map(skill => {
                    const gap = dept.skillGaps[skill];
                    if (!gap) return <td key={skill} className="px-3 py-3 border-r border-gray-100 text-center"><span className="text-xs text-gray-300">—</span></td>;
                    const pct = Math.round((gap.lacking / gap.total) * 100);
                    return (
                      <td key={skill} className="px-2 py-2 border-r border-gray-100">
                        <div className={`rounded-lg px-2 py-2 text-center ${getColor(pct)}`}>
                          <p className="font-bold text-sm">{gap.lacking}/{gap.total}</p>
                          <p className="text-xs opacity-80">{pct}%</p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical gaps callout */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
        <h3 className="font-semibold text-red-900 flex items-center gap-2 mb-3"><AlertTriangle className="w-5 h-5" /> Critical gaps (&gt;80% of department)</h3>
        <div className="grid grid-cols-2 gap-3">
          {user.departments.flatMap(d =>
            Object.entries(d.skillGaps)
              .filter(([_, g]) => (g.lacking / g.total) >= 0.8)
              .map(([skill, g]) => ({
                dept: d.name,
                skill,
                lacking: g.lacking,
                total: g.total,
                pct: Math.round((g.lacking / g.total) * 100)
              }))
          ).sort((a, b) => b.pct - a.pct).map((g, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-red-100">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm">{g.pct}%</div>
              <div>
                <p className="text-sm font-medium text-gray-900">{g.skill}</p>
                <p className="text-xs text-gray-500">{g.dept} — {g.lacking} of {g.total} employees need training</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoadmapView({ user }) {
  const phaseColors = ['bg-blue-600', 'bg-teal-600', 'bg-purple-600', 'bg-amber-600'];
  const phaseBorders = ['border-blue-200', 'border-teal-200', 'border-purple-200', 'border-amber-200'];
  const phaseBgs = ['bg-blue-50', 'bg-teal-50', 'bg-purple-50', 'bg-amber-50'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI-Generated Training Roadmap</h1>
        <p className="text-gray-500 mt-1">A phased plan across {user.timeline} — prioritised by gap severity and strategic alignment</p>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><Target className="w-4 h-4 text-white" /></div>
        <div>
          <p className="text-sm font-medium text-blue-900">AI Recommendation Rationale</p>
          <p className="text-sm text-blue-700 mt-1">This roadmap was generated by analysing your workforce skill gaps, prioritising by severity (100% gaps first), respecting course prerequisites, and benchmarking against similar {user.industry} companies. The phased approach ensures each department builds foundational skills before advancing.</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {user.trainingPlan.phases.map((phase, i) => (
          <div key={i} className={`${phaseBgs[i]} rounded-2xl border ${phaseBorders[i]} p-6`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${phaseColors[i]} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                {phase.phase}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{phase.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500"><Calendar className="w-4 h-4" /> Phase {phase.phase} of {user.trainingPlan.phases.length}</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{phase.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Departments</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.departments.map(d => (
                        <span key={d} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 font-medium text-gray-700">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Programmes</p>
                    <div className="space-y-1">
                      {phase.programmes.map(p => (
                        <p key={p} className="text-sm text-gray-700 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-gray-400" /> {p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressView({ user, totalEmployees }) {
  // Simulated progress data
  const progressData = user.departments.map(d => ({
    name: d.name.length > 12 ? d.name.slice(0, 12) + '..' : d.name,
    completed: Math.round(Math.random() * 30 + 10),
    inProgress: Math.round(Math.random() * 25 + 15),
    notStarted: Math.round(Math.random() * 40 + 20),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Training Progress</h1>
        <p className="text-gray-500 mt-1">Track your company's transformation progress across departments</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-teal-600">23%</p><p className="text-sm text-gray-500 mt-1">Overall completion</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-blue-600">42</p><p className="text-sm text-gray-500 mt-1">Employees training</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-amber-600">Phase 1</p><p className="text-sm text-gray-500 mt-1">Current phase</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">On Track</p><p className="text-sm text-gray-500 mt-1">Status</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Department progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Completed" radius={[0, 0, 0, 0]} />
            <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" radius={[0, 0, 0, 0]} />
            <Bar dataKey="notStarted" stackId="a" fill="#e5e7eb" name="Not Started" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
