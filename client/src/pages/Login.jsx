import React, { useState } from 'react';
import { learners, companies } from '../data/seedData';
import { GraduationCap, Building2, Shield, ChevronRight } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Learner', desc: 'View your learning passport, AI recommendations, and skill progress', icon: GraduationCap, color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  { id: 'company', label: 'Company Admin', desc: 'View workforce heatmap, gap analysis, and training roadmaps', icon: Building2, color: 'bg-teal-600', hover: 'hover:bg-teal-700' },
  { id: 'admin', label: 'C2B Admin', desc: 'Manage courses, view analytics, and monitor feedback', icon: Shield, color: 'bg-purple-600', hover: 'hover:bg-purple-700' },
];

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleLogin = () => {
    if (selectedRole === 'student' && selectedProfile) {
      onLogin({ ...learners.find(l => l._id === selectedProfile), role: 'student' });
    } else if (selectedRole === 'company' && selectedProfile) {
      onLogin({ ...companies.find(c => c._id === selectedProfile), role: 'company' });
    } else if (selectedRole === 'admin') {
      onLogin({ _id: 'admin', name: 'C2B Administrator', role: 'admin' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-extrabold text-lg">C2B</span>
            </div>
            <span className="text-3xl font-bold text-white">PathFinder</span>
          </div>
          <p className="text-slate-400 text-lg">AI-Powered Learning Path Recommendation Platform</p>
          <p className="text-slate-500 text-sm mt-1">Demo System — Campus2Business</p>
        </div>

        {/* Role Selection */}
        {!selectedRole && (
          <div>
            <p className="text-slate-300 text-center mb-6 font-medium">Select your dashboard to continue</p>
            <div className="space-y-4">
              {roles.map(r => (
                <button key={r.id} onClick={() => { setSelectedRole(r.id); if (r.id === 'admin') setTimeout(() => onLogin({ _id: 'admin', name: 'C2B Administrator', role: 'admin' }), 200); }}
                  className="w-full flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 text-left hover:bg-white/10 transition-all group">
                  <div className={`w-14 h-14 ${r.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <r.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{r.label} Dashboard</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{r.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Profile Selection - Student */}
        {selectedRole === 'student' && (
          <div>
            <button onClick={() => { setSelectedRole(null); setSelectedProfile(null); }} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1">← Back to role selection</button>
            <p className="text-slate-300 text-center mb-6 font-medium">Select a demo learner profile</p>
            <div className="space-y-3">
              {learners.map(l => (
                <button key={l._id} onClick={() => setSelectedProfile(l._id)}
                  className={`w-full flex items-center gap-4 rounded-xl p-4 text-left transition-all border ${selectedProfile === l._id ? 'bg-blue-600/20 border-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{l.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{l.name}</h4>
                    <p className="text-slate-400 text-xs">{l.currentRole} → {l.targetRole} • {l.completedCourses.length} courses completed</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleLogin} disabled={!selectedProfile}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all ${selectedProfile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 cursor-not-allowed opacity-50'}`}>
              Enter Learner Dashboard
            </button>
          </div>
        )}

        {/* Profile Selection - Company */}
        {selectedRole === 'company' && (
          <div>
            <button onClick={() => { setSelectedRole(null); setSelectedProfile(null); }} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1">← Back to role selection</button>
            <p className="text-slate-300 text-center mb-6 font-medium">Select a demo company</p>
            <div className="space-y-3">
              {companies.map(c => (
                <button key={c._id} onClick={() => setSelectedProfile(c._id)}
                  className={`w-full flex items-center gap-4 rounded-xl p-4 text-left transition-all border ${selectedProfile === c._id ? 'bg-teal-600/20 border-teal-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{c.name}</h4>
                    <p className="text-slate-400 text-xs">{c.industry} • {c.size} employees • {c.departments.length} departments</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleLogin} disabled={!selectedProfile}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all ${selectedProfile ? 'bg-teal-600 hover:bg-teal-700' : 'bg-slate-700 cursor-not-allowed opacity-50'}`}>
              Enter Company Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
