const encounterSettings = {
  API_URI: 'https://encounter-api-prd.herokuapp.com',

  translation: 'encounter',
  facebookAppId: '707085366783241',

  notLoggedImg: require('./assets/img/no-orders.png'),
  splash: require('./assets/splash-encounter.png'),

  showCompanyOnAvaiable: false,
  notFoundSuggestion: false,
  experience: false,
  hideNumberOfPlayers: false,
  chooseTagsAndCategories: false,

  evaluation: true,
  favorites: true,
  rentTimeBox: true,
  myPreferences: true,
  cleanStorage: false,

  login: {
    facebook: true,
    google: true,
    password: true,
    googleSignIn: {
      android:
        // eslint-disable-next-line max-len
        '907241676885-5guesahdj42ou2p44lpk8slb7d6j0j7a.apps.googleusercontent.com',
      // eslint-disable-next-line max-len
      ios: '907241676885-mm3oh94rcke1a5nfm8ra4jtls0comm6a.apps.googleusercontent.com',
    },
  },

  theme: {
    fontSize: undefined,
    colors: {
      primary: '#c8e8e0',
      primaryDark: '#0e9577',
      primaryLight: '#ebf7f4',
      secondary: '#BCBEC0',
      secondaryDark: '#6D6E71',
      secondaryLight: '#E6E7E8',

      complement: '#0d3c54',

      light: '#FAFAFA',
      dark: '#414042',

      success: '#6FE382',
      warning: '#fda856',
      danger: '#E35959',
    },
    elements: {
      productDetailsImage: 0.5,
    },
  },
} as const;

export default encounterSettings;
