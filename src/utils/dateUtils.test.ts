import { formatDate, formatDateForDisplay } from './dateUtils';

describe('Date Utils', () => {
  describe('formatDate', () => {
    test('formats date correctly', () => {
      const testDate = new Date('2024-01-15');
      const result = formatDate(testDate);
      expect(result).toBe('January 15, 2024');
    });

    test('handles different dates', () => {
      const testDate = new Date('2024-12-25');
      const result = formatDate(testDate);
      expect(result).toBe('December 25, 2024');
    });
  });

  describe('formatDateForDisplay', () => {
    test('returns "Today" for today', () => {
      const today = new Date();
      const result = formatDateForDisplay(today);
      expect(result).toBe('Today');
    });

    test('returns "Yesterday" for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = formatDateForDisplay(yesterday);
      expect(result).toBe('Yesterday');
    });

    test('returns "X days ago" for recent dates', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const result = formatDateForDisplay(threeDaysAgo);
      expect(result).toBe('2 days ago');
    });

    test('returns formatted date for older dates', () => {
      const oldDate = new Date('2024-01-01');
      const result = formatDateForDisplay(oldDate);
      expect(result).toMatch(/January 1, 2024/);
    });
  });
}); 