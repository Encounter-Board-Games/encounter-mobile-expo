import React, { FC, useEffect } from 'react';
import styled from 'styled-components/native';
import EditProfileContent from './EditProfileContent';
import { H2 } from '../../components/Typography';
import { Space } from '../../components/Space';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { handleOpenCart } from '../../store/actions/cart/cart';

interface Props {}

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-bottom: ${(props) => props.theme.space.s2};
`;

const Header = styled.View`
  padding-top: ${(props) => props.theme.space.s3};
  padding-left: ${(props) => props.theme.space.s2};
  padding-right: ${(props) => props.theme.space.s2};
`;

const EditProfile: FC<Props> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleOpenCart(false));
  }, [dispatch]);

  return (
    <Animatable.View
      animation="fadeInUp"
      style={{ height: '100%', width: '100%' }}
    >
      <Container>
        <Header>
          <H2>Complete suas informações abaixo:</H2>
        </Header>

        <Space n={2} />
        <EditProfileContent navigation={navigation} hasTerms={true} />
      </Container>
    </Animatable.View>
  );
};

export default EditProfile;
