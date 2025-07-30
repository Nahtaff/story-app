import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  styled,
  Paper
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';
import { Chapter } from '../../../types';

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  width: '100%',
  height: '100vh',
  overflow: 'auto',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: theme.spacing(3),
  width: '100%',
}));

const FormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
}));

const BackButton = styled(Button)(({ theme }) => ({
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

const TextAreaContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface AddChapterProps {
  onSave: (chapter: Omit<Chapter, 'id' | 'lastUpdated'>) => void;
  onBack: () => void;
  initialData?: { title: string; content: string };
}

const AddChapter: React.FC<AddChapterProps> = ({
  onSave,
  onBack,
  initialData = { title: '', content: '' }
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({
        title: title.trim(),
        content: content.trim(),
      });
    }
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <Container>
      <FormContainer>
        <FormHeader>
          <FormTitle>Add New Chapter</FormTitle>
          <Box display="flex" gap={2}>
            <BackButton
              startIcon={<BackIcon />}
              onClick={onBack}
            >
              Back
            </BackButton>
            <SaveButton
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!isFormValid}
            >
              Save Chapter
            </SaveButton>
          </Box>
        </FormHeader>

        <TextField
          label="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <Typography variant="subtitle1" marginTop={3} marginBottom={1}>
          Story Chapter Content
        </Typography>
        
        <TextAreaContainer>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your chapter content here..."
            multiline
            rows={12}
            fullWidth
            variant="outlined"
          />
        </TextAreaContainer>
      </FormContainer>
    </Container>
  );
};

export default AddChapter; 