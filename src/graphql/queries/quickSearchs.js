import gql from 'graphql-tag';

export const quickSearchsQuery = gql`
  query {
    quickSearchs {
      key
      name
      question
      type
      options
      image
      active
      answers {
        usersKey
        name
        answer
      }
    }
  }
`;

export const answerQuestionMutation = gql`
  mutation ($answer: String, $key: String!) {
    answerQuestion(answer: $answer, key: $key)
  }
`;
