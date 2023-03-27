import { ComponentProps, FC, forwardRef, memo, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Text.module.scss';

interface Props extends Omit<ComponentProps<'span'>, 'ref'> {
  className?: string;
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  weight?: 'normal' | 'bold';
  color?: 'normal' | 'error';
  withEllipsis?: boolean;
  children?: ReactNode;
}

const Text: FC<Props> = forwardRef<HTMLSpanElement | null, Props>((props, ref) => {
  const { className, size = 'm', weight = 'normal', color = 'normal', withEllipsis, children, ...restProps } = props;

  return (
    <span
      className={classNames(
        styles.root,
        styles[`size_${size}`],
        styles[`weight_${weight}`],
        styles[`color_${color}`],
        { [styles.withEllipsis]: withEllipsis },
        className,
      )}
      ref={ref}
      {...restProps}
    >
      {children}
    </span>
  );
});

Text.displayName = 'Text';

export default memo(Text);
