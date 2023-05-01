import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { handleProcessActions } from '../../store/actions/shared';
import Carrossel from '../../components/Carrossel';

const BannerContainer = styled.View`
  width: 100%;
  height: 200px;
  max-height: 200px;
`;

interface BannerProps {
  isLoading?: boolean;
}

const Banner: React.FC<BannerProps> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.shelves.banners?.items || []);

  if (isLoading) {
    return (
      <BannerContainer>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia size={'100%'} />
        </Placeholder>
      </BannerContainer>
    );
  }

  return (
    <Carrossel>
      {banners.map((banner, index) => (
        <BannerContainer key={index}>
          {banner.action && banner.action !== 'no_action' ? (
            <TouchableOpacity
              onPress={() => dispatch(handleProcessActions(banner.action))}
              style={{ width: '100%', height: '100%' }}
            >
              <Image
                source={{ uri: banner.url }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: banner.url }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </BannerContainer>
      ))}
    </Carrossel>
  );
};

export default Banner;
