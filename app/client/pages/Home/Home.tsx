import { FC, memo, useMemo } from 'react';

import { urls } from 'client/constants/urls';

import useSharedStoreValue from 'client/hooks/useSharedStoreValue';
import useLoginLink from 'client/hooks/useLoginLink';

import Flex from 'client/components/Flex/Flex';
import Link from 'client/components/Link/Link';
import Text from 'client/components/Text/Text';

import styles from './Home.module.scss';

const Home: FC = () => {
  const [user] = useSharedStoreValue('user');

  const loginLink = useLoginLink();

  const content = useMemo(() => {
    if (!user) {
      return (
        <span>
          <Text>Чтобы посмотреть расписание, </Text>

          <Link to={loginLink}>
            <Text>необходимо авторизоваться</Text>
          </Link>
        </span>
      );
    }

    return (
      <Flex direction="column" between={2}>
        <Link to={urls.actionTags}>Теги</Link>
      </Flex>
    );
  }, [loginLink, user]);

  return (
    <Flex className={styles.root} direction="column">
      {content}
    </Flex>
  );
};

export default memo(Home);
