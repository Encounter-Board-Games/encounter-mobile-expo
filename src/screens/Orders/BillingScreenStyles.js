import styled from "styled-components";

export const Container = styled.View`
    padding: ${(props) => props.theme.space.space2}
    width: 100%;
`;

export const Line = styled.View`
    flex-flow: ${(props) => props.flex};
    justify-content: flex-start;
    align-items: center
    width: 100%;
`;

export const Title = styled.View`
  flex: 1;
`;

export const Hr = styled.View`
  background: ${(prop) => prop.theme.colors.secondLightColor};
  height: 1px;
  width: 100%;
  flex: 1;
`;

export const ProgressBar_ = styled.View`
  background: ${(props) =>
    props.active
      ? props.theme.colors.primaryColor
      : props.theme.colors.primaryLightColor};
  height: 5px;

  ${(props) =>
    props.border
      ? "border-top-right-radius: 5px;border-bottom-right-radius: 5px;"
      : ""}

  width: ${(props) => props.width};
  margin-bottom: ${(prop) => prop.theme.space.space2};
`;

export const ProgressBarContent = styled.View``;

export const ProgressBarBall = styled.View`
  background: ${(props) =>
    props.active
      ? props.theme.colors.primaryColor
      : props.running
      ? props.theme.colors.primaryColor
      : props.theme.colors.primaryLightColor};
  border: 1px solid
    ${(props) =>
      props.running
        ? props.theme.colors.primaryColor
        : props.theme.colors.primaryColor};
  height: 10px;
  width: 10px;
  border-radius: 10px;
  margin-bottom: ${(prop) => prop.theme.space.space2};
  position: absolute;
  top: -2.5px;
  left: -2.5px;
`;