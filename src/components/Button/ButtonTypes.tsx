import React from 'react';

export interface ButtonProps {
  height?: string;
  width?: string;
  flex?: boolean;
  paddingSides?: string;
  borderColor?: string;
  isOutline?: boolean;
  background?: string;
  disabled?: boolean;
}

export interface TextProps {
  fontSize?: string;
  isOutline?: boolean;
  textColor?: string;
  textColorIsOutline?: string;
}

export interface ButtonWrapperProps {
  theme: any;
  type: string;
  isOutline?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export type SocialIconName =
  | 'yelp'
  | 'cc-visa'
  | 'lastfm'
  | 'yoast'
  | 'wpexplorer'
  | 'buysellads'
  | 'first-order'
  | 'modx'
  | 'qq'
  | 'glide-g'
  | 'drupal'
  | 'vk'
  | 'reddit-square'
  | 'contao'
  | 'edge'
  | 'snapchat-square'
  | 'snowflake-o';

export interface SocialButtonProps {
  icon: SocialIconName;
  children: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  onPress?: () => void;
}