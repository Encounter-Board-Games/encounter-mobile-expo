import { about as getAbout, updateVersion } from "../../graphql"
import storage from "../../utils/storage"
import pkg from '../../../package.json';

export const APP_SET_CONFIGURATION = "APP_SET_CONFIGURATION"
export const APP_SET_TERMS = "APP_SET_TERMS"
export const APP_SET_NEED_UPDATE_VERSION = "APP_SET_NEED_UPDATE_VERSION"


function appSetConfiguration(about){
    return {
        type: 'APP_SET_CONFIGURATION',
        about
    }
}

function appSetTerms(terms){
    return {
        type: 'APP_SET_TERMS',
        terms
    }
}
function appSetNeedUpdate(update){
    return {
        type: 'APP_SET_NEED_UPDATE_VERSION',
        update
    }
}

export function handleLoadAppConfig(){
    return async dispatch => {
        const { about, help} = await getAbout()
        const { name, instagram, description, terms, politics } = about;
        

        dispatch(appSetConfiguration(
            {
                 phone: '55' + help.match(/\d/g),
                 instagram,
                 name,
                 nameAbout: ' a ' + name,
                 aboutText: description
            }
        ))
        dispatch(appSetTerms({
                 terms,
                 policy: politics,
             }))
    }
}


export function handleLoadNeedUpdateApp() {
  return async (dispatch) => {
    try {
      const currentVersion = pkg.version;
      const update = await updateVersion(currentVersion);

      if (!update) {
        return;
      }

      const updateSave = await storage.getItem(`UPDATE_VERSION_${update.key}`);

      dispatch(
        appSetNeedUpdate({
          ...update,
          show: !updateSave,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}


export function handleCancelUpdate(){
    return async (dispatch, getState) => {

        const { app } = getState()
        const { update = {} } = app;
        
        await storage.setItem("UPDATE_VERSION" + update.key, { ok : true }) 
        dispatch(appSetNeedUpdate({
            show: false
        }))
    }
}