import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { theme } from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>

);
