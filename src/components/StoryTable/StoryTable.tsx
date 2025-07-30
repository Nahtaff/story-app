import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  styled,
  IconButton,
  Tooltip
} from '@mui/material';
import { Story } from '../../types';
import { Visibility as ViewIcon, Edit as EditIcon } from '@mui/icons-material';

const TableWrapper = styled(Paper)(({ theme }) => ({
  margin: 0,
  borderRadius: '0px',
  overflow: 'hidden',
  boxShadow: 'none',
  width: '100%',
  height: '100%',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  '& .MuiTableCell-head': {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    color: '#333',
    borderBottom: '2px solid #e0e0e0',
  },
  '& .MuiTableCell-body': {
    borderBottom: '1px solid #f0f0f0',
    padding: theme.spacing(1.5),
  },
}));

const KeywordChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  color: '#666',
  margin: theme.spacing(0.5),
  fontSize: '12px',
  height: '24px',
}));

const StatusChip = styled(Chip)<{ status: 'Publish' | 'Draft' }>(({ theme, status }) => ({
  backgroundColor: status === 'Publish' ? '#e8f5e8' : '#fff3cd',
  color: status === 'Publish' ? '#2e7d32' : '#856404',
  fontWeight: 'bold',
  fontSize: '12px',
  height: '24px',
}));

const NoDataText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: '#666',
}));

interface StoryTableProps {
  stories: Story[];
  onViewStory?: (story: Story) => void;
  onEditStory?: (story: Story) => void;
}

const StoryTable: React.FC<StoryTableProps> = ({ stories, onViewStory, onEditStory }) => {
  if (stories.length === 0) {
    return (
      <TableWrapper>
        <NoDataText>No stories found</NoDataText>
      </TableWrapper>
    );
  }

  return (
    <TableWrapper>
      <TableContainer sx={{ width: '100%' }}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Writers</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stories.map((story, index) => (
              <TableRow key={story.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {story.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {story.author}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {story.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {story.keywords.map((keyword, keywordIndex) => (
                      <KeywordChip
                        key={keywordIndex}
                        label={keyword}
                        size="small"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusChip
                    label={story.status}
                    status={story.status}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" gap={1} justifyContent="center">
                    {onViewStory && (
                      <Tooltip title="View Story Details">
                        <IconButton
                          size="small"
                          onClick={() => onViewStory(story)}
                          sx={{ color: '#1976d2' }}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onEditStory && (
                      <Tooltip title="Edit Story">
                        <IconButton
                          size="small"
                          onClick={() => onEditStory(story)}
                          sx={{ color: '#ff6b35' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </TableWrapper>
  );
};

export default StoryTable; 