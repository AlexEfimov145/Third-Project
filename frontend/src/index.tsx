import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import interceptors from './utils/Interceptors';


interceptors.create();


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);


reportWebVitals();
