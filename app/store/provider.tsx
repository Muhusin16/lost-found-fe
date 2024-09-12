// app/providers.tsx
"use client"; // Ensure this is a client component

import { Provider } from 'react-redux';
import { store } from './store';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
