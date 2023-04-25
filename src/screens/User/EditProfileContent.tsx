import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Linking,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { handleEditUserInfo } from '../../store/actions/user/handlers';
import { RadioButton } from '../../components/RadioButton';
import { View } from 'react-native-animatable';
import {
  Content,
  ContainerInputs,
  CustomInput,
  InputDate,
  Line,
  LineRow,
  CheckLine,
  Check,
  CustomInputText,
  TermsAndConditions,
  LineButtons,
} from './EditProfileContentStyles';
import { Subtitle2, Subtitle3 } from '../../components/Typography';
import { Space, Bottom } from '../../components/Space';
import Input from '../../components/Input';
import { Button } from '../../components/Button/Button';

interface AutoCompleteRegister {
  name?: string;
  lastname?: string;
}

interface AppTerms {
  terms: string;
  policy: string;
}

interface User {
  userInfo?: {
    name?: string;
    lastname?: string;
    preferenceName?: string;
    cellphone?: string;
    birthdayFormatted?: string;
    gender?: string;
    document?: string;
  };
  pendences?: any[];
  hasTerms?: boolean;
  email?: string;
  autoCompleteRegister?: AutoCompleteRegister;
}

interface State {
  name: string;
  lastname: string;
  aka: string;
  gender: string;
  document: string;
  cellphone: string;
  birthday: string | null;
  showDate: boolean;
  terms: boolean;
}

interface Props {
  navigation: any;
}

const EditProfileContent: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: any) => state.user);
  const autoCompleteRegister: AutoCompleteRegister =
    useSelector((state: any) => state.user?.autoCompleteRegister) || {};
  const terms: AppTerms = useSelector((state: any) => state.app?.terms);
  const hasTerms: boolean = user.hasTerms || false;

  const [state, setState] = useState<State>({
    name: '',
    lastname: '',
    aka: '',
    gender: '',
    document: '',
    cellphone: '',
    birthday: null,
    showDate: false,
    terms: false,
  });

  const initialState = useRef(JSON.stringify(state));

  useEffect(() => {
    const {
      name,
      lastname,
      preferenceName: aka,
      cellphone,
      birthdayFormatted: birthday,
      gender,
      document,
    } = user.userInfo || {};

    setState((prevState) => ({
      ...prevState,
      name: name ? name : autoCompleteRegister.name || '',
      lastname: lastname ? lastname : autoCompleteRegister.lastname || '',
      aka: aka ? aka : '',
      cellphone: cellphone ? cellphone : '',
      birthday: birthday ? birthday : null,
      gender: gender ? gender : '',
      document: document ? document : '',
    }));

    initialState.current = JSON.stringify(state);
  }, [user]);

  const cellphoneChange = (value: string) => {
    const numberPattern = /\d+/g;
    const valueToFormat = value.length !== 0 ? value.match(numberPattern)?.join('').substring(0, 11) : value;

    let result = '';

    if (value.length == 4)
      return setState((prevState) => ({
        ...prevState,
        cellphone: valueToFormat?.}));

        if (valueToFormat?.length >= 2)
          result += '(' + valueToFormat?.substring(0, 2) + ') ';
        
        if (valueToFormat?.length > 2) result += valueToFormat?.substring(2, 7);
        
        if (valueToFormat?.length > 7)
          result += '-' + valueToFormat?.substring(7, 11);
        
        return setState((prevState) => ({
          ...prevState,
          cellphone: result == '' ? valueToFormat || '' : result,
        }));
        };
        
        const enableButton = () => {
        const {
        cellphone,
        name,
        lastname,
        aka,
        birthday,
        terms,
        gender,
        document,
        } = state;
        return (
          cellphone.length === 15 &&
          name.length >= 3 &&
          lastname.length >= 3 &&
          aka.length >= 3 &&
          document.length === 14 &&
          ((hasTerms && terms) || !hasTerms) &&
          initialState.current !== JSON.stringify(state)
        );
        };
        
        const handleConfirmDate = (date: Date) => {
        const toDate = (date: Date) => {
        const day = date.getDate().toString();
        const dayF = day.length === 1 ? '0' + day : day;
        const month = (date.getMonth() + 1).toString();
        const monthF = month.length === 1 ? '0' + month : month;
        const yearF = date.getFullYear();
        return dayF + '/' + monthF + '/' + yearF;
        };
        setState((prevState) => ({
          ...prevState,
          birthday: toDate(date),
          showDate: false,
        }));
        };
        
        const handleCancelDate = () => {
        setState((prevState) => ({
        ...prevState,
        showDate: false,
        }));
        };
        
        const saveInfo = () => {
        const {
        cellphone,
        name,
        lastname,
        aka,
        birthday,
        terms,
        gender,
        document,
        } = state;
        dispatch(
          handleEditUserInfo(
            name,
            lastname,
            aka,
            birthday,
            cellphone,
            terms,
            gender,
            document
          )
        ).then((_) => {
          if (user && user.pendences && hasTerms && user.pendences.length > 0)
            navigation.navigate('SelfUpload');
        });
        Keyboard.dismiss();
        initialState.current = JSON.stringify(state);
        };
        
        const nameChange = (value: string) => {
        setState((prevState) => ({
        ...prevState,
        name: value,
        aka:
        prevState.aka === '' || prevState.aka === prevState.name
        ? value
        : prevState.aka,
        }));
        };
        
        const openTerms = (type: string) => {
        Linking.openURL(terms[type]);
        };
        
        const { cellphone } = state;
        
        return (
        <View flex={1}>
        <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        keyboardVerticalOffset={100}
        >
        <Content contentContainerStyle={{ flexGrow: 1 }}>
        <ContainerInputs>
        <>
        <Subtitle2>Nome</Subtitle2>
        <Space n={1} />
        <Input
        field
        value={state.name}
        onChangeText={(value) => nameChange(value)}
        />
        <Space n={2} />
        </>
        <>
        <Subtitle2>Sobrenome</Subtitle2>
        <Space n={1} />
        <Input
        field 
        value={state.lastname}
        onChangeText={(value) =>
          setState({ ...state, lastname: value })
        }
      />
      <Space n={2} />
    </>

    <>
      <Subtitle2>Como prefere ser chamado</Subtitle2>
      <Space n={1} />
      <Input
        field
        value={state.aka}
        onChangeText={(value) => setState({ ...state, aka: value })}
      />
      <Space n={2} />
    </>

    <>
      <Subtitle2>E-mail</Subtitle2>
      <Space n={1} />
      <Input field value={user.email} disabled />
      <Space n={2} />
    </>

    <>
      <Subtitle2>CPF</Subtitle2>
      <Space n={1} />
      <Input
        field
        placeholder="XXX.XXX.XXX-XX"
        format={(value: string) => {
          value = value.replace(/(\.|\/|\-)/g, '');
          return value.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/g,
            '$1.$2.$3-$4'
          );
        }}
        maxLength={14}
        keyboardType="number-pad"
        disabled={isEdit}
        value={state.document}
        onChangeText={(value) =>
          setState({ ...state, document: value })
        }
      />
      <Space n={2} />
    </>

    <>
      <Subtitle2>{'Número de telefone'}</Subtitle2>
      <Space n={1} />
      <CustomInput
        placeholder="(xx) xxxxx-xxxx"
        keyboardType="number-pad"
        autoCorrect={false}
        maxLength={15}
        value={cellphone}
        onChangeText={(value) => cellphoneChange(value)}
      />
      <Space n={2} />
    </>

    <DateTimePickerModal
      isVisible={state.showDate}
      mode="date"
      locale="pt-br"
      headerTextIOS="Data de nascimento"
      maximumDate={new Date()}
      onConfirm={(date: Date) => handleConfirmDate(date)}
      onCancel={() => handleCancelDate()}
    />

    <>
      <Subtitle2>
        {'Data de nascimento'} <Subtitle3>(Opcional)</Subtitle3>{' '}
      </Subtitle2>
      <Space n={1} />
      <InputDate onPress={() => setState({ ...state, showDate: true })}>
        {state.birthday ? (
          <CustomInputText hasValue>{state.birthday}</CustomInputText>
        ) : (
          <CustomInputText>dd/mm/aaaa</CustomInputText>
        )}
      </InputDate>
      <Space n={2} />
    </>

    <>
      <Subtitle2>
        {'Gênero que mais se identifica'}{' '}
        <Subtitle3>(Opcional)</Subtitle3>
      </Subtitle2>
      <Space n={1} />
      <Line>
        {['Feminino', 'Masculino', 'Outro'].map((gender) => (
          <RadioButton
            key={gender}
            isLast={gender === 'Outro'}
            isSelected={state.gender === gender}
            onPress={() => setState({ ...state, gender })}
          >
            {gender}
          </RadioButton>
        ))}
      </Line>

      <Space n={2} />
    </>

    <Space n={3} />

    {hasTerms && (
      <Line>
        <CheckLine
          onPress={() => setState({ ...state, terms: !state.terms })}
        >
          <Check selected={state.terms} />
        </CheckLine>
        <LineRow>
                  <Subtitle2 width="auto">Li e concordo com os </Subtitle2>
                  <TermsAndConditions onPress={() => openTerms('terms')}>
                    <Subtitle2 width="auto" underline>
                      Termos e Condições
                    </Subtitle2>
                  </TermsAndConditions>
                  <Subtitle2 width="auto"> e </Subtitle2>
                  <TermsAndConditions onPress={() => openTerms('policy')}>
                    <Subtitle2 width="auto" underline>
                      Política de Privacidade
                    </Subtitle2>
                  </TermsAndConditions>
                </LineRow>
              </Line>
            )}
           <Space n={3} />
      </ContainerInputs>
      <LineButtons>
        <Button
          disabled={!enableButton()}
          onPress={() => saveInfo()}
          type="CallToAction-Light"
        >
          {hasTerms ? 'Confirmar' : 'Salvar'}
        </Button>
      </LineButtons>
      <Bottom />
    </Content>
  </KeyboardAvoidingView>
</View>
);
}

interface EditProfileContentProps {
navigation: any;
}

interface UserInfo {
name: string;
lastname: string;
preferenceName: string;
cellphone: string;
birthdayFormatted: string | null;
gender: string;
document: string;
}

interface AutoCompleteRegister {
name: string;
lastname: string;
}

interface State {
name: string;
lastname: string;
aka: string;
gender: string;
document: string;
cellphone: string;
birthday: string | null;
showDate: boolean;
terms: boolean;
}

interface Terms {
terms: string;
policy: string;
}

interface RootState {
user: {
userInfo?: UserInfo;
autoCompleteRegister?: AutoCompleteRegister;
hasTerms: boolean;
pendences?: any[];
};
app: {
terms: Terms;
};
}

interface RadioButtonItem {
key: string;
isLast: boolean;
isSelected: boolean;
onPress: () => void;
}

function RadioButtonItem({
key,
isLast,
isSelected,
onPress,
children,
}: RadioButtonItem) {
return (
<>
<RadioButton isLast={isLast} isSelected={isSelected} onPress={onPress}>
{children}
</RadioButton>
{!isLast && (
<Space n={2}>
<Line />
</Space>
)}
</>
);
}

       

