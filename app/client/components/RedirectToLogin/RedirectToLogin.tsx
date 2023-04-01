import { FC, memo } from 'react';
import { Navigate } from 'react-router';

import useLoginLink from 'client/hooks/useLoginLink';

const RedirectToLogin: FC = () => {
  const loginLink = useLoginLink();

  return <Navigate to={loginLink} replace />;
};

export default memo(RedirectToLogin);
