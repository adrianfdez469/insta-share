import { gql, useQuery } from "@apollo/client";
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

export const useFiles = (userId: string) => {
  const {data, refetch, loading, error, subscribeToMore} = useQuery(FETCH_USERS_FILES_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      userId: userId
    }
  })

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
