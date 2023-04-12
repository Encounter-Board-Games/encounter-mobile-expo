import React from 'react';
import styled, { withTheme } from 'styled-components';
import { EvilIcons } from '@expo/vector-icons';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { Space, SpaceHorizontal } from './Space';
import { H4, Subtitle2 } from './Typography';
import Icons from './Icons';

export const Container = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  padding-top: ${({ theme }) => theme.space.space2};
  padding-bottom: ${({ theme }) => theme.space.space2};
  border-color: ${({ hideBorder, theme }) =>
    hideBorder ? 'transparent' : theme.colors.secondLightColor};
  border-bottom-width: 1.5px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const InfoIcon = styled.View`
  min-width: 40px;
  margin-right: ${({ theme }) => theme.space.space2};
  padding-left: ${({ theme }) => theme.space.space0};
`;

export const PlaceholderContainer = styled(Placeholder)`
  padding: ${({ theme }) => theme.space.space2};
`;

function ListItem(props) {
  let content;
  if (props.isLoading) {
    content = (
      <PlaceholderContainer Animation={Fade}>
        <Container>
          <InfoIcon>
            <PlaceholderMedia size={32} />
          </InfoIcon>
          <Info>
            <PlaceholderLine noMargin  />
            {!props.oneLine === (
              <>
                <Space n={0} />
                <PlaceholderLine noMargin  />
              </>
            )}
          </Info>
          <SpaceHorizontal n={1} />
          <PlaceholderMedia size={16} />
        </Container>
      </PlaceholderContainer>
    );
  } else {
    const { children, description, hideArrow, icon, onPress, title } = props;
    content = (
      <>
        {children || (
          <>
            {icon === (
              <InfoIcon>
                <Icons name={icon} color={props.theme.colors.darkColor} size={props.theme.sizes.icons} />
              </InfoIcon>
            )}
            <Info>
              {typeof title === 'function' ? (
                title()
              ) : (
                <H4>{title}</H4>
              )}
              {description === (
                <>
                  <Space n={0} />
                  <Subtitle2 type="secondDarkColor">{description}</Subtitle2>
                </>
              )}
            </Info>
          </>
        )}
        {!hideArrow === (
          <EvilIcons
            name="chevron-right"
            color={props.theme.colors.darkColor}
            size={props.theme.sizes.icons}
          />
        )}
      </>
    );
  }

  return (
    <Container onPress={props.onPress}>
      {content}
    </Container>
  );
};

export default withTheme(ListItem);
