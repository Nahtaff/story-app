import React, { useState, useMemo } from 'react';
import { Box, styled } from '@mui/material';
import Header from '../Header';
import FilterModal from '../FilterModal';
import StoryTable from '../StoryTable';
import AddStory from '../AddStory';
import StoryDetail from '../StoryDetail';
import EditStory from '../EditStory';
import { storiesData } from '../../data/stories';
import { Story, FilterState, StoryFormData } from '../../types';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f5f5f5',
  width: '100%',
  padding: 0,
  margin: 0,
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  padding: 0,
  margin: 0,
}));

const StoryList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ category: '', status: '' });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
  const [isStoryDetailOpen, setIsStoryDetailOpen] = useState(false);
  const [isEditStoryOpen, setIsEditStoryOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>(storiesData);

  // Filter dan search logic
  const filteredStories = useMemo(() => {
    return stories.filter((story: Story) => {
      // Search filter
      const searchMatch = searchQuery === '' || 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const categoryMatch = filters.category === '' || story.category === filters.category;

      // Status filter
      const statusMatch = filters.status === '' || story.status === filters.status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [searchQuery, filters, stories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleAddStory = () => {
    setIsAddStoryOpen(true);
  };

  const handleSaveStory = (storyData: StoryFormData) => {
    const newStory: Story = {
      id: Date.now().toString(),
      title: storyData.title,
      author: storyData.author,
      category: storyData.category as 'Financial' | 'Technology' | 'Health',
      keywords: storyData.keywords,
      status: storyData.status as 'Publish' | 'Draft',
    };
    
    setStories(prev => [newStory, ...prev]);
    setIsAddStoryOpen(false);
  };

  const handleCancelAddStory = () => {
    setIsAddStoryOpen(false);
  };

  const handleViewStory = (story: Story) => {
    setSelectedStory(story);
    setIsStoryDetailOpen(true);
  };

  const handleBackFromStoryDetail = () => {
    setIsStoryDetailOpen(false);
    setSelectedStory(null);
  };

  const handleEditStory = (story: Story) => {
    setSelectedStory(story);
    setIsEditStoryOpen(true);
  };

  const handleSaveEditStory = (storyId: string, storyData: StoryFormData) => {
    const updatedStory: Story = {
      id: storyId,
      title: storyData.title,
      author: storyData.author,
      synopsis: storyData.synopsis,
      category: storyData.category as 'Financial' | 'Technology' | 'Health',
      keywords: storyData.keywords,
      status: storyData.status as 'Publish' | 'Draft',
      chapters: storyData.chapters,
    };

    setStories(prev => prev.map(story => 
      story.id === storyId ? updatedStory : story
    ));
    setIsEditStoryOpen(false);
    setSelectedStory(null);
  };

  const handleCancelEditStory = () => {
    setIsEditStoryOpen(false);
    setSelectedStory(null);
  };

  return (
    <MainContainer>
      {isAddStoryOpen ? (
        <Box sx={{ flex: 1, width: '100%' }}>
          <AddStory
            onSave={handleSaveStory}
            onCancel={handleCancelAddStory}
          />
        </Box>
      ) : isStoryDetailOpen && selectedStory ? (
        <Box sx={{ flex: 1, width: '100%' }}>
          <StoryDetail
            story={selectedStory}
            onBack={handleBackFromStoryDetail}
          />
        </Box>
      ) : isEditStoryOpen && selectedStory ? (
        <Box sx={{ flex: 1, width: '100%' }}>
          <EditStory
            story={selectedStory}
            onSave={handleSaveEditStory}
            onCancel={handleCancelEditStory}
          />
        </Box>
      ) : (
        <ContentArea>
          <Header
            onSearch={handleSearch}
            onFilterClick={handleFilterClick}
            onAddStory={handleAddStory}
          />
          <StoryTable 
            stories={filteredStories} 
            onViewStory={handleViewStory}
            onEditStory={handleEditStory}
          />
        </ContentArea>
      )}

      <FilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilterApply}
        initialFilters={filters}
      />
    </MainContainer>
  );
};

export default StoryList; 