import { SessionState } from '../types';

const STORAGE_PREFIX = 'fluia-lm-session-';

export class StorageService {
  static saveSession(sessionState: SessionState): void {
    try {
      const key = `${STORAGE_PREFIX}${sessionState.sessionId}`;
      const data = {
        ...sessionState,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  }

  static loadSession(sessionId: string): SessionState | null {
    try {
      const key = `${STORAGE_PREFIX}${sessionId}`;
      const data = localStorage.getItem(key);
      
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      // Remove timestamp as it's not part of SessionState
      const { timestamp, ...sessionState } = parsed;
      return sessionState as SessionState;
    } catch (error) {
      console.warn('Error loading from localStorage:', error);
      return null;
    }
  }

  static clearSession(sessionId: string): void {
    try {
      const key = `${STORAGE_PREFIX}${sessionId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  }

  static getAllSessions(): string[] {
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .map(key => key.replace(STORAGE_PREFIX, ''));
    } catch (error) {
      console.warn('Error getting sessions:', error);
      return [];
    }
  }
}