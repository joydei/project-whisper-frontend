import { BrowserRouter } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <UserProvider>
      <PostsProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PostsProvider>
    </UserProvider>
  );
}

export default App;
