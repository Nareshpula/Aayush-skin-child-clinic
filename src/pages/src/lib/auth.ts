import { supabase } from './supabase';

export type UserRole = 'admin' | 'reception';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Login function
export const login = async (username: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
  try {
    const { data, error } = await supabase.rpc('authenticate_user', {
      p_username: username,
      p_password: password
    });

    if (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Store user in local storage
    const user: User = {
      id: data.user_id,
      username: data.username,
      role: data.role
    };
    
    localStorage.setItem('aayush_user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'An unexpected error occurred' };
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('aayush_user');
  window.location.href = '/login';
};

// Get current user from local storage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('aayush_user');
  // console.log('User JSON from localStorage:', userJson);
  if (!userJson) return null;
  
  try {
    const user = JSON.parse(userJson) as User;
    // console.log('Parsed user object:', user);
    return user;
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Check if user has a specific role
export const hasRole = (role: UserRole | UserRole[]): boolean => {
  const user = getCurrentUser();
  // console.log('Checking role:', role, 'for user:', user);
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};