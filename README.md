# Story Management Application

A full-stack React application for managing stories with features like search, filter, add, edit, and view story details.

## 🚀 Features

### Frontend (React + TypeScript + Material-UI)
- **Story List**: Display stories in a table with search and filter functionality
- **Add Story**: Create new stories with general information and chapter management
- **Edit Story**: Modify existing stories with auto-filled data
- **Story Detail**: View-only mode for story information
- **Responsive Design**: Modern UI with Material-UI components
- **Type Safety**: Full TypeScript implementation

### Backend (Express.js)
- **RESTful API**: Complete CRUD operations for stories
- **Search & Filter**: Server-side filtering and search
- **Input Validation**: Comprehensive validation and error handling
- **Security**: Helmet.js, CORS, and security middleware
- **Testing**: Comprehensive test coverage

## 🛠️ Tech Stack

### Frontend
- React 19.1.1
- TypeScript 4.9.5
- Material-UI 7.2.0
- React Router DOM 7.7.1

### Backend
- Express.js 4.18.2
- Node.js
- Jest (Testing)
- Supertest (API Testing)

## 📁 Project Structure

```
story-app/
├── src/
│   ├── components/
│   │   ├── AddStory/          # Add Story feature
│   │   ├── EditStory/         # Edit Story feature
│   │   ├── FilterModal/       # Filter popup modal
│   │   ├── Header/            # Page header with search
│   │   ├── Sidebar/           # Navigation sidebar
│   │   ├── StoryDetail/       # View Story details
│   │   ├── StoryList/         # Main story list component
│   │   └── StoryTable/        # Story table component
│   ├── data/
│   │   └── stories.ts         # Mock data
│   ├── services/
│   │   └── api.ts            # API service layer
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   ├── dateUtils.ts      # Date formatting utilities
│   │   └── dateUtils.test.ts # Date utility tests
│   └── App.tsx               # Main application component
├── backend/
│   ├── server.js             # Express server
│   ├── server.test.js        # API tests
│   ├── package.json          # Backend dependencies
│   └── README.md            # Backend documentation
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
```bash
cd story-app
npm install
```

2. **Start development server:**
```bash
npm start
```

3. **Run tests:**
```bash
npm test
```

### Backend Setup

1. **Install backend dependencies:**
```bash
cd story-app/backend
npm install
```

2. **Start backend server:**
```bash
npm run dev
```

3. **Run backend tests:**
```bash
npm test
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stories` | Get all stories (with optional filters) |
| GET | `/stories/:id` | Get story by ID |
| POST | `/stories` | Create new story |
| PUT | `/stories/:id` | Update story |
| DELETE | `/stories/:id` | Delete story |
| GET | `/categories` | Get available categories |
| GET | `/statuses` | Get available statuses |
| GET | `/health` | Health check |

### Example API Usage

```javascript
// Get all stories
GET /api/stories

// Search stories
GET /api/stories?search=moon&category=Technology&status=Draft

// Create story
POST /api/stories
{
  "title": "New Story",
  "author": "Author Name",
  "category": "Technology",
  "status": "Draft",
  "keywords": ["tag1", "tag2"],
  "chapters": []
}
```

## 🧪 Testing

### Frontend Tests
- Component unit tests with React Testing Library
- Utility function tests
- Mock data and API testing

### Backend Tests
- API endpoint integration tests
- Error handling tests
- Input validation tests

Run all tests:
```bash
# Frontend tests
npm test

# Backend tests
cd backend && npm test
```

## 🎨 Features in Detail

### 1. Story List
- **Search**: Search by title or author
- **Filter**: Filter by category and status via modal
- **Table Display**: Responsive table with action buttons
- **Pagination**: Ready for pagination implementation

### 2. Add Story
- **General Information**: Title, author, synopsis, category, status
- **File Upload**: Story cover image upload
- **Keywords**: Multi-tag input system
- **Chapter Management**: Add, edit, delete chapters
- **Rich Text Editor**: Text area for chapter content

### 3. Edit Story
- **Auto-fill**: All fields pre-populated with existing data
- **Validation**: Form validation and error handling
- **Confirmation**: Cancel confirmation for unsaved changes
- **Chapter Editing**: Full chapter management

### 4. Story Detail
- **View-only**: Read-only display of story information
- **Chapter List**: Display chapters in table format
- **Navigation**: Back to story list functionality

## 🔧 Development

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Clean Code**: Proper indentation and structure
- **Comments**: Clear documentation

### Performance
- **React.memo**: Optimized component rendering
- **useMemo**: Memoized expensive calculations
- **Lazy Loading**: Ready for code splitting

### Security
- **Input Validation**: Frontend and backend validation
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Real-time updates with WebSocket
- [ ] File upload for story covers
- [ ] Advanced search with full-text search
- [ ] Export stories to PDF/Word
- [ ] Story analytics and insights
- [ ] Mobile app with React Native
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

## Link Youtube

https://youtu.be/oiI76MYssD8
