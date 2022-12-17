
const key = '@insta-share-user';
export const useLocalStorage = () => {
  
  const getStorageData = () => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }
  
  const setStorageData = ( value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  const deleteStorageData = () => {
    localStorage.removeItem(key);
  }

  return { getStorageData, setStorageData, deleteStorageData };
}