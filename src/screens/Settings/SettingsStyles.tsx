import styled from 'styled-components';

export const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
`;

export const MenuItem = styled.View`
  align-items: center;
  padding-top: ${(props) => props.theme.space.space2};
  padding-bottom: ${(props) => props.theme.space.space2};
  border-color: ${(props) => props.theme.colors.secondLightColor};
  border-bottom-width: 1.5px;
`;

export const MenuItemHeader = styled.View`
  flex-flow: row;
  align-items: center;
  padding-bottom: ${(props) => props.theme.space.space2};
`;

export const MenuItemText = styled.View`
  flex: 1;
`;

export const MenuItemImage = styled.View`
  min-width: 64px;
  max-height: 64px;
`;

export const Line = styled.View`
    flex-flow: row
    align-items:center
`;

export const UserImage = styled.View`
  width: 64px;
  height: 64px;
  margin-right: ${(props) => props.theme.space.space2};
  margin-bottom: ${(props) => props.theme.space.space1};
`;
