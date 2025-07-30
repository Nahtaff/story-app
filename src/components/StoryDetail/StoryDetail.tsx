import React from 'react';
import {
  Box,
  Button,
  Typography,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  ArrowBack as BackIcon
} from '@mui/icons-material';
import { Story } from '../../types';

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

const BackButton = styled(Button)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  color: '#333',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

interface StoryDetailProps {
  story: Story;
  onBack: () => void;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story, onBack }) => {
  return (
    <Container>
      <Header>
        <PageTitle>Story Detail</PageTitle>
        <BackButton
          startIcon={<BackIcon />}
          onClick={onBack}
        >
          Back to Story List
        </BackButton>
      </Header>

      <GeneralInformationView story={story} />
      <ChapterListView story={story} />
    </Container>
  );
};

// View-only General Information Component
const GeneralInformationView: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <SectionContainer>
      <SectionTitle>General Information</SectionTitle>

      <FormRow>
        <InfoField>
          <InfoLabel>Title</InfoLabel>
          <InfoValue>{story.title}</InfoValue>
        </InfoField>
        <InfoField>
          <InfoLabel>Author</InfoLabel>
          <InfoValue>{story.author}</InfoValue>
        </InfoField>
      </FormRow>

      <InfoField>
        <InfoLabel>Synopsis</InfoLabel>
        <InfoValue>{story.synopsis || 'No synopsis available'}</InfoValue>
      </InfoField>

      <FormRow>
        <InfoField>
          <InfoLabel>Category</InfoLabel>
          <InfoValue>{story.category}</InfoValue>
        </InfoField>
        <InfoField>
          <InfoLabel>Status</InfoLabel>
          <InfoValue>{story.status}</InfoValue>
        </InfoField>
      </FormRow>

      <Box marginBottom={3}>
        <Typography variant="subtitle1" marginBottom={1}>
          Tags/Keywords
        </Typography>
        <KeywordsContainer>
          {story.keywords.map((keyword, index) => (
            <KeywordChip key={index}>
              {keyword}
            </KeywordChip>
          ))}
        </KeywordsContainer>
      </Box>
    </SectionContainer>
  );
};

// View-only Chapter List Component
const ChapterListView: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Chapter List</SectionTitle>
      </SectionHeader>

      {story.chapters && story.chapters.length > 0 ? (
        <TableContainer component={Paper} elevation={0}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Chapter Title</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {story.chapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {chapter.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(chapter.lastUpdated)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      ) : (
        <Box textAlign="center" padding={4}>
          <Typography variant="body2" color="textSecondary">
            No chapters available for this story.
          </Typography>
        </Box>
      )}
    </SectionContainer>
  );
};

// Styled Components
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

const InfoField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#666',
  marginBottom: theme.spacing(0.5),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#333',
  padding: theme.spacing(1),
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  border: '1px solid #e0e0e0',
}));

const KeywordsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const KeywordChip = styled(Box)(({ theme }) => ({
  backgroundColor: '#e3f2fd',
  color: '#1976d2',
  padding: theme.spacing(0.5, 1),
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: 'medium',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    color: '#333',
  },
  '& .MuiTableCell-body': {
    borderBottom: '1px solid #f0f0f0',
  },
}));

import { formatDate } from '../../utils/dateUtils';

export default StoryDetail; 