import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * The shared content column: full width, capped and centered, with the
 * standard horizontal padding. Sizes itself from the `--content-*` tokens in
 * global.css so it lines up with the nav and the case-study layout.
 * Use `as` to render a semantic element (main, section, aside, etc.).
 */
export default function LayoutContainer({
  children,
  className,
  as: Tag = 'div',
  ...props
}: Props) {
  return (
    <Tag
      className={className ? `content-column ${className}` : 'content-column'}
      {...props}
    >
      {children}
    </Tag>
  );
}
