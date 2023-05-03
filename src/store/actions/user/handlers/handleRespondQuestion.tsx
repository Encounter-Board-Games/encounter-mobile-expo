import { respondQuestion } from '../../../../graphql';
import { UserAction } from '../../../../types/userTypes';

export function handleRespondQuestion(value: string) {
  return async (dispatch: (action: UserAction) => void) => {
    const deviceID = await getUniqueDeviceId();
    const response = await respondQuestion(deviceID, value);
    dispatch({ type: 'RESPOND_QUESTION', payload: response });
  };
}

function getUniqueDeviceId() {
  throw new Error('Function not implemented.');
}
