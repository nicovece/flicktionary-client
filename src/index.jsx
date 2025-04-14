import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';
import MainView from './components/main-view/main-view';
import { BrowserRouter } from 'react-router-dom';
import MainViewContent from './components/main-view/main-view';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <MainView />
    </BrowserRouter>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
