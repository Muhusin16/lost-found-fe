// app/providers.tsx
"use client"; // Ensure this is a client component

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store'; // Make sure to import the store and persistor

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
