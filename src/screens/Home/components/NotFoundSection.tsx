import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import ButtonComponent from '../../../components/Button/Button';
import Container from '../../../components/Container';
// eslint-disable-next-line max-len
import { handleNotFoundProductSuggestion } from '../../../store/actions/user/handlers/handleNotFound';
import { translation } from '../../../texts';
import config from '../../../config';
import theme from '../../../styles/theme';

const FindOut = styled.View`
  flex-flow: row;
  padding-left: ${(props: { theme: { space: { space2: any } } }) =>
    props.theme.space.space2};
`;

const NotFoundSection: React.FC = () => {
  const dispatch = useDispatch();

  const openSuggestion = () => {
    dispatch(handleNotFoundProductSuggestion());
  };

  if (!config.notFoundSuggestion) {
    return null;
  }

  return (
    <Container
      title={translation('notFoundProducts.title')}
      subtitle={translation('notFoundProducts.subtitle')}
    >
      <FindOut>
        <ButtonComponent
          onPress={openSuggestion}
          type="CallToAction-Primary-Color"
          theme={theme}
        >
          {translation('notFoundProducts.buttonText')}
        </ButtonComponent>
      </FindOut>
    </Container>
  );
};

export default NotFoundSection;
