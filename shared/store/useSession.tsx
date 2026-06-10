import { create } from 'zustand';

type User = {
  name: string;
  email: string;
};

type SessionState = {
  user: User;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  updateUser: (newUser: User) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setCompletedOnboarding: (hasCompletedOnboarding: boolean) => void;
};

const useSession = create<SessionState>((set) => ({
  user: {
    name: 'Emma',
    email: 'emma@example.com',
  },
  isAuthenticated: true,
  hasCompletedOnboarding: false,
  updateUser: (newUser: User) => set({ user: newUser }),
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setCompletedOnboarding: (hasCompletedOnboarding: boolean) => set({ hasCompletedOnboarding }),
}));

export default useSession;
