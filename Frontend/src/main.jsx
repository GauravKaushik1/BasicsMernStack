import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './CSS/ResponsiveMediaQuerry.css'
import { TokenProvider } from './store/tokenDistributor.jsx';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
          <TokenProvider>
            
                <App />
                  
                  
                  
                  <ToastContainer 
                    position="top-righta"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    bodyClassName="toastBody"
                    />
            
          
          </TokenProvider>
      </React.StrictMode>
);
