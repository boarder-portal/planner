import { FC, memo } from 'react';

import Flex from 'client/components/Flex/Flex';

import styles from './Home.module.scss';

const Home: FC = () => {
  return <Flex className={styles.root} direction="column"></Flex>;
};

export default memo(Home);
