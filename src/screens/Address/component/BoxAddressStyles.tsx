import styled from 'styled-components/native';

export interface AddressBoxProps {
  noPadding?: boolean;
}

export const AddressBox = styled.TouchableOpacity<AddressBoxProps>`
  margin-left: ${({ theme }) => theme.space.s2};
  margin-right: ${({ theme }) => theme.space.s2};
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ noPadding, theme }) => !noPadding && theme.space.s2};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  shadow-color: ${({ theme }) => theme.shadow.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadow.shadowOffset.width}
    ${({ theme }) => theme.shadow.shadowOffset.width};
  shadow-opacity: ${({ theme }) => theme.shadow.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadow.shadowRadius};
  elevation: ${({ theme }) => theme.shadow.elevation};
  margin-bottom: ${({ theme }) => theme.space.s2};
  align-items: center;
  flex: 1;
  justify-content: center;
  flex-flow: row;
`;

export const AddressBoxInfo = styled.View`
  flex: 1;
  align-items: flex-start;
`;
