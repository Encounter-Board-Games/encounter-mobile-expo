import styled from 'styled-components/native';

interface BoxProps {
  noPadding?: boolean;
}

const Box = styled.View<BoxProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.light};
  padding: ${(props) => (props.noPadding ? 0 : props.theme.space.s2)};
  border-radius: ${(props) => props.theme.borderRadius.button};
  shadow-color: ${(props) => props.theme.shadow.shadowColor};
  shadow-offset: ${(props) => props.theme.shadow.shadowOffset.width}px
    ${(props) => props.theme.shadow.shadowOffset.width}px;
  shadow-opacity: ${(props) => props.theme.shadow.shadowOpacity};
  shadow-radius: ${(props) => props.theme.shadow.shadowRadius};
  elevation: ${(props) => props.theme.shadow.elevation};
  margin-bottom: ${(props) => props.theme.space.s2};
  align-items: center;
`;

export default Box;
