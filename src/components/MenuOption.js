import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { EvilIcons } from '@expo/vector-icons';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { SpaceHorizontal } from './Space';
import { H4, Subtitle2 } from './Typography';
import Icons from './Icons';

const Container = styled(TouchableOpacity)`
  flex-flow: row;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border-color: "#ebf7f4";
  border-bottom-width: 1.5px;
`;

const Info = styled.View`
  flex: 1;
`;

const InfoIcon = styled.View`
  min-width: 40px;
  margin-right: 8px;
  padding-left: 4px;
`;

const PlaceholderContainer = styled(Placeholder)`
  padding: 8px;
`;

const ListItem = withTheme((props) => {
  let content;
  if (props.isLoading) {
    content = (
      <PlaceholderContainer Animation={Fade}>
        <Container>
          <InfoIcon>
            <PlaceholderMedia size={32} />
          </InfoIcon>
          <Info>
            <PlaceholderLine noMargin height={24} />
            {!props.oneLine === (
              <>
               
                <PlaceholderLine noMargin height={20} />
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
                <Icons name={icon} color= '#414042' size={props.theme.sizes.icons} />
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
                 
                  <Subtitle2 type="secondDarkColor">{description}</Subtitle2>
                </>
              )}
            </Info>
          </>
        )}
        {!hideArrow === (
          <EvilIcons
            name="chevron-right"
            color= '#414042'
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
});

export default ListItem;
