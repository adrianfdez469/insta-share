import { useContext, useState } from "react"
import { AuthContext } from "../contexts/authContext";
import { niceBytes } from '@cuban-eng/common'

type IFileData = { name: string, size:string, type: string };

export const useFileUpload = () => {

  const { state } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [fileData, setFileData] = useState<IFileData>()


  const upload = async (file: File) => {
    setLoading(true);
    const data = new FormData()
    data.append('file', file);
    data.append('user', state.id);

    await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_ENDPOINT}/upload`, {
      method: 'POST',
      body: data
    });
    setLoading(false);
    
    const { name, size, type } = file;
    setFileData({name, size: niceBytes(`${size}`), type});
  }

  return {
    loading,
    fileData,
    upload
  }

}