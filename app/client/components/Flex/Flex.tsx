import { ComponentProps, forwardRef, memo } from 'react';
import classNames from 'classnames';

import styles from './Flex.module.scss';

export interface Props extends ComponentProps<'div'> {
  className?: string;
  direction?: 'row' | 'rowReverse' | 'column' | 'columnReverse';
  justifyContent?: 'center' | 'flexStart' | 'flexEnd' | 'spaceBetween';
  alignItems?: 'center' | 'flexStart' | 'flexEnd' | 'stretch' | 'baseline';
  wrap?: 'wrap' | 'nowrap';
  between?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  inline?: boolean;
}

const Flex = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const {
    className,
    children,
    direction = 'row',
    justifyContent,
    alignItems,
    wrap,
    between,
    inline,
    style,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        styles.root,
        inline && styles.inline,
        styles[`direction_${direction}`],
        justifyContent && styles[`justifyContent_${justifyContent}`],
        alignItems && styles[`alignItems_${alignItems}`],
        wrap && styles[`wrap_${wrap}`],
        className,
      )}
      ref={ref}
      style={{
        ...style,
        '--between': between,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';

export default memo(Flex);
