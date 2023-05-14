import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  percent: number;
}

const Progress = styled.div`
  width: 100%;
  border-radius: 4px;
  height: 4px;
  background: ${(props) => props.theme.colors.secondary};
`;

const Bar = styled.div<{ percent: number }>`
  width: ${(props) => (props.percent ? props.percent + '%' : '0%')};
  border-radius: 4px;
  height: 4px;
  background: ${(props) => props.theme.colors.complement};
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return (
    <Progress>
      <Bar percent={percent} />
    </Progress>
  );
};

export default ProgressBar;
