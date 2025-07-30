import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryTable from './StoryTable';
import { Story } from '../../types';

const mockStories: Story[] = [
  {
    id: '1',
    title: 'Test Story 1',
    author: 'Test Author 1',
    synopsis: 'Test synopsis 1',
    category: 'Technology',
    keywords: ['test', 'story'],
    status: 'Draft',
    chapters: []
  },
  {
    id: '2',
    title: 'Test Story 2',
    author: 'Test Author 2',
    synopsis: 'Test synopsis 2',
    category: 'Health',
    keywords: ['health', 'wellness'],
    status: 'Publish',
    chapters: []
  }
];

describe('StoryTable Component', () => {
  test('renders table with stories', () => {
    render(<StoryTable stories={mockStories} />);
    
    expect(screen.getByText('Test Story 1')).toBeInTheDocument();
    expect(screen.getByText('Test Story 2')).toBeInTheDocument();
    expect(screen.getByText('Test Author 1')).toBeInTheDocument();
    expect(screen.getByText('Test Author 2')).toBeInTheDocument();
  });

  test('renders empty state when no stories', () => {
    render(<StoryTable stories={[]} />);
    
    expect(screen.getByText('No stories found')).toBeInTheDocument();
  });

  test('calls onViewStory when view button is clicked', () => {
    const mockOnViewStory = jest.fn();
    render(<StoryTable stories={mockStories} onViewStory={mockOnViewStory} />);
    
    const viewButtons = screen.getAllByTitle('View Story Details');
    fireEvent.click(viewButtons[0]);
    
    expect(mockOnViewStory).toHaveBeenCalledWith(mockStories[0]);
  });

  test('calls onEditStory when edit button is clicked', () => {
    const mockOnEditStory = jest.fn();
    render(<StoryTable stories={mockStories} onEditStory={mockOnEditStory} />);
    
    const editButtons = screen.getAllByTitle('Edit Story');
    fireEvent.click(editButtons[0]);
    
    expect(mockOnEditStory).toHaveBeenCalledWith(mockStories[0]);
  });

  test('displays keywords as chips', () => {
    render(<StoryTable stories={mockStories} />);
    
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('story')).toBeInTheDocument();
    expect(screen.getByText('health')).toBeInTheDocument();
    expect(screen.getByText('wellness')).toBeInTheDocument();
  });

  test('displays status badges correctly', () => {
    render(<StoryTable stories={mockStories} />);
    
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeInTheDocument();
  });
}); 