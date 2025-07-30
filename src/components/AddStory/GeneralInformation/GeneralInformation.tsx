import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Chip,
  styled,
  IconButton
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { StoryFormData } from '../../../types';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: theme.spacing(3),
  border: '1px solid #e0e0e0',
  width: '100%',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  color: '#333',
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  '& > *': {
    flex: 1,
  },
}));

const FileUploadContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed #e0e0e0',
  borderRadius: '8px',
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#1976d2',
    backgroundColor: '#f8f9fa',
  },
}));

const KeywordsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const KeywordChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  '& .MuiChip-deleteIcon': {
    color: '#1976d2',
  },
}));

interface GeneralInformationProps {
  formData: StoryFormData;
  onFormDataChange: (data: Partial<StoryFormData>) => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({
  formData,
  onFormDataChange,
}) => {
  const [newKeyword, setNewKeyword] = useState('');

  const handleInputChange = (field: keyof StoryFormData, value: any) => {
    onFormDataChange({ [field]: value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('storyCover', file);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      handleInputChange('keywords', [...formData.keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    handleInputChange(
      'keywords',
      formData.keywords.filter(keyword => keyword !== keywordToRemove)
    );
  };

  const handleKeywordKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <SectionContainer>
      <SectionTitle>General Information</SectionTitle>

      <FormRow>
        <TextField
          label="Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Author"
          value={formData.author}
          onChange={(e) => handleInputChange('author', e.target.value)}
          fullWidth
          required
        />
      </FormRow>

      <TextField
        label="Synopsis"
        value={formData.synopsis}
        onChange={(e) => handleInputChange('synopsis', e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <FormRow>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            label="Category"
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Financial">Financial</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            label="Status"
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Publish">Publish</MenuItem>
          </Select>
        </FormControl>
      </FormRow>

      <Box marginBottom={3}>
        <Typography variant="subtitle1" marginBottom={1}>
          Story Cover
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="story-cover-upload"
        />
        <label htmlFor="story-cover-upload">
          <FileUploadContainer>
            <UploadIcon sx={{ fontSize: 48, color: '#666', marginBottom: 2 }} />
            <Typography variant="body2" color="textSecondary">
              Click to upload story cover image
            </Typography>
            {formData.storyCover && (
              <Typography variant="body2" color="primary" marginTop={1}>
                Selected: {formData.storyCover.name}
              </Typography>
            )}
          </FileUploadContainer>
        </label>
      </Box>

      <Box>
        <Typography variant="subtitle1" marginBottom={1}>
          Tags/Keywords
        </Typography>
        <TextField
          label="Add keyword"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyPress={handleKeywordKeyPress}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <Button
                onClick={handleAddKeyword}
                disabled={!newKeyword.trim()}
                size="small"
              >
                Add
              </Button>
            ),
          }}
        />
        <KeywordsContainer>
          {formData.keywords.map((keyword, index) => (
            <KeywordChip
              key={index}
              label={keyword}
              onDelete={() => handleRemoveKeyword(keyword)}
              deleteIcon={<CloseIcon />}
            />
          ))}
        </KeywordsContainer>
      </Box>
    </SectionContainer>
  );
};

export default GeneralInformation; 