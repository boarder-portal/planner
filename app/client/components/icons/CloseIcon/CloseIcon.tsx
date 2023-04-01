import { FC, memo } from 'react';
import { MdClose } from 'react-icons/all';
import { IconBaseProps } from 'react-icons';

const CloseIcon: FC<IconBaseProps> = (props) => {
  return <MdClose {...props} />;
};

export default memo(CloseIcon);
