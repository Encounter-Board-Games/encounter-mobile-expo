import styled from 'styled-components';

export const PriceContent = styled.View`
  flex: 1;
  flex-flow: row;
`;

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: ${(props) => props.theme.space.s2};
  padding-right: ${(props) => props.theme.space.s2};
  background: ${(props) => props.theme.colors.primaryDark};
  flex-flow: row;
`;

export const Price = styled.Text`
  font-family: Nunito-Bold;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => props.theme.colors.light};
`;

export const PriceItem = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => props.theme.colors.light};
`;

export const Button = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.light};
  padding-left: ${(props) => props.theme.space.s3};
  padding-right: ${(props) => props.theme.space.s3};
  margin-top: ${(props) => props.theme.space.s1};
  margin-bottom: ${(props) => props.theme.space.s1};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.button};
`;

export const ButtonText = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => props.theme.colors.dark};
`;
