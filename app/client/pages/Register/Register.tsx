import { FC, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authHttpClient from 'client/utilities/HttpClient/AuthHttpClient';
import { getClientTimezone } from 'client/utilities/date';

import usePromise from 'client/hooks/usePromise';
import useSharedStoreValue from 'client/hooks/useSharedStoreValue';

import Flex from 'client/components/Flex/Flex';
import Heading from 'client/components/Heading/Heading';
import Input from 'client/components/Input/Input';
import Button from 'client/components/Button/Button';
import Text from 'client/components/Text/Text';

import styles from './Register.module.scss';

const Register: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [, setUser] = useSharedStoreValue('user');

  const loginInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const {
    run: register,
    isLoading,
    isError,
  } = usePromise((signal) =>
    authHttpClient.register(
      {
        login,
        password,
        timezone: getClientTimezone(),
      },
      signal,
    ),
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const { user } = await register();

      setUser(user);
      navigate('/');
    },
    [navigate, register, setUser],
  );

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  return (
    <Flex className={styles.root} direction="column" alignItems="center" justifyContent="center" between={3}>
      <Heading level={1}>Регистрация</Heading>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input ref={loginInputRef} required type="text" placeholder="Логин" value={login} onChange={setLogin} />

        <Input required type="password" placeholder="Пароль" value={password} onChange={setPassword} />

        <Button disabled={isLoading}>
          <Text>Регистрация</Text>
        </Button>

        <Text className={styles.error} color="error">
          {isError ? 'Ошибка регистрации' : '\u00a0'}
        </Text>
      </form>
    </Flex>
  );
};

export default memo(Register);
