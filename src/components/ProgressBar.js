import React from 'react';
import styled from 'styled-components';

export const Progress = styled.View`
  width: 100%;
  border-radius: 4px;
  height: 4px;
  background: ${(props) => props.theme.colors.secondColor};
`;

export const Bar = styled.View`
  width: ${(props) => (props.percent ? props.percent + '%' : '0%')};
  border-radius: 4px;
  height: 4px;
  background: ${(props) => props.theme.colors.complementColor};
`;

export default function ProgressBar(props) {
  return (
    <Progress>
      <Bar {...props} />
    </Progress>
  );
}
