import { FC, memo, MouseEvent, useCallback, useState } from 'react';

import { ActionTag } from 'common/types/actionTag';

import actionTagsHttpClient from 'client/utilities/HttpClient/ActionTagsHttpClient';

import useSharedStoreValue from 'client/hooks/useSharedStoreValue';
import useBoolean from 'client/hooks/useBoolean';
import usePromise from 'client/hooks/usePromise';

import RedirectToLogin from 'client/components/RedirectToLogin/RedirectToLogin';
import Flex from 'client/components/Flex/Flex';
import Button from 'client/components/Button/Button';
import Text from 'client/components/Text/Text';
import ActionTagModal from 'client/pages/ActionTags/components/ActionTagModal';
import DeleteIcon from 'client/components/icons/DeleteIcon/DeleteIcon';

import styles from './ActionTags.module.scss';

const ActionTags: FC = () => {
  const [openedActionTag, setOpenedActionTag] = useState<ActionTag | null>(null);
  const [user, setUser] = useSharedStoreValue('user');
  const { value: actionTagModalOpen, setTrue: openActionTagModal, setFalse: closeActionTagModal } = useBoolean(false);

  const { run: deleteActionTag } = usePromise((signal, id: string) => actionTagsHttpClient.delete({ id }));

  const openEditActionTagModal = useCallback(
    (actionTag: ActionTag) => {
      setOpenedActionTag(actionTag);
      openActionTagModal();
    },
    [openActionTagModal],
  );

  const handleActionTagClick = useCallback(
    (e: MouseEvent, actionTag: ActionTag) => {
      if (e.target instanceof Element && e.target.closest(`.${styles.deleteIcon}`)) {
        return;
      }

      openEditActionTagModal(actionTag);
    },
    [openEditActionTagModal],
  );

  const handleActionModalClose = useCallback(() => {
    closeActionTagModal();
    setOpenedActionTag(null);
  }, [closeActionTagModal]);

  const onActionTagSuccess = useCallback(
    (actionTag: ActionTag, isEdit: boolean) => {
      if (!user) {
        return;
      }

      const actionTags = user.schedule.actionTags;
      let newActionTags: ActionTag[];

      if (isEdit) {
        const index = actionTags.findIndex(({ id }) => id === actionTag.id);

        if (index === -1) {
          return;
        }

        newActionTags = [...actionTags.slice(0, index), actionTag, ...actionTags.slice(index + 1)];
      } else {
        newActionTags = [...actionTags, actionTag];
      }

      setUser({
        ...user,
        schedule: {
          ...user.schedule,
          actionTags: newActionTags,
        },
      });
    },
    [setUser, user],
  );

  const handleActionTagDelete = useCallback(
    async (id: string) => {
      await deleteActionTag(id);

      if (!user) {
        return;
      }

      const actionTags = user.schedule.actionTags;

      const index = actionTags.findIndex((actionTag) => id === actionTag.id);

      if (index === -1) {
        return;
      }

      setUser({
        ...user,
        schedule: {
          ...user.schedule,
          actionTags: [...actionTags.slice(0, index), ...actionTags.slice(index + 1)],
        },
      });
    },
    [deleteActionTag, setUser, user],
  );

  if (!user) {
    return <RedirectToLogin />;
  }

  return (
    <Flex direction="column" alignItems="flexStart">
      <Button onClick={openActionTagModal}>
        <Text>Добавить тег</Text>
      </Button>

      <Flex className={styles.tags} alignItems="center" wrap="wrap" between={2}>
        {user.schedule.actionTags.map((tag, index) => (
          <Flex
            key={index}
            className={styles.tag}
            style={{ backgroundColor: tag.color }}
            alignItems="center"
            between={2}
            onClick={(e) => handleActionTagClick(e, tag)}
          >
            <Text size="xl">{tag.name}</Text>

            <DeleteIcon className={styles.deleteIcon} size="1.6em" onClick={() => handleActionTagDelete(tag.id)} />
          </Flex>
        ))}
      </Flex>

      <ActionTagModal
        open={actionTagModalOpen}
        actionTag={openedActionTag}
        onClose={handleActionModalClose}
        onSuccess={onActionTagSuccess}
      />
    </Flex>
  );
};

export default memo(ActionTags);
