import { Box } from '@radix-ui/themes';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Radix Box wrapper that replicates the `.wrapper` utility:
 * full width, max 83rem, centered, 1.5rem horizontal padding.
 * Use `as` to render a semantic element (main, section, aside, etc.).
 */
export default function LayoutContainer({
  children,
  className,
  as: Tag = 'div',
  ...props
}: Props) {
  return (
    <Box asChild width="100%" maxWidth="83rem" mx="auto" px="5">
      <Tag className={className} {...props}>
        {children}
      </Tag>
    </Box>
  );
}
