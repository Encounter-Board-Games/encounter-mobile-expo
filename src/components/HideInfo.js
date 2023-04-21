import React from 'react';
import Stepper from './Stepper';

export default function Step({ n, size }) {
  return (
    <Stepper customColor="darkColor" size={size || 2} number={n} current={-1} />
  );
}
