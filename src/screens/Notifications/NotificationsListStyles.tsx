import styled from 'styled-components/native';

export const Container = styled.View`
  min-height: 100%;
  padding: ${({ theme }) => theme.space.space2};
`;

export const Info = styled.View`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.space.space0};
`;

interface NotificationProps {
  isActive: boolean;
}

export const Notification = styled.TouchableOpacity<NotificationProps>`
  padding: ${({ theme }) => theme.space.space2};
  padding-bottom: 0px;
  ${({ isActive, theme }) =>
    isActive ? `background: ${theme.colors.primaryColor};` : ''};
`;

export const NotificationBody = styled.View`
  flex-flow: row;
  width: 100%;
`;

export const Hr = styled.View`
  background: ${({ theme }) => theme.colors.secondLightColor};
  height: 1.5px;
`;

export const Date = styled.View`
  max-height: 56px;
  min-width: 56px;
  min-height: 100%;
  align-items: center;
  justify-content: center;
`;