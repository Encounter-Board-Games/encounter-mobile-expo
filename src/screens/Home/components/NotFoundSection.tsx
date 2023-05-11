import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line max-len
import { handleNotFoundProductSuggestion } from '../../../store/actions/user/handlers/handleNotFound';
import ButtonComponent from '../../../components/Button/Button';
import { translation } from '../../../texts/translations';
import { FindOut } from '../HomeStyles';
import theme from '../../../theme/theme';

interface NotFoundSectionProps {
  openSuggestion: () => void;
}

const NotFoundSection: React.FC<NotFoundSectionProps> = ({
  openSuggestion,
}) => {
  const dispatch = useDispatch();

  const handleOpenSuggestion = () => {
    dispatch(handleNotFoundProductSuggestion());
  };

  return (
    <View>
      <Text>{translation('notFoundProducts.title')}</Text>
      <Text>{translation('notFoundProducts.subtitle')}</Text>
      <FindOut>
        <ButtonComponent
          onPress={handleOpenSuggestion}
          type="CallToAction-Primary-Color"
          theme={theme}
        >
          {translation('notFoundProducts.buttonText')}
        </ButtonComponent>
      </FindOut>
    </View>
  );
};

export default NotFoundSection;
