import * as React from 'react';
import styled, { ThemeProps, withTheme } from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { Space, SpaceHorizontal } from './Space';
import { H4, Subtitle2 } from './Typography';
import Icons from './IconsComponent';

interface Props {
  isLoading?: boolean;
  children?: React.ReactNode;
  description?: string | React.ReactNode;
  hideArrow?: boolean;
  hideBorder?: boolean;
  icon?: string | React.ReactNode;
  onPress?: () => void;
  theme: ThemeProps<any>;
  title: string | (() => React.ReactNode);
  oneLine?: boolean;
}

const Container = styled.TouchableOpacity<{ hideBorder?: boolean }>`
  flex-flow: row;
  align-items: center;
  padding-top: ${({ theme }) => theme.space.space2};
  padding-bottom: ${({ theme }) => theme.space.space2};
  border-color: ${({ hideBorder, theme }) =>
    hideBorder ? 'transparent' : theme.colors.secondLightColor};
  border-bottom-width: 1.5px;
`;

const Info = styled.View`
  flex: 1;
`;

const InfoIcon = styled.View`
  min-width: 40px;
  margin-right: ${({ theme }) => theme.space.space2};
  padding-left: ${({ theme }) => theme.space.space0};
`;

const PlaceholderContainer = styled(Placeholder)`
  padding: ${({ theme }) => theme.space.space2};
`;

function ListItem(props: Props) {
  const {
    isLoading,
    children,
    description,
    hideArrow,
    hideBorder,
    icon,
    onPress,
    title,
    oneLine,
    theme,
  } = props;

  if (isLoading) {
    return (
      <PlaceholderContainer Animation={Fade}>
        <Container hideBorder={hideBorder} onPress={onPress}>
          <InfoIcon>
            <PlaceholderMedia size={32} />
          </InfoIcon>
          <Info>
            <PlaceholderLine noMargin />
            {!oneLine && (
              <>
                <Space n={0} />
                <PlaceholderLine noMargin />
              </>
            )}
          </Info>
          <SpaceHorizontal n={1} />
          <PlaceholderMedia size={16} />
        </Container>
      </PlaceholderContainer>
    );
  }

  return (
    <Container hideBorder={hideBorder} onPress={onPress}>
      {children || (
        <>
          {icon && (
            <InfoIcon>
              <Icons
                name={icon as string}
                color={theme.colors.darkColor}
                size={theme.sizes.icons}
              />
            </InfoIcon>
          )}
          <Info>
            {typeof title === 'function' ? title() : <H4>{title}</H4>}
            {description && (
              <>
                <Space n={0} />
                <Subtitle2 type="secondDarkColor">{description}</Subtitle2>
              </>
            )}
          </Info>
        </>
      )}
      {!hideArrow && (
        <EvilIcons
          name="chevron-right"
          color={theme.colors.darkColor}
          size={theme.sizes.icons}
        />
      )}
    </Container>
  );
}

export default withTheme(ListItem);
