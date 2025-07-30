import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  styled
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import GeneralInformation from './GeneralInformation';
import ChapterList from './ChapterList';
import AddChapter from './AddChapter';
import { StoryFormData, Chapter } from '../../types';

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  width: '100%',
  height: '100vh',
  overflow: 'auto',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  color: '#333',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff6b35',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e55a2b',
  },
}));

const ConfirmationDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: theme.spacing(2),
  },
}));

interface AddStoryProps {
  onSave: (story: StoryFormData) => void;
  onCancel: () => void;
}

const AddStory: React.FC<AddStoryProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<StoryFormData>({
    title: '',
    author: '',
    synopsis: '',
    category: '',
    storyCover: null,
    keywords: [],
    status: '',
    chapters: [],
  });

  const [currentView, setCurrentView] = useState<'form' | 'addChapter'>('form');
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleFormDataChange = (data: Partial<StoryFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleAddChapter = () => {
    setCurrentView('addChapter');
  };

  const handleSaveChapter = (chapterData: Omit<Chapter, 'id' | 'lastUpdated'>) => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      ...chapterData,
      lastUpdated: new Date(),
    };

    if (editingChapter) {
      // Edit existing chapter
      setFormData(prev => ({
        ...prev,
        chapters: prev.chapters.map(chapter =>
          chapter.id === editingChapter.id
            ? { ...newChapter, id: editingChapter.id }
            : chapter
        ),
      }));
      setEditingChapter(null);
    } else {
      // Add new chapter
      setFormData(prev => ({
        ...prev,
        chapters: [...prev.chapters, newChapter],
      }));
    }

    setCurrentView('form');
  };

  const handleEditChapter = (chapterId: string) => {
    const chapter = formData.chapters.find(c => c.id === chapterId);
    if (chapter) {
      setEditingChapter(chapter);
      setCurrentView('addChapter');
    }
  };

  const handleDeleteChapter = (chapterId: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter(chapter => chapter.id !== chapterId),
    }));
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setEditingChapter(null);
  };

  const handleCancel = () => {
    const hasData = formData.title || formData.author || formData.chapters.length > 0;
    if (hasData) {
      setShowCancelDialog(true);
    } else {
      onCancel();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    onCancel();
  };

  const handleSave = () => {
    if (formData.title && formData.author && formData.category && formData.status) {
      onSave(formData);
    }
  };

  const isFormValid = formData.title && formData.author && formData.category && formData.status;

  if (currentView === 'addChapter') {
    return (
      <AddChapter
        onSave={handleSaveChapter}
        onBack={handleBackToForm}
        initialData={editingChapter ? { title: editingChapter.title, content: editingChapter.content } : undefined}
      />
    );
  }

  return (
    <Container>
      <Header>
        <PageTitle>Add New Story</PageTitle>
        <ActionButtons>
          <CancelButton
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            Cancel
          </CancelButton>
          <SaveButton
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save Story
          </SaveButton>
        </ActionButtons>
      </Header>

      <GeneralInformation
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />

      <ChapterList
        chapters={formData.chapters}
        onAddChapter={handleAddChapter}
        onEditChapter={handleEditChapter}
        onDeleteChapter={handleDeleteChapter}
      />

      <ConfirmationDialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Confirm Cancel
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel adding the story without saving the data?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>
            Continue Editing
          </Button>
          <Button onClick={handleConfirmCancel} color="error">
            Cancel
          </Button>
        </DialogActions>
      </ConfirmationDialog>
    </Container>
  );
};

export default AddStory; 