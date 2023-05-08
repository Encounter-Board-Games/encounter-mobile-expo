import {
  useQuery,
  useMutation,
  FetchResult, // Import FetchResult type
} from '@apollo/client';
import { customFilterQuery } from './queries/product';
import { cuponsQuery } from './queries/cupons';
import { aboutQuery, updateVersionQuery } from './queries/app';
import {
  forgotMutation,
  uploadDocumentMutation,
  respondQuestionMutation,
} from './queries/user';
import { quickSearchsQuery } from './queries/quickSearchs';
import { answerQuestionMutation } from './queries/quickSearchs';

export function useCustomFilter(type: string) {
  const { data } = useQuery(customFilterQuery, {
    variables: { type },
    onError: console.log,
  });
  return data?.customFilter;
}

export function useUploadDocument() {
  const [uploadDocument] = useMutation(uploadDocumentMutation);
  return (url: string, type: string) => {
    return uploadDocument({ variables: { url, type } }).then(
      (resp: FetchResult) => resp.data?.uploadDocument
    );
  };
}

export function useForgotPassword() {
  const [forgotPassword] = useMutation(forgotMutation);
  return (email: string) => {
    return forgotPassword({ variables: { email } }).then(
      (resp: FetchResult) => resp.data?.forgot
    );
  };
}

export function useRespondQuestion() {
  const [respondQuestion] = useMutation(respondQuestionMutation);
  return (deviceId: string, value: string) => {
    return respondQuestion({ variables: { deviceId, value } }).then(
      (resp: FetchResult) => resp.data?.respondQuestionMutation
    );
  };
}

export function useAbout() {
  const { data } = useQuery(aboutQuery, {
    onError: console.log,
  });
  return data;
}

export function useUpdateVersion() {
  const { data } = useQuery(updateVersionQuery, {
    onError: console.log,
  });
  return data?.updateVersion;
}

export function useCupons() {
  const { data } = useQuery(cuponsQuery, {
    onError: console.log,
  });
  return data;
}

export function useQuickSearchs() {
  const { data } = useQuery(quickSearchsQuery, {
    fetchPolicy: 'no-cache',
    onError: console.log,
  });
  return data?.quickSearchs;
}

export function useAnswerQuestion() {
  const [answerQuestion] = useMutation(answerQuestionMutation, {
    fetchPolicy: 'no-cache',
  });
  return (key: string, answer: string) => {
    return answerQuestion({ variables: { key, answer } }).then(
      (resp: FetchResult) => resp.data?.answerQuestion
    );
  };
}
