import React from 'react';
import Stepper from './Stepper';

interface Props {
  n: number;
  size?: number;
}

const Step = ({ n, size }: Props) => {
  return (
    <Stepper customColor="darkColor" size={size || 2} number={n} current={-1} />
  );
};

export default Step;
