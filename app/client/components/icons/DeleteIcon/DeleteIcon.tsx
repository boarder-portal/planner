import { FC, memo } from 'react';
import { MdDelete } from 'react-icons/all';
import { IconBaseProps } from 'react-icons';

const DeleteIcon: FC<IconBaseProps> = (props) => {
  return <MdDelete {...props} />;
};

export default memo(DeleteIcon);
