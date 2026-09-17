import { UserProfile } from '../types';

const AUTH_USER_KEY = 'vox_active_user_session';
const ALL_PROFILES_KEY = 'vox_known_user_profiles';
const GUEST_DEVICE_ID_KEY = 'vox_guest_device_id';

function getOrCreateGuestDeviceId(): string {
  try {
    let deviceId = localStorage.getItem(GUEST_DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = 'guest_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem(GUEST_DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  } catch {
    return 'guest_local';
  }
}

export function createDefaultGuestProfile(): UserProfile {
  const guestId = getOrCreateGuestDeviceId();
  return {
    id: guestId,
    name: 'Guest Explorer',
    email: 'guest@vox-review.local',
    isGuest: true,
    createdAt: new Date().toISOString(),
  };
}

export function getCurrentUser(): UserProfile {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed;
    }
  } catch (e) {
    console.warn('Could not read user profile from localStorage', e);
  }
  return createDefaultGuestProfile();
}

export function listKnownProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(ALL_PROFILES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not list profiles', e);
  }
  return [];
}

export function saveUserSession(profile: UserProfile): void {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));

    if (!profile.isGuest) {
      const known = listKnownProfiles();
      const existingIdx = known.findIndex(p => p.id === profile.id || p.email === profile.email);
      if (existingIdx >= 0) {
        known[existingIdx] = profile;
      } else {
        known.push(profile);
      }
      localStorage.setItem(ALL_PROFILES_KEY, JSON.stringify(known));
    }
  } catch (e) {
    console.warn('Could not save user session', e);
  }
}

export function loginUser(email: string, name?: string): UserProfile {
  const cleanEmail = email.trim().toLowerCase();
  const known = listKnownProfiles();
  const existing = known.find(p => p.email.toLowerCase() === cleanEmail);

  if (existing) {
    saveUserSession(existing);
    return existing;
  }

  const newProfile: UserProfile = {
    id: 'usr_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    name: name?.trim() || cleanEmail.split('@')[0],
    email: cleanEmail,
    isGuest: false,
    createdAt: new Date().toISOString(),
  };

  saveUserSession(newProfile);
  return newProfile;
}

export function logoutUser(): UserProfile {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
    // Create a new fresh guest profile so the previous user's content is completely wiped from active state
    const newGuest = createDefaultGuestProfile();
    return newGuest;
  } catch {
    return createDefaultGuestProfile();
  }
}

export function getSavedProductsStorageKey(userId: string): string {
  return `vox_saved_items_${userId}`;
}

export function getComparisonStorageKey(userId: string): string {
  return `vox_compared_items_${userId}`;
}
