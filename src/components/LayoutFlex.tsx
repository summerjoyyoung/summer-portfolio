import { Flex } from '@radix-ui/themes';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Flex>;

/**
 * Radix Flex wrapper with `direction="column"` as default.
 * Replaces the `.stack` utility class pattern.
 * All Flex props (gap, align, justify, as, className, style, etc.) are forwarded.
 */
export default function LayoutFlex({ direction = 'column', children, ...props }: Props) {
  return (
    <Flex direction={direction} {...props}>
      {children}
    </Flex>
  );
}
