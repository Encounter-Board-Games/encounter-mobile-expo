import React from 'react';
import { SimpleLineIcons, EvilIcons } from '@expo/vector-icons';

export interface Icon {
  name: string;
  library: string;
  component: typeof SimpleLineIcons | typeof EvilIcons;
  sizeFactor: number;
}

export const icons: Icon[] = [
  {
    name: 'handbag',
    library: 'EvilIcons',
    component: EvilIcons,
    sizeFactor: 1.6,
  },
  {
    name: 'user',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1.1,
  },
  {
    name: 'magnifier',
    library: 'EvilIcons',
    component: EvilIcons,
    sizeFactor: 1.6,
  },
  {
    name: 'home',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1.1,
  },
  {
    name: 'question',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1,
  },
  {
    name: 'settings',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1,
  },
  {
    name: 'credit-card',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1,
  },
  {
    name: 'location-pin',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1,
  },
  {
    name: 'tag',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1,
  },
  {
    name: 'bell',
    library: 'SimpleLineIcons',
    component: SimpleLineIcons,
    sizeFactor: 1,
  },
];

export interface Props {
  name: string;
  library?: string;
  size?: number;
  color?: string;
}

const Icon = ({
  name,
  library = 'SimpleLineIcons',
  size = 24,
  color,
  ...props
}: Props) => {
  const icon = icons.find((icon) => icon.name === name);

  if (!icon) {
    throw new Error(`Invalid icon name: ${name}`);
  }

  const IconComponent = icon.component;

  const actualSize = Math.floor(size * icon.sizeFactor);

  if (icon.library !== library) {
    return (
      <IconComponent
        name={icon.name}
        {...props}
        size={actualSize}
        color={color}
      />
    );
  }

  return (
    <IconComponent name={name} {...props} size={actualSize} color={color} />
  );
};

export default Icon;
