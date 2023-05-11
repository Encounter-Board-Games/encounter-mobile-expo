import styled, { DefaultTheme } from 'styled-components/native';

interface ContainerProps {
  theme: DefaultTheme;
}

export const Container = styled.View<ContainerProps>`
  padding: ${(props) => props.theme.space.s2};
  padding-bottom: 0px;
  flex: 1;
`;

export const FlexContent = styled.View`
  flex: 1;
`;

export const Space = styled.View`
  width: 100%;
  color: ${(props) => props.theme.colors.secondColor};
`;

export const Chips = styled.ScrollView`
  max-height: 40px;
  margin-top: ${(props) => props.theme.space.s1};
`;

export const s3 = styled.View`
  width: 1px;
`;

export const s2 = styled.View`
  width: 1px;
`;

export const RecentItem = styled.TouchableOpacity`
  padding-bottom: ${(props) => props.theme.space.s1};
  padding-top: ${(props) => props.theme.space.s1};
  border-bottom-width: 0.5px;
  border-color: ${(props) => props.theme.colors.secondaryLight};
`;
