import { ChangeEvent, ComponentProps, forwardRef, memo, useCallback } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface Props extends Omit<ComponentProps<'input'>, 'onChange'> {
  value?: string | number;
  onChange?(value: string): void;
}

const Input = forwardRef<HTMLInputElement | null, Props>((props, ref) => {
  const { className, value, onChange, ...rest } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      className={classNames(styles.root, className)}
      ref={ref}
      value={value}
      onChange={onChange && handleChange}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default memo(Input);
