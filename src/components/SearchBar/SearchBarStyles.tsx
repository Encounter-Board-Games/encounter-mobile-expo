import styled from 'styled-components';

export const SearchBarContainer = styled.View`
  padding-top: 8px;
  padding-bottom: 8px;
  height: 48px;
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.button};
  align-items: center;
  flex-flow: row;
  width: 100%;
  shadow-color: ${(props) => props.theme.shadow.shadowColor};
  shadow-offset: ${(props) => props.theme.shadow.shadowOffset.width}
    ${(props) => props.theme.shadow.shadowOffset.width};
  shadow-opacity: ${(props) => props.theme.shadow.shadowOpacity};
  shadow-radius: ${(props) => props.theme.shadow.shadowRadius};
  elevation: ${(props) => props.theme.shadow.elevation};
  padding-left: 12px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: 4px;
  background-color: ${(props) => props.theme.colors.secondaryLight};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => props.theme.space.s1};
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: ${(props) => props.theme.colors.seconddark};
  font-size: ${(props) => props.theme.sizes.subtitle3};
`;
