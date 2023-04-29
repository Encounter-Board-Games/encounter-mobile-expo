import styled from 'styled-components/native';

export const TutorialView = styled.View`
  width: 100%;
  height: 120%;
  position: absolute;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
  padding: ${(props) => props.theme.space.space2};
`;

export const Content = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ContentArea = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`;

export const Arrow = styled.View`
  position: absolute;
  right: 8px;
  width: 20%;
  top: -36px;
  height: auto;
  z-index: 99;
  align-items: flex-start;
  justify-content: flex-start;
`;
