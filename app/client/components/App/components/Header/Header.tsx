import { FC, memo, useCallback } from 'react';

import { urls } from 'client/constants/urls';

import authHttpClient from 'client/utilities/HttpClient/AuthHttpClient';

import usePromise from 'client/hooks/usePromise';
import useSharedStoreValue from 'client/hooks/useSharedStoreValue';

import Flex from 'client/components/Flex/Flex';
import Link from 'client/components/Link/Link';
import Text from 'client/components/Text/Text';

import styles from './Header.module.scss';

interface Props {}

const Header: FC<Props> = () => {
  const [user, setUser] = useSharedStoreValue('user');

  const { run: logout } = usePromise((signal) => authHttpClient.logout(signal));

  const handleLogoutClick = useCallback(async () => {
    await logout();

    setUser(null);
  }, [logout, setUser]);

  return (
    <header className={styles.root}>
      <Flex className={styles.content} alignItems="center" justifyContent="spaceBetween" between={4}>
        <Link to={urls.home}>
          <Text size="xl" weight="bold">
            Planner
          </Text>
        </Link>

        {user ? (
          <Link onClick={handleLogoutClick}>Выйти</Link>
        ) : (
          <Flex between={4}>
            <Link to={urls.register}>Регистрация</Link>
            <Link to={urls.login}>Войти</Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default memo(Header);
