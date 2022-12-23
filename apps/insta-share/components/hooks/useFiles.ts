import { gql, useMutation, useQuery } from "@apollo/client";
import { File } from "@cuban-eng/common";

const FETCH_USERS_FILES_QUERY = gql`
  query ( $userId: String! ) {
    getFiles (user: $userId) {
      id
      name
      status 
      size
      url
      user
      zipped_size
    }
  }
`
export const FILES_SUBSCRIPTION = gql`
  subscription ( $userId: ID! ){
    fileChanged(userId: $userId) {
      id
      name
      status
      size
      zipped_size
      url
      user
    }
  }
`;

export const MUTATION_UPDATE_FILE = gql`
  mutation ($id: ID!, $name: String) {
    updateFile (id: $id, name: $name) {
    code
    success
    message
    data {
      id
      name
      status
      size
      zipped_size
      url
      user
    }
  }
}`;

export const useFiles = (userId: string, token: string) => {

  const {data, refetch, loading, error, subscribeToMore} = useQuery(FETCH_USERS_FILES_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      userId: userId
    },
    context: {
      headers: {
          "authorization": `Bearer ${token}`
      }
  }
  },)

  return {
    loading,
    error,
    data:  data ? data.getFiles : [],
    refetch, 
    subscribeToFilesChange: (userId: string) => {
      subscribeToMore({
        document: FILES_SUBSCRIPTION,
        variables: { userId:  userId},
        updateQuery: (prev, { subscriptionData }) => {  
          if (!subscriptionData.data) return prev;
          const fileChanged = subscriptionData.data.fileChanged;
          const originalfile = (prev.getFiles as File[]).find(f => f.id === fileChanged.id);
          if(originalfile) {
            if(
              originalfile.name === fileChanged.name &&
              originalfile.status === fileChanged.status &&
              originalfile.zipped_size === fileChanged.zipped_size
            ) {
              return prev;
            } else {
              return {
                getFiles: (prev.getFiles as File[]).map(f => {
                  if(f.id === fileChanged.id){
                    return fileChanged
                  }
                  return f;
                })
              }
            }
          } else {
            return {
              getFiles: [
                ...prev.getFiles,
                fileChanged
              ]
            }
          }
        }
      })
    }
  }
}

export const useMutateFile = (token: string) => {
  
  const [updateFile, { loading, error }] = useMutation(MUTATION_UPDATE_FILE, {
    context: {
      headers: {
          "authorization": `Bearer ${token}`
      }
    }
  });

  const updateFileHandler = async (id: string, name: string) => {
    const data = await updateFile({variables: { id, name }})
    return data.data;
  }

  return {
    updateFile: updateFileHandler,
    loading,
    error
  }
}
