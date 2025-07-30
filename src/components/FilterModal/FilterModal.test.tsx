import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterModal from './FilterModal';
import { FilterState } from '../../types';

const mockInitialFilters: FilterState = {
  category: 'Technology',
  status: 'Draft'
};

describe('FilterModal Component', () => {
  test('renders modal when open', () => {
    render(
      <FilterModal
        open={true}
        onClose={jest.fn()}
        onFilter={jest.fn()}
        initialFilters={mockInitialFilters}
      />
    );
    
    expect(screen.getByText('Filter Stories')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <FilterModal
        open={false}
        onClose={jest.fn()}
        onFilter={jest.fn()}
        initialFilters={mockInitialFilters}
      />
    );
    
    expect(screen.queryByText('Filter Stories')).not.toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <FilterModal
        open={true}
        onClose={mockOnClose}
        onFilter={jest.fn()}
        initialFilters={mockInitialFilters}
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onFilter with correct data when apply button is clicked', () => {
    const mockOnFilter = jest.fn();
    render(
      <FilterModal
        open={true}
        onClose={jest.fn()}
        onFilter={mockOnFilter}
        initialFilters={mockInitialFilters}
      />
    );
    
    const applyButton = screen.getByText('Apply Filter');
    fireEvent.click(applyButton);
    
    expect(mockOnFilter).toHaveBeenCalledWith(mockInitialFilters);
  });

  test('displays all category options', () => {
    render(
      <FilterModal
        open={true}
        onClose={jest.fn()}
        onFilter={jest.fn()}
        initialFilters={mockInitialFilters}
      />
    );
    
    expect(screen.getByText('Financial')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  test('displays all status options', () => {
    render(
      <FilterModal
        open={true}
        onClose={jest.fn()}
        onFilter={jest.fn()}
        initialFilters={mockInitialFilters}
      />
    );
    
    expect(screen.getByText('Publish')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });
}); 