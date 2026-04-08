import { Theme } from '@radix-ui/themes';
import type { ReactNode } from 'react';

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <Theme appearance="inherit" accentColor="purple" grayColor="slate" panelBackground="translucent">
      {children}
    </Theme>
  );
}
