import { useDispatch } from 'react-redux';
// eslint-disable-next-line max-len
import { handleSetSelects } from '../../../store/actions/filters/handleSetFilters';
import { useNavigation } from '@react-navigation/native';

export const useOpenSeeAll = (filters: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  dispatch(handleSetSelects(filters));
  (navigation.navigate as any)('Busca');
};
