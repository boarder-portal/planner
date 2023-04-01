import { FC, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';

import { ActionTag, ActionTagPayload } from 'common/types/actionTag';

import actionTagsHttpClient from 'client/utilities/HttpClient/ActionTagsHttpClient';

import usePromise from 'client/hooks/usePromise';
import usePrevious from 'client/hooks/usePrevious';

import Modal, { CommonModalProps } from 'client/components/Modal/Modal';
import Input from 'client/components/Input/Input';
import Text from 'client/components/Text/Text';
import Button from 'client/components/Button/Button';

import styles from './ActionTagModal.module.scss';

interface Props extends CommonModalProps {
  actionTag: ActionTag | null;
  onSuccess(actionTag: ActionTag, isEdit: boolean): void;
}

const ActionTagModal: FC<Props> = (props) => {
  const { open, actionTag, onClose, onSuccess } = props;

  const [name, setName] = useState(actionTag?.name ?? '');
  const [color, setColor] = useState(actionTag?.color ?? '#fff');
  const [icon, setIcon] = useState(actionTag?.icon ?? null);
  const [goals, setGoals] = useState(actionTag?.goals ?? []);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const actionTagPayload: ActionTagPayload = {
    name,
    color,
    icon,
    goals,
  };

  const isEdit = Boolean(actionTag);

  const wasOpen = usePrevious(open);

  const { run: runRequest, isLoading } = usePromise(() =>
    actionTag
      ? actionTagsHttpClient.edit({ actionTag: { id: actionTag.id, ...actionTagPayload } })
      : actionTagsHttpClient.add({ payload: actionTagPayload }),
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const { actionTag } = await runRequest();

      onClose?.();
      onSuccess(actionTag, isEdit);
    },
    [isEdit, onClose, onSuccess, runRequest],
  );

  useEffect(() => {
    if (open && !wasOpen) {
      setName(actionTag?.name ?? '');
      setColor(actionTag?.color ?? '');
      setIcon(actionTag?.icon ?? null);
      setGoals(actionTag?.goals ?? []);

      nameInputRef.current?.focus();
    }
  }, [actionTag?.color, actionTag?.goals, actionTag?.icon, actionTag?.name, open, wasOpen]);

  return (
    <Modal className={styles.root} open={open} title={isEdit ? 'Изменить тег' : 'Добавить тег'} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input ref={nameInputRef} required type="text" placeholder="Название" value={name} onChange={setName} />

        <Button className={styles.submit} disabled={isLoading}>
          <Text>{isEdit ? 'Изменить' : 'Создать'}</Text>
        </Button>
      </form>
    </Modal>
  );
};

export default memo(ActionTagModal);
