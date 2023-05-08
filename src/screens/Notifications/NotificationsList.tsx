import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { useNavigation } from '@react-navigation/native';
import { Box } from '../../components/Container';
import InformationBox from '../../components/InformationBox';
import ScreePopup from '../../components/ScreePopup';
import { Space } from '../../components/Space';
import { H3, Subtitle2 } from '../../components/Typography';
import { handleOpenNotification } from '../../store/actions/shared';
// eslint-disable-next-line max-len
import { handleLoadNotifications } from '../../store/actions/user/notifications';
import NotLoggedBox from '../user/components/NotLoggedBox';
import { NotificationBody, Hr, Container } from './NotificationsListStyles';
import { NotificationType } from '../../types/NotificationsTypes';

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
                <H3>
                  <PlaceholderLine noMargin width={40} />
                </H3>
                <Space n={0} />
                <Subtitle2 type={'secondDarkColor'}>
                  <PlaceholderLine noMargin width={80} />
                </Subtitle2>
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
            <H3>{n.title}</H3>
            <Space n={0} />
            <Subtitle2 type={'secondDarkColor'}>{n.body}</Subtitle2>
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

const NotificationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { isLogged = false, notifications } = useSelector(
    (state) => state.user
  );
  const hasNotification = notifications && notifications.length > 0;
  const isLoading = !notifications;

  const isLoggedContent = () =>
    hasNotification || isLoading ? (
      <Notifications isLoading={isLoading} notifications={notifications} />
    ) : (
      <InformationBox
        title="Você não possui notificações."
        description="Assim que receber, poderá ver tudo por aqui!"
      />
    );

  const isNotLoggedContent = () => (
    <NotLoggedBox title="Você não possui notificações." />
  );

  return (
    <ScreePopup title={'Notificações'} withBorder>
      <Container>
        {isLogged ? isLoggedContent() : isNotLoggedContent()}
      </Container>
    </ScreePopup>
  );
};

export default NotificationsScreen;
