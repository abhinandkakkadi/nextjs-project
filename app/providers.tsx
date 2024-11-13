'use client';
import { ThemeProvider } from './theme-provider';

import React from 'react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  );
}

export default Providers;
