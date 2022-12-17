import { gql, useMutation } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      code
      success
      message
      user {
        id
        email
      }
    }
  }
`

const useCreateUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION)

  const createUserHandler = async (email: string, password: string) => {
    const data = await createUser({variables: { email, password }})
    return data.data.createUser.user;
  }

  return {
    createUser: createUserHandler,
    loading,
    error
  }
}

export default useCreateUser;