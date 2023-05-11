import React, { FC } from 'react';
import InformationBox from '../../../components/InformationBox';
import { openLoginPopup } from '../../../store/actions/user/login';
import { useDispatch } from 'react-redux';
import { translation } from '../../../texts/translation';

import config from '../../../config';
import theme from '../../../theme/theme';

interface NotLoggedBoxProps {
  title: string;
}

const NotLoggedBox: FC<NotLoggedBoxProps> = ({ title }) => {
  const dispatch = useDispatch();

  const informationBoxTheme = {
    primary: theme.colors.primary,
    primaryDark: theme.colors.primaryDark,
    primaryLight: theme.colors.primaryLight,
    // Add other properties you need from your theme
  };

  return (
    <InformationBox
      img={config.notLoggedImg.toString()}
      title={title}
      description={translation('notLoggedBox.description')}
      buttonText={translation('notLoggedBox.buttonText')}
      onPressButton={() => dispatch(openLoginPopup())}
      theme={informationBoxTheme}
    />
  );
};

export default NotLoggedBox;
