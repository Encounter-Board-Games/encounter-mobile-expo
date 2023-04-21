import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export const icons = [
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

export default ({ name, library = 'SimpleLineIcons', size = 24, ...props }) => {
  const icon = icons.find((icon) => icon.name === name);

  if (!icon) {
    throw new Error(`Invalid icon name: ${name}`);
  }

  const IconComponent = icon.component;

  const actualSize = Math.floor(size * icon.sizeFactor);

  if (icon.library !== library) {
    return <IconComponent name={icon.name} {...props} size={actualSize} />;
  }

  return <IconComponent name={name} {...props} size={actualSize} />;
};
