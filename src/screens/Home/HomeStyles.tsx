import styled from 'styled-components/native';

export interface FindOutProps {
  theme: {
    space: {
      s2: string;
    };
  };
}

export const FindOut = styled.View<FindOutProps>`
  flex-flow: row;
  padding-left: ${(props: { theme: { space: { s2: any } } }) =>
    props.theme.space.s2};
`;

export interface BannerProps {
  width?: string;
  height?: string;
  maxHeight?: string;
}

export const Banner = styled.View<BannerProps>`
  width: ${(props: { width: any }) => props.width ?? '100%'};
  height: ${(props: { height: any }) => props.height ?? '200px'};
  max-height: ${(props: { maxHeight: any }) => props.maxHeight ?? '200px'};
`;
