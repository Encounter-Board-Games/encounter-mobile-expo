import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Subtitle1, H3 } from './Typography';
import { Theme } from '../styles/themeTypes';

interface Props {
  title: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
  theme: Theme;
}

const ToolItem = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  flex-flow: row;
  position: relative;
`;

const FilterHeader = ({ title, showSeeAll, onSeeAllPress, theme }: Props) => (
  <Header>
    <H3>{title}</H3>
    {showSeeAll && (
      <ToolItem onPress={onSeeAllPress}>
        <Subtitle1 underline color={theme.colors.primaryDark}>
          Ver todos
        </Subtitle1>
      </ToolItem>
    )}
  </Header>
);

export default withTheme(FilterHeader);
