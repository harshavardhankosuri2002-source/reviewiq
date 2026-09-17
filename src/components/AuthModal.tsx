import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { getCurrentUser, loginUser, logoutUser, listKnownProfiles, saveUserSession } from '../utils/auth';
import { User, LogIn, LogOut, Check, Shield, Lock, Bookmark, Sparkles, X, UserPlus, Smartphone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserChanged: (user: UserProfile) => void;
  savedCount: number;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onUserChanged,
  savedCount,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(getCurrentUser());
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [knownProfiles, setKnownProfiles] = useState<UserProfile[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const user = getCurrentUser();
      setCurrentUser(user);
      setKnownProfiles(listKnownProfiles());
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginOrRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const user = loginUser(email, isRegistering ? name : undefined);
    setCurrentUser(user);
    setKnownProfiles(listKnownProfiles());
    setFeedbackMsg(`Signed in as ${user.name} (${user.email})`);
    onUserChanged(user);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleSwitchProfile = (profile: UserProfile) => {
    saveUserSession(profile);
    setCurrentUser(profile);
    setFeedbackMsg(`Switched to ${profile.name}`);
    onUserChanged(profile);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  const handleLogout = () => {
    const newGuest = logoutUser();
    setCurrentUser(newGuest);
    setFeedbackMsg('Signed out. Switched to isolated Guest session.');
    onUserChanged(newGuest);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#D5E9FA] max-w-md w-full shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#182C45] to-[#0284C7] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-200">
                Data Privacy & Private Workspace
              </span>
              <h2 className="text-xl font-black tracking-tight">
                {currentUser.isGuest ? 'Guest Session' : currentUser.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {feedbackMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Privacy Notice Banner */}
          <div className="bg-[#F5F8FC] p-4 rounded-2xl border border-[#D5E9FA] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#182C45]">
              <Lock className="w-4 h-4 text-[#0284C7]" />
              <span>Isolated Private Storage Guarantee</span>
            </div>
            <p className="text-[11px] text-[#475569] leading-relaxed">
              Your shortlisted smartphones, custom weights, and comparison lists are private to your session. When you share a link, other visitors will <strong>never</strong> see your personal saved items.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#0284C7]">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Currently Saved: <strong>{savedCount} smartphones</strong></span>
            </div>
          </div>

          {/* Active Profile Status */}
          <div className="border border-[#E2E8F0] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  Active Account
                </span>
                <p className="text-sm font-black text-[#182C45]">
                  {currentUser.isGuest ? 'Guest Explorer (Local Device)' : currentUser.name}
                </p>
                <p className="text-xs text-[#64748B] font-mono">{currentUser.email}</p>
              </div>

              {!currentUser.isGuest && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {/* Sign In or Register Form */}
          {currentUser.isGuest ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-xs font-bold text-[#182C45]">
                  {isRegistering ? 'Create Private Profile' : 'Sign In with Email'}
                </span>
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-xs text-[#0284C7] hover:underline font-bold"
                >
                  {isRegistering ? 'Already have account? Sign in' : '+ Create new profile'}
                </button>
              </div>

              <form onSubmit={handleLoginOrRegister} className="space-y-3">
                {isRegistering && (
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g., Harsha Vardhan"
                      className="w-full bg-[#F5F8FC] text-sm text-[#182C45] px-3.5 py-2.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g., user@domain.com"
                    className="w-full bg-[#F5F8FC] text-sm text-[#182C45] px-3.5 py-2.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {isRegistering ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  <span>{isRegistering ? 'Create Profile & Sync Shortlist' : 'Sign In to Private Workspace'}</span>
                </button>
              </form>
            </div>
          ) : (
            /* Known profiles switcher */
            knownProfiles.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Switch Saved Profile
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {knownProfiles
                    .filter(p => p.id !== currentUser.id)
                    .map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSwitchProfile(p)}
                        className="w-full p-2.5 rounded-xl bg-[#F5F8FC] hover:bg-[#EAF5FF] border border-[#D5E9FA] text-left text-xs flex items-center justify-between transition-colors"
                      >
                        <div>
                          <span className="font-bold text-[#182C45] block">{p.name}</span>
                          <span className="text-[#64748B] text-[10px] font-mono">{p.email}</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#0284C7]">Switch &rarr;</span>
                      </button>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
