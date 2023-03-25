import { ComponentProps, forwardRef, memo } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props extends ComponentProps<'button'> {}

const Button = forwardRef<HTMLButtonElement | null, Props>((props, ref) => {
  const { className, ...rest } = props;

  return <button className={classNames(styles.root, className)} ref={ref} {...rest} />;
});

Button.displayName = 'Button';

export default memo(Button);
