import React from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  styled
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Chapter } from '../../../types';
import { formatDate } from '../../../utils/dateUtils';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: theme.spacing(3),
  border: '1px solid #e0e0e0',
  width: '100%',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
}));

const NewChapterButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff6b35',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e55a2b',
  },
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

const ActionButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

interface ChapterListProps {
  chapters: Chapter[];
  onAddChapter: () => void;
  onEditChapter: (chapterId: string) => void;
  onDeleteChapter: (chapterId: string) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Chapter List</SectionTitle>
        <NewChapterButton
          startIcon={<AddIcon />}
          onClick={onAddChapter}
        >
          New Chapter
        </NewChapterButton>
      </SectionHeader>

      {chapters.length === 0 ? (
        <Box textAlign="center" padding={4}>
          <Typography variant="body2" color="textSecondary">
            No chapters added yet. Click "New Chapter" to add your first chapter.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Chapter Title</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chapters.map((chapter) => (
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
                  <TableCell align="center">
                    <ActionButton
                      size="small"
                      onClick={() => onEditChapter(chapter.id)}
                    >
                      <EditIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton
                      size="small"
                      onClick={() => onDeleteChapter(chapter.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      )}
    </SectionContainer>
  );
};

export default ChapterList;