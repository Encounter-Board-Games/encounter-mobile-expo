import styled from 'styled-components';

export interface FindOutProps {
  theme: {
    space: {
      space2: string;
    };
  };
}

export const FindOut = styled.View<FindOutProps>`
  flex-flow: row;
  padding-left: ${(props) => props.theme.space.space2};
`;

export interface BannerProps {
  width?: string;
  height?: string;
  maxHeight?: string;
}

export const Banner = styled.View<BannerProps>`
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? '200px'};
  max-height: ${(props) => props.maxHeight ?? '200px'};
`;
