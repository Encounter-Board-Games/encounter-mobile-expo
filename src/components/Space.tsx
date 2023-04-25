import styled from 'styled-components/native';

interface SpaceProps {
  n: number;
}

export const Space = styled.View`
  width: 1px;
`;

export const SpaceHorizontal = styled.View<SpaceProps>`
  width: ${(props) => props.theme.space['space' + props.n]}px;
  height: 1px;
`;

export const Bottom = styled.View`
  width: 100%;
`;
