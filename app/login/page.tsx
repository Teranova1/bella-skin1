'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Sparkles, Lock, Mail, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { loadAdminUsers, loadAdminSession, saveAdminSession } from '@/lib/admin-storage';
import { AdminUser } from '@/lib/types';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

type Tab = 'login' | 'signup';

interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Login form
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });

  // Signup form
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already logged in
  useEffect(() => {
    const session = loadAdminSession();
    if (session) {
      router.replace('/admin');
    }
  }, [router]);

  // Auto-dismiss toasts
  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // ── Login ──
  const validateLogin = () => {
    const errors = { email: '', password: '' };
    let valid = true;

    if (!loginForm.email) {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = 'Enter a valid email address.';
      valid = false;
    }
    if (!loginForm.password) {
      errors.password = 'Password is required.';
      valid = false;
    }

    setLoginErrors(errors);
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    // Simulate async check
    await new Promise(r => setTimeout(r, 800));

    const users = loadAdminUsers();
    const matched = users.find(
      u =>
        u.email.toLowerCase() === loginForm.email.toLowerCase() &&
        u.password === loginForm.password,
    );

    if (!matched) {
      setLoading(false);
      addToast('error', 'Invalid email or password. Please try again.');
      setLoginErrors(prev => ({ ...prev, password: 'Incorrect credentials.' }));
      return;
    }

    saveAdminSession(matched);
    addToast('success', `Welcome back, ${matched.name}! Redirecting…`);
    await new Promise(r => setTimeout(r, 900));
    // Role-based redirect: currently all users go to admin dashboard
    router.push('/admin');
    setLoading(false);
  };

  // ── Sign Up (disabled) ──
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('info', 'New account registration is temporarily disabled.');
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setLoginErrors({ email: '', password: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F5F0] flex flex-col">

      {/* ── Toast Stack ── */}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none w-[calc(100vw-2.5rem)] max-w-sm">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-sm text-sm font-medium animate-slideIn ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-50 hover:opacity-100 transition-opacity ml-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ── Standard full-sized site header ── */}
      <Header onAdminClick={() => {}} onCartClick={() => router.push('/')} cartCount={0} />
      <Navigation />

      {/* ── Main layout ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-5xl grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center">

          {/* ── Left: Branding panel ── */}
          <div className="hidden lg:flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87137] mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Bella Skincare
              </span>
              <h1 className="text-4xl xl:text-5xl font-bold text-[#3D3D3D] leading-tight">
                Your skin deserves<br />
                <span className="text-[#C87137]">the very best.</span>
              </h1>
              <p className="mt-4 text-[#7A6B5D] text-base leading-relaxed max-w-md">
                Sign in to access your account, manage orders, and explore premium skincare curated just for you.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-col gap-3">
              {[
                { icon: '✦', text: 'Admin access to the product dashboard' },
                { icon: '✦', text: 'Manage inventory & stock levels' },
                { icon: '✦', text: 'Secure, session-based authentication' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-[#C87137] text-xs">{item.icon}</span>
                  <span className="text-sm text-[#7A6B5D]">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Demo credentials card */}
            <div className="rounded-2xl bg-white border border-[#E8D4C4] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C87137] mb-3">Demo Admin Account</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-[#3D3D3D]">
                  <Mail className="w-3.5 h-3.5 text-[#A0826D]" />
                  <span className="font-mono select-all">admin@bella.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3D3D3D]">
                  <Lock className="w-3.5 h-3.5 text-[#A0826D]" />
                  <span className="font-mono select-all">Admin123!</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Auth card ── */}
          <div className="w-full bg-white rounded-3xl shadow-xl border border-[#E8D4C4] overflow-hidden">

            {/* Tab switcher */}
            <div className="grid grid-cols-2 border-b border-[#E8D4C4]">
              {(['login', 'signup'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  className={`py-4 text-sm font-semibold tracking-wide transition-all duration-200 ${
                    tab === t
                      ? 'text-[#C87137] border-b-2 border-[#C87137] bg-[#FDF8F4]'
                      : 'text-[#A0826D] hover:text-[#3D3D3D] hover:bg-[#F9F5F0]'
                  }`}
                >
                  {t === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">

              {/* ─── LOGIN TAB ─── */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} noValidate className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#3D3D3D]">Welcome back</h2>
                    <p className="text-sm text-[#A0826D] mt-1">Sign in to your account to continue.</p>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="login-email" className="text-xs font-semibold text-[#3D3D3D] uppercase tracking-wider">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0826D] pointer-events-none" />
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={loginForm.email}
                        onChange={e => {
                          setLoginForm(p => ({ ...p, email: e.target.value }));
                          if (loginErrors.email) setLoginErrors(p => ({ ...p, email: '' }));
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[#F9F5F0] focus:outline-none focus:ring-2 focus:ring-[#C87137]/40 focus:border-[#C87137] transition-all ${
                          loginErrors.email ? 'border-red-400 bg-red-50' : 'border-[#E8D4C4]'
                        }`}
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{loginErrors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="login-password" className="text-xs font-semibold text-[#3D3D3D] uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0826D] pointer-events-none" />
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={e => {
                          setLoginForm(p => ({ ...p, password: e.target.value }));
                          if (loginErrors.password) setLoginErrors(p => ({ ...p, password: '' }));
                        }}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl border text-sm bg-[#F9F5F0] focus:outline-none focus:ring-2 focus:ring-[#C87137]/40 focus:border-[#C87137] transition-all ${
                          loginErrors.password ? 'border-red-400 bg-red-50' : 'border-[#E8D4C4]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A0826D] hover:text-[#3D3D3D] transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{loginErrors.password}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#C87137] hover:bg-[#B85F2F] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] min-h-[52px] text-sm shadow-md shadow-[#C87137]/20"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Mobile demo hint */}
                  <div className="lg:hidden rounded-xl bg-[#FDF8F4] border border-[#E8D4C4] p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C87137] mb-2">Demo Account</p>
                    <p className="text-xs text-[#7A6B5D] font-mono">admin@bella.com</p>
                    <p className="text-xs text-[#7A6B5D] font-mono">Admin123!</p>
                  </div>
                </form>
              )}

              {/* ─── SIGN UP TAB ─── */}
              {tab === 'signup' && (
                <form onSubmit={handleSignup} noValidate className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#3D3D3D]">Create an account</h2>
                    <p className="text-sm text-[#A0826D] mt-1">Fill in your details to get started.</p>
                  </div>

                  {/* Registration disabled notice */}
                  <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <span className="font-semibold">Registration is currently closed.</span> New account sign-ups are temporarily disabled. Please contact support if you need access.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-name" className="text-xs font-semibold text-[#3D3D3D] uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0826D] pointer-events-none" />
                      <input
                        id="signup-name"
                        type="text"
                        placeholder="Jane Doe"
                        value={signupForm.name}
                        onChange={e => setSignupForm(p => ({ ...p, name: e.target.value }))}
                        disabled
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8D4C4] text-sm bg-[#F9F5F0] opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-email" className="text-xs font-semibold text-[#3D3D3D] uppercase tracking-wider">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0826D] pointer-events-none" />
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupForm.email}
                        onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))}
                        disabled
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8D4C4] text-sm bg-[#F9F5F0] opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-password" className="text-xs font-semibold text-[#3D3D3D] uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0826D] pointer-events-none" />
                      <input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={signupForm.password}
                        onChange={e => setSignupForm(p => ({ ...p, password: e.target.value }))}
                        disabled
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#E8D4C4] text-sm bg-[#F9F5F0] opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-confirm" className="text-xs font-semibold text-[#3D3D3D] uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0826D] pointer-events-none" />
                      <input
                        id="signup-confirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repeat your password"
                        value={signupForm.confirmPassword}
                        onChange={e => setSignupForm(p => ({ ...p, confirmPassword: e.target.value }))}
                        disabled
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#E8D4C4] text-sm bg-[#F9F5F0] opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C87137] hover:bg-[#B85F2F] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-1 active:scale-[0.98] min-h-[52px] text-sm shadow-md shadow-[#C87137]/20"
                  >
                    Create Account
                  </button>

                  <p className="text-center text-xs text-[#A0826D]">
                    Already have an account?{' '}
                    <button type="button" onClick={() => switchTab('login')} className="font-semibold text-[#C87137] hover:underline">
                      Log In
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── Slide-in animation ── */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(1rem); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.25s ease-out forwards; }
      `}</style>
    </div>
  );
}
