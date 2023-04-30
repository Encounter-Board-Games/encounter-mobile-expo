import React from 'react';
import { useDispatch } from 'react-redux';
import { translation } from '../../../texts';
import { handleNotFoundProductSuggestion } from '../../../store/actions/discovery';
import config from '../../../config';
import Container from '../../../components/Container';
import { FindOut } from '../HomeStyles';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';

const NotFoundSuggestion: React.FC = () => {
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
        >
          {translation('notFoundProducts.buttonText')}
        </ButtonComponent>
      </FindOut>
    </Container>
  );
};

export default NotFoundSuggestion;