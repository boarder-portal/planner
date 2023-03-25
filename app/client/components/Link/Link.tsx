import { FC, memo } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Link.module.scss';

interface Props extends Omit<LinkProps, 'to'> {
  to?: LinkProps['to'];
}

const Link: FC<Props> = (props) => {
  const { className, to, ...rest } = props;
  const rootClassName = classNames(styles.root, className);

  if (!to) {
    return <span className={rootClassName} {...rest} />;
  }

  return <RouterLink className={rootClassName} to={to} {...rest} />;
};

export default memo(Link);
