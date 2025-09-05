import { MyToastContainer } from './components/MyToastContainer';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { Router } from './router';
import './styles/global.css';
import './styles/theme.css';

export function App() {
  return (
    <TaskContextProvider>
      <MyToastContainer>
        <Router />
      </MyToastContainer>
    </TaskContextProvider>
  );
}
