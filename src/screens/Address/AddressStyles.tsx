import styled, { DefaultTheme } from 'styled-components/native';

interface ContainerProps {
  theme: DefaultTheme;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  height: 100%;
  padding-top: ${(props) => props.theme.space.space2};
`;

export const MainContent = styled.View``;

export const Content = styled.View<ContainerProps>`
  padding-left: ${(props) => props.theme.space.space2};
  padding-right: ${(props) => props.theme.space.space2};
`;

export const AddressNumber = styled.View`
  flex-flow: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ScrollViewAddress = styled.ScrollView``;
