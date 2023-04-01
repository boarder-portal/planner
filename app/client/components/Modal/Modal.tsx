import { FC, useCallback, MouseEvent, ReactNode, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { modalsElement } from 'client/constants/dom';

import Flex from 'client/components/Flex/Flex';
import CloseIcon from 'client/components/icons/CloseIcon/CloseIcon';
import Heading from 'client/components/Heading/Heading';

import styles from './Modal.module.scss';

export interface CommonModalProps {
  open: boolean;
  onClose?(): void;
}

interface Props extends CommonModalProps {
  className?: string;
  title?: string;
  children: ReactNode;
  onScroll?(): void;
}

const Modal: FC<Props> = (props) => {
  const { className, open, title, children, onClose, onScroll } = props;

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleOverlayClick = useCallback(
    (e: MouseEvent<Node>) => {
      if (e.target === overlayRef.current) {
        onClose?.();
      }
    },
    [onClose],
  );

  const content = (
    <div
      className={classNames(styles.overlay, { [styles.open]: open }, className)}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <Flex className={styles.container} direction="column" onScroll={onScroll}>
        {title && (
          <Flex className={styles.header} alignItems="center" justifyContent="spaceBetween">
            <Heading level={3}>{title}</Heading>

            <CloseIcon className={styles.closeIcon} size="2em" onClick={onClose} />
          </Flex>
        )}

        <div className={styles.content}>{children}</div>
      </Flex>
    </div>
  );

  return modalsElement && createPortal(content, modalsElement);
};

export default memo(Modal);
