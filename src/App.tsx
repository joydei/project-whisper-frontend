import { BrowserRouter } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <PostsProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PostsProvider>
  );
}

export default App;
