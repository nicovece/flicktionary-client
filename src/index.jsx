import { createRoot } from 'react-dom/client';

import './index.scss';

// Define the FlicktionaryApp main component
const FlicktionaryApp = () => {
  return (
    <div className='flicktionary-app'>
      <h1>Flicktionary</h1>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

// Render the app into the root element
root.render(<FlicktionaryApp />);
