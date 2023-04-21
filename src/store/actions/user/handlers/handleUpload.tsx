import { uploadDocument } from '../../../../graphql';
import * as ImageManipulator from 'expo-image-manipulator';
import { UserAction } from '../userTypes';
import { UserState } from '../../../../types/globals';
import { API_URI } from '../../../../graphql/client';

export function handleUploadSelfDocument(image: { uri: string }) {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { user: UserState }
  ) => {
    const { user } = getState();
    const { pendences = [] } = user;
    const SELF_WITH_DOCUMENT = 'SELF_WITH_DOCUMENT';
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }],
      { compress: 0.7 }
    );
    const { filename } = await upload(resizedPhoto.uri);
    const result = await uploadDocument(filename, SELF_WITH_DOCUMENT);
    if (result.success) {
      dispatch({
        type: 'SET_PENDENCES',
        pendences: pendences.filter((c) => c !== SELF_WITH_DOCUMENT),
      });
    }
  };
}

export async function upload(uri: string) {
  let fileType = uri.substring(uri.lastIndexOf('.') + 1);
  let formData = new FormData();

  const blob = await fetch(uri).then((response) => response.blob());

  formData.append('file', blob, `photo.${fileType}`);

  try {
    return await fetch(API_URI + '/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
}

export function handleUploadImage(file: any) {
  return async (dispatch: (action: UserAction) => void) => {
    try {
      const formData = new FormData();
      const url = process.env.REACT_APP_API + '/upload';
      formData.append('image', file);
      const response = await fetch(url, {
        method: 'POST',
        headers: {},
        body: formData,
      });

      const { filename } = await response.json();
      dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: filename });
      return filename;
    } catch (error) {
      dispatch({ type: 'UPLOAD_IMAGE_FAILURE', payload: error });
      return false;
    }
  };
}
