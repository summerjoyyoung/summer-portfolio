import { Box } from '@radix-ui/themes';
import type { ComponentProps, ElementType, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  px?: ComponentProps<typeof Box>['px'];
}

/**
 * Radix Box wrapper that replicates the `.wrapper` utility:
 * full width, max 1328px, centered, 24px horizontal padding.
 * Use `as` to render a semantic element (main, section, aside, etc.).
 * Use `px` to override the default horizontal padding (Radix spacing tokens).
 */
export default function LayoutContainer({
  children,
  className,
  as: Tag = 'div',
  px = { initial: '5', md: '8' },
  ...props
}: Props) {
  return (
    <Box asChild width="100%" maxWidth="1328px" mx="auto" px={px}>
      <Tag className={className} {...props}>
        {children}
      </Tag>
    </Box>
  );
}
