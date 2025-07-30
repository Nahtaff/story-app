import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  styled
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon
} from '@mui/icons-material';

const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#fff',
  width: '100%',
  margin: 0,
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: '#333',
}));

const ControlBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  width: '100%',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flex: 1,
  maxWidth: 600,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
  },
}));

const FilterButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  border: '1px solid #e0e0e0',
  borderRadius: '50%',
  width: 48,
  height: 48,
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff6b35',
  color: '#fff',
  borderRadius: '8px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#e55a2b',
  },
}));

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  onAddStory: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onFilterClick, onAddStory }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>Stories</HeaderTitle>
      
      <ControlBar>
        <SearchContainer>
          <SearchField
            placeholder="Search by Writers / Title"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => onSearch(e.target.value)}
          />
          
          <FilterButton onClick={onFilterClick}>
            <FilterIcon />
          </FilterButton>
        </SearchContainer>
        
        <AddButton
          startIcon={<AddIcon />}
          onClick={onAddStory}
        >
          Add Story
        </AddButton>
      </ControlBar>
    </HeaderContainer>
  );
};

export default Header; 