import React from 'react';
import {  RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ModalProvider from './providers/ModalProvider';
import { Provider } from 'react-redux';
import store from './store/store';
import router from './routes/Routers';



const App: React.FC = () => {
  return (
    <Provider store={store}>
        <ModalProvider>
        <RouterProvider router={router} />
        </ModalProvider>
      <Toaster position="top-right" />
    </Provider>

  );
};


export default App;
