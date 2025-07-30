import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  styled 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon 
} from '@mui/icons-material';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 250,
  height: '100vh',
  backgroundColor: '#f8f9fa',
  borderRight: '1px solid #e0e0e0',
  padding: theme.spacing(2),
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1976d2',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const MenuItem = styled(ListItem)<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: active ? '#e3f2fd' : 'transparent',
  color: active ? '#1976d2' : '#666',
  '&:hover': {
    backgroundColor: active ? '#e3f2fd' : '#f5f5f5',
  },
}));

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>
        📚 STORYKU
      </Logo>
      
      <List>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>
        
        <MenuItem active>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Story Management" />
        </MenuItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar; 