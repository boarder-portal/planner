import { FC, memo, useMemo } from 'react';

import { urls } from 'client/constants/urls';

import useSharedStoreValue from 'client/hooks/useSharedStoreValue';

import Flex from 'client/components/Flex/Flex';
import Link from 'client/components/Link/Link';
import Text from 'client/components/Text/Text';

import styles from './Home.module.scss';

const Home: FC = () => {
  const [user] = useSharedStoreValue('user');

  const content = useMemo(() => {
    if (!user) {
      return (
        <Text>
          {'Чтобы посмотреть расписание, '}

          <Link to={urls.login}>необходимо авторизоваться</Link>
        </Text>
      );
    }

    return null;
  }, [user]);

  return (
    <Flex className={styles.root} direction="column">
      {content}
    </Flex>
  );
};

export default memo(Home);
