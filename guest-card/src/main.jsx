import React from 'react';
import {createRoot} from 'react-dom/client';
import {intl} from '@reactor/intl';
import {translations} from '@reactor/reactor';
import App from './App.jsx';
import './styles.css';
import '@fontsource/roboto-condensed/cyrillic-300.css';
import '@fontsource/roboto-condensed/latin-300.css';
async function start() {
  await intl.Module.init({locale: 'ru-RU', translations: [translations]});
  createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
}
start().catch(error => {
  document.getElementById('root').textContent = 'Не удалось загрузить интерфейс. Обновите страницу.';
  console.error(error);
});
