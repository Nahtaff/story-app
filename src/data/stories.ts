import { Story } from '../types';

export const storiesData: Story[] = [
  {
    id: '1',
    title: 'The Moon that Can\'t be Seen',
    author: 'Rara',
    synopsis: 'A mysterious story about a moon that cannot be seen by anyone.',
    category: 'Technology',
    keywords: ['school', 'fiction'],
    status: 'Draft',
    chapters: [
      {
        id: '1',
        title: 'Chapter 1: The Beginning',
        content: 'This is the content of chapter 1...',
        lastUpdated: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Chapter 2: The Journey',
        content: 'This is the content of chapter 2...',
        lastUpdated: new Date('2024-01-20')
      }
    ]
  },
  {
    id: '2',
    title: 'Given',
    author: 'Sansa S.',
    synopsis: 'A story about music and its healing power.',
    category: 'Health',
    keywords: ['music'],
    status: 'Draft',
    chapters: [
      {
        id: '3',
        title: 'Chapter 1: Introduction',
        content: 'This is the content of chapter 1...',
        lastUpdated: new Date('2024-01-10')
      }
    ]
  },
  {
    id: '3',
    title: 'Fish Swimming In The Sky',
    author: 'Kaenarita Faly',
    synopsis: 'A fantasy romance about fish that can swim in the sky.',
    category: 'Financial',
    keywords: ['fantasy', 'romance'],
    status: 'Publish',
    chapters: [
      {
        id: '4',
        title: 'Chapter 1: The Discovery',
        content: 'This is the content of chapter 1...',
        lastUpdated: new Date('2024-01-25')
      },
      {
        id: '5',
        title: 'Chapter 2: The Adventure',
        content: 'This is the content of chapter 2...',
        lastUpdated: new Date('2024-01-30')
      },
      {
        id: '6',
        title: 'Chapter 3: The Conclusion',
        content: 'This is the content of chapter 3...',
        lastUpdated: new Date('2024-02-05')
      }
    ]
  },
  {
    id: '4',
    title: 'The Science of Fertility PCOS',
    author: 'Jessie Inchauspe',
    synopsis: 'A comprehensive guide to understanding PCOS and fertility.',
    category: 'Health',
    keywords: ['science', 'PCOS'],
    status: 'Publish',
    chapters: []
  },
  {
    id: '5',
    title: 'The Glucose Goddess Method',
    author: 'Jessie Inchauspe',
    synopsis: 'A revolutionary method for managing glucose levels naturally.',
    category: 'Health',
    keywords: ['glucose', 'science'],
    status: 'Publish',
    chapters: [
      {
        id: '7',
        title: 'Chapter 1: Understanding Glucose',
        content: 'This is the content of chapter 1...',
        lastUpdated: new Date('2024-01-12')
      }
    ]
  }
];

export const categories = ['Financial', 'Technology', 'Health'];
export const statuses = ['Publish', 'Draft']; 