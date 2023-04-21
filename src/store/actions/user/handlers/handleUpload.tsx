import { uploadDocument } from "../../../../graphql";
import * as ImageManipulator from "expo-image-manipulator";
import { 
  UserAction
} from '../userTypes'
import { UserState } from "@types/globals";


export function handleUploadSelfDocument(image: { uri: string }) {
  return async (dispatch: (action: UserAction) => void, getState: () => { user: UserState }) => {
    const { user } = getState();
    const { pendences = [] } = user;
    const SELF_WITH_DOCUMENT = "SELF_WITH_DOCUMENT";
    const resizedPhoto = await ImageManipulator.manipulateAsync(
    image.uri,
    [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
    { compress: 0.7, format: "jpeg" }
    );
    const { filename } = await upload(resizedPhoto.uri);
    const result = await uploadDocument(filename, SELF_WITH_DOCUMENT);
    if (result.success) {
      dispatch(setPendences(pendences.filter((c) => c !== SELF_WITH_DOCUMENT)));
    }
  };
}

export async function upload(uri: string) {
  let fileType = uri.substring(uri.lastIndexOf(".") + 1);
  let formData = new FormData();

  let options = {
    method: "POST",
    body: FormData,
    headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    },
  };
  try {
    return await fetch(API_URI + "/upload", options).then((response) =>
    response.json()
    );
  } catch (error) {
    console.log(error);
  }
}

export function handleUploadImage(file: any) {
  return async (dispatch: (action: UserAction) => void) => {
    try {
      const formData = new FormData();
      const url = process.env.REACT_APP_API + "/upload";
      formData.append("image", file);
      const response = await fetch(url, {
        method: "POST",
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




