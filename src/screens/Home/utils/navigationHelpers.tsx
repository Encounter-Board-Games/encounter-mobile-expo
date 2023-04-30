import { useDispatch } from 'react-redux';
import { handleSetSelects } from '../../store/actions/filters/filters';
import { useNavigation } from '@react-navigation/native';

export const openSeeAll = (filters: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  dispatch(handleSetSelects(filters));
  navigation.navigate('Busca');
};
