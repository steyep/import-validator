import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/global.scss';
import Layout from '../components/layout/layout';
import reportWebVitals from '../reportWebVitals';
import Importer from '../components/importer/importer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
      <Importer/>
    </Layout>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
