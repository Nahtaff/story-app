import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  styled
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { FilterState } from '../../types';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: theme.spacing(2),
    minWidth: 400,
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: '#333',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
}));

const ResetButton = styled(Button)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  color: '#333',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  color: '#333',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff6b35',
  color: '#fff',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#e55a2b',
  },
}));

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onFilter,
  initialFilters = { category: '', status: '' }
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleReset = () => {
    setFilters({ category: '', status: '' });
  };

  const handleFilter = () => {
    onFilter(filters);
    onClose();
  };

  const handleClose = () => {
    setFilters(initialFilters);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogHeader>
        <Typography variant="h6" fontWeight="bold">
          Filter
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <DialogContent>
        <FilterSection>
          <SectionTitle>Category</SectionTitle>
          <FormControl fullWidth>
            <Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              displayEmpty
            >
              <MenuItem value="">Category</MenuItem>
              <MenuItem value="Financial">Financial</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
            </Select>
          </FormControl>
        </FilterSection>

        <FilterSection>
          <SectionTitle>Status</SectionTitle>
          <FormControl fullWidth>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              displayEmpty
            >
              <MenuItem value="">Status</MenuItem>
              <MenuItem value="Publish">Publish</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </Select>
          </FormControl>
        </FilterSection>
      </DialogContent>

      <DialogActions>
        <ActionButtons>
          <ResetButton onClick={handleReset}>
            Reset
          </ResetButton>
          <CancelButton onClick={handleClose}>
            Cancel
          </CancelButton>
          <FilterButton onClick={handleFilter}>
            Filter
          </FilterButton>
        </ActionButtons>
      </DialogActions>
    </StyledDialog>
  );
};

export default FilterModal; 