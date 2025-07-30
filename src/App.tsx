import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import StoryList from './components/StoryList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        <Sidebar />
        <StoryList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
