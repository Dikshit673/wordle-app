import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/theme/ThemeProvider.tsx';
import { ModalProvider } from './contexts/modal/ModalProvider.tsx';
import TabProvider from './contexts/tab/TabProvider.tsx';

const element = document.getElementById('root');
if (!element) {
  throw new Error('Root element not found');
}

createRoot(element).render(
  <ThemeProvider>
    <ModalProvider>
      <TabProvider>
        <App />
      </TabProvider>
    </ModalProvider>
  </ThemeProvider>
);
