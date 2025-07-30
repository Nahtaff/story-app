const request = require('supertest');
const app = require('./server');

describe('Story App API', () => {
  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Story App API is running');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/stories', () => {
    test('should return all stories', async () => {
      const response = await request(app).get('/api/stories');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.total).toBeDefined();
    });

    test('should filter stories by search query', async () => {
      const response = await request(app).get('/api/stories?search=moon');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].title.toLowerCase()).toContain('moon');
    });

    test('should filter stories by category', async () => {
      const response = await request(app).get('/api/stories?category=Technology');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.every(story => story.category === 'Technology')).toBe(true);
    });

    test('should filter stories by status', async () => {
      const response = await request(app).get('/api/stories?status=Draft');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.every(story => story.status === 'Draft')).toBe(true);
    });
  });

  describe('GET /api/stories/:id', () => {
    test('should return story by ID', async () => {
      const response = await request(app).get('/api/stories/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('1');
    });

    test('should return 404 for non-existent story', async () => {
      const response = await request(app).get('/api/stories/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Story not found');
    });
  });

  describe('POST /api/stories', () => {
    test('should create new story', async () => {
      const newStory = {
        title: 'Test Story',
        author: 'Test Author',
        synopsis: 'Test synopsis',
        category: 'Technology',
        keywords: ['test'],
        status: 'Draft',
        chapters: []
      };

      const response = await request(app)
        .post('/api/stories')
        .send(newStory);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(newStory.title);
      expect(response.body.data.author).toBe(newStory.author);
      expect(response.body.message).toBe('Story created successfully');
    });

    test('should return 400 for missing required fields', async () => {
      const invalidStory = {
        title: 'Test Story',
        // Missing author, category, status
      };

      const response = await request(app)
        .post('/api/stories')
        .send(invalidStory);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Missing required fields');
    });
  });

  describe('PUT /api/stories/:id', () => {
    test('should update existing story', async () => {
      const updatedData = {
        title: 'Updated Story Title',
        author: 'Updated Author',
        synopsis: 'Updated synopsis',
        category: 'Health',
        keywords: ['updated'],
        status: 'Publish',
        chapters: []
      };

      const response = await request(app)
        .put('/api/stories/1')
        .send(updatedData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updatedData.title);
      expect(response.body.data.author).toBe(updatedData.author);
      expect(response.body.message).toBe('Story updated successfully');
    });

    test('should return 404 for non-existent story', async () => {
      const response = await request(app)
        .put('/api/stories/999')
        .send({
          title: 'Test',
          author: 'Test',
          category: 'Technology',
          status: 'Draft'
        });
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Story not found');
    });
  });

  describe('DELETE /api/stories/:id', () => {
    test('should delete existing story', async () => {
      const response = await request(app).delete('/api/stories/2');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('2');
      expect(response.body.message).toBe('Story deleted successfully');
    });

    test('should return 404 for non-existent story', async () => {
      const response = await request(app).delete('/api/stories/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Story not found');
    });
  });

  describe('GET /api/categories', () => {
    test('should return available categories', async () => {
      const response = await request(app).get('/api/categories');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toContain('Financial');
      expect(response.body.data).toContain('Technology');
      expect(response.body.data).toContain('Health');
    });
  });

  describe('GET /api/statuses', () => {
    test('should return available statuses', async () => {
      const response = await request(app).get('/api/statuses');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toContain('Publish');
      expect(response.body.data).toContain('Draft');
    });
  });

  describe('404 handler', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/nonexistent');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Route not found');
    });
  });
}); 