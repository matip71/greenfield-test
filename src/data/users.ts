import type { User } from './types';

const USERS_STORAGE_KEY = 'shopco_users';

function simpleHash(str: string): string {
  // Simple mock hash for v1 — NOT secure, purely for UI demo
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

function getUsersFromStorage(): User[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

export function getUserByEmail(email: string): User | undefined {
  return getUsersFromStorage().find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export function saveUser(user: Omit<User, 'id' | 'passwordHash' | 'createdAt'> & { password: string }): User {
  const existing = getUsersFromStorage();
  const newUser: User = {
    id: crypto.randomUUID(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    passwordHash: simpleHash(user.password),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...existing, newUser]));
  return newUser;
}

export function updateUser(updatedUser: User): void {
  const existing = getUsersFromStorage();
  const idx = existing.findIndex((u) => u.id === updatedUser.id);
  if (idx !== -1) {
    existing[idx] = updatedUser;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existing));
  }
}

export function validateCredentials(email: string, password: string): User | null {
  const user = getUserByEmail(email);
  if (!user) return null;
  return user.passwordHash === simpleHash(password) ? user : null;
}
