import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

export const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.space.space2};
`;

export const ContainerInputs = styled.View`
  flex: 1;
`;

export const Opacity = styled.View`
  opacity: 0.5;
`;

export const CustomInput = styled.TextInput`
  border: 1.5px solid ${({ theme }) => theme.colors.primaryColor};
  background: ${({ theme }) => theme.colors.primaryLightColor};
  padding-left: ${({ theme }) => theme.space.space2};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  height: 48px;
  width: 50%;
  justify-content: center;
`;

export const InputDate = styled.TouchableOpacity`
  border: 1.5px solid ${({ theme }) => theme.colors.primaryColor};
  background: ${({ theme }) => theme.colors.primaryLightColor};
  padding-left: ${({ theme }) => theme.space.space2};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  height: 48px;
  width: 50%;
  justify-content: center;
`;

export const Line = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`;

export const LineRow = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  flex: 1;
`;

interface CheckLineProps extends TouchableOpacityProps {
  selected?: boolean;
}

export const CheckLine = styled.TouchableOpacity<CheckLineProps>`
  flex-flow: row;
  height: 100%;
`;

interface CheckProps {
  selected?: boolean;
}

export const Check = styled.View<CheckProps>`
  width: ${({ theme }) => theme.space.space2};
  margin-right: ${({ theme }) => theme.space.space1};
  border: 1px ${({ theme }) => theme.colors.primaryDarkColor};
  border-radius: 2px;
  margin-top: ${({ theme }) => theme.space.space0};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primaryDarkColor : 'transparent'};
`;

interface CustomInputTextProps {
  disabled?: boolean;
  hasValue?: boolean;
}

export const CustomInputText = styled.Text<CustomInputTextProps>`
  font-size: ${({ theme }) => theme.sizes.h3};
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
  color: ${({ hasValue, theme }) =>
    hasValue ? theme.colors.darkColor : theme.colors.secondColor};
`;

export const TermsAndConditions = styled.TouchableOpacity`
  flex-flow: row;
`;

export const LineButtons = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.space3};
`;
