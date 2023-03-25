import { ComponentProps, forwardRef, memo } from 'react';
import classNames from 'classnames';

import styles from './Heading.module.scss';

interface Props extends ComponentProps<'h1'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = forwardRef<HTMLHeadingElement | null, Props>((props, ref) => {
  const { className, level, ...rest } = props;

  const Component = `h${level}` as const;

  return <Component className={classNames(styles.root, className)} ref={ref} {...rest} />;
});

Heading.displayName = 'Heading';

export default memo(Heading);
