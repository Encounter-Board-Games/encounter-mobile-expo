import React, { FC } from 'react';
import InformationBox from '../../../components/InformationBox';
import { openLoginPopup } from '../../../store/actions/user/login';
import { useDispatch } from 'react-redux';
import { translation } from '../../../texts';
import config from '../../../config';

interface NotLoggedBoxProps {
  title: string;
}

const NotLoggedBox: FC<NotLoggedBoxProps> = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <InformationBox
      img={config.notLoggedImg}
      title={title}
      description={translation('notLoggedBox.description')}
      buttonText={translation('notLoggedBox.buttonText')}
      onPressButton={() => dispatch(openLoginPopup())}
    />
  );
};

export default NotLoggedBox;
