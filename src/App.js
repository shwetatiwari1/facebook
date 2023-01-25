import logo from './logo.svg';
import { themeSettings } from './theme';
import useMediaQuery from '@mui/material';
import { BrowserRouter} from 'react-router-dom'
import './App.css';
import { Notifications } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Form } from './Scenes/LoginPage/form';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import Router from './Router';
function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const [mode, setMode] = useState('light');

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <Notifications />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
     <Router/>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
