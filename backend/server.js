const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// In-memory data store (in production, use a database)
let stories = [
  {
    id: '1',
    title: 'The Moon that Can\'t be Seen',
    author: 'Rara',
    synopsis: 'A mysterious story about a moon that cannot be seen by anyone.',
    category: 'Technology',
    keywords: ['school', 'fiction'],
    status: 'Draft',
    chapters: [
      {
        id: '1',
        title: 'Chapter 1: The Beginning',
        content: 'This is the content of chapter 1...',
        lastUpdated: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Chapter 2: The Journey',
        content: 'This is the content of chapter 2...',
        lastUpdated: new Date('2024-01-20')
      }
    ]
  },
  {
    id: '2',
    title: 'Given',
    author: 'Sansa S.',
    synopsis: 'A story about music and its healing power.',
    category: 'Health',
    keywords: ['music'],
    status: 'Draft',
    chapters: [
      {
        id: '3',
        title: 'Chapter 1: Introduction',
        content: 'This is the content of chapter 1...',
        lastUpdated: new Date('2024-01-10')
      }
    ]
  }
];

// Utility function to find story by ID
const findStoryById = (id) => {
  return stories.find(story => story.id === id);
};

// Routes

// GET /api/stories - Get all stories
app.get('/api/stories', (req, res) => {
  try {
    const { search, category, status } = req.query;
    
    let filteredStories = [...stories];
    
    // Search filter
    if (search) {
      filteredStories = filteredStories.filter(story => 
        story.title.toLowerCase().includes(search.toLowerCase()) ||
        story.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Category filter
    if (category) {
      filteredStories = filteredStories.filter(story => 
        story.category === category
      );
    }
    
    // Status filter
    if (status) {
      filteredStories = filteredStories.filter(story => 
        story.status === status
      );
    }
    
    res.json({
      success: true,
      data: filteredStories,
      total: filteredStories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stories',
      error: error.message
    });
  }
});

// GET /api/stories/:id - Get story by ID
app.get('/api/stories/:id', (req, res) => {
  try {
    const story = findStoryById(req.params.id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching story',
      error: error.message
    });
  }
});

// POST /api/stories - Create new story
app.post('/api/stories', (req, res) => {
  try {
    const { title, author, synopsis, category, keywords, status, chapters } = req.body;
    
    // Validation
    if (!title || !author || !category || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, author, category, status'
      });
    }
    
    const newStory = {
      id: Date.now().toString(),
      title,
      author,
      synopsis: synopsis || '',
      category,
      keywords: keywords || [],
      status,
      chapters: chapters || []
    };
    
    stories.unshift(newStory);
    
    res.status(201).json({
      success: true,
      data: newStory,
      message: 'Story created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating story',
      error: error.message
    });
  }
});

// PUT /api/stories/:id - Update story
app.put('/api/stories/:id', (req, res) => {
  try {
    const storyIndex = stories.findIndex(story => story.id === req.params.id);
    
    if (storyIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    const { title, author, synopsis, category, keywords, status, chapters } = req.body;
    
    // Validation
    if (!title || !author || !category || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, author, category, status'
      });
    }
    
    const updatedStory = {
      ...stories[storyIndex],
      title,
      author,
      synopsis: synopsis || '',
      category,
      keywords: keywords || [],
      status,
      chapters: chapters || []
    };
    
    stories[storyIndex] = updatedStory;
    
    res.json({
      success: true,
      data: updatedStory,
      message: 'Story updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating story',
      error: error.message
    });
  }
});

// DELETE /api/stories/:id - Delete story
app.delete('/api/stories/:id', (req, res) => {
  try {
    const storyIndex = stories.findIndex(story => story.id === req.params.id);
    
    if (storyIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    const deletedStory = stories.splice(storyIndex, 1)[0];
    
    res.json({
      success: true,
      data: deletedStory,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting story',
      error: error.message
    });
  }
});

// GET /api/categories - Get available categories
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: ['Financial', 'Technology', 'Health']
  });
});

// GET /api/statuses - Get available statuses
app.get('/api/statuses', (req, res) => {
  res.json({
    success: true,
    data: ['Publish', 'Draft']
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Story App API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Story App Backend running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/health`);
});

module.exports = app; 