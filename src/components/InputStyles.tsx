import styled from 'styled-components/native';

export const Container = styled.View<{ withButton?: boolean }>`
  width: 100%;
  position: relative;
  padding-right: ${({ withButton }) => (withButton ? '28px' : '0px')};
`;

export const CustomInput = styled.TextInput<{ disabled?: boolean }>`
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding-left: ${({ theme }) => theme.space.s2};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: ${({ theme }) => theme.space.s2};
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;

export const Button = styled.View<{ disabledButton?: boolean }>`
  height: 56px;
  align-items: center;
  justify-content: center;
  width: 56px;
  border-radius: 56px;
  background: ${({ theme }) => theme.colors.primaryDark};
  opacity: ${({ disabledButton }) => (disabledButton ? '.5' : '1')};
`;

export const ButtonSpace = styled.View`
  height: 56px;
  width: 56px;
  border-radius: 56px;
  background: ${({ theme }) => theme.colors.light};
  position: absolute;
  right: 0;
`;

export const TouchRightIcon = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 56px;
  width: 56px;
  border-radius: 56px;
  position: absolute;
  right: 0;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;
