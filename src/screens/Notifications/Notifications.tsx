/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { handleOpenNotification } from '../../store/actions/shared';
import {
  Box,
  H3,
  Subtitle2,
  Space,
  Notification,
  NotificationBody,
  Hr,
  Date,
} from '../../styles/globalStyles';
import { Info } from './NotificationsListStyles';
import { handleLoadNotifications } from '../../store/actions/user/notifications';

interface NotificationsProps {
  notifications: NotificationType[];
  isLoading: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(handleLoadNotifications());
  }, [dispatch]);

  const onPress = (n: NotificationType) => {
    dispatch(handleOpenNotification(n.key, n.action)).then((result) => {
      if (result && result.redirect) {
        navigation.navigate(result.redirect);
      }
    });
  };

  if (isLoading) {
    return (
      <Box noPadding>
        {[...Array(10)].map((_, index) => (
          <Placeholder key={index} Animation={Fade}>
            <Notification>
              <NotificationBody>
                <PlaceholderLine noMargin width={40} />
                <Space n={0} />
                <PlaceholderLine noMargin width={80} />
                <Date>
                  <PlaceholderMedia noMargin size={36} />
                </Date>
              </NotificationBody>
              <Space n={1} />
              <Hr />
            </Notification>
          </Placeholder>
        ))}
      </Box>
    );
  }

  return (
    <Box noPadding>
      {notifications.map((n, index) => (
        <Notification
          isActive={n.viewed}
          key={index}
          onPress={() => onPress(n)}
        >
          <NotificationBody>
            <Info>
              <H3>{n.title}</H3>
              <Space n={0} />
              <Subtitle2 type={'secondDarkColor'}>{n.body}</Subtitle2>
            </Info>
            <Date>
              <Subtitle2 type={'secondDarkColor'}>
                {n.dateTimeFormated}
              </Subtitle2>
              <Subtitle2 type={'secondDarkColor'}>{n.dateFormated}</Subtitle2>
            </Date>
          </NotificationBody>
          <Space n={1} />
          <Hr />
        </Notification>
      ))}
    </Box>
  );
};

export default Notifications;
