import { useContext, useState } from "react"
import { AuthContext } from "../contexts/authContext";
import { niceBytes } from '@cuban-eng/common'

type IFileData = { name: string, size:string, type: string };

export const useFileTransfer = (token: string) => {

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
      headers: {
        'authorization': `Bearer ${token}`
      },
      body: data
    });
    setLoading(false);
    
    const { name, size, type } = file;
    setFileData({name, size: niceBytes(`${size}`), type});
  }

  const download = async (url: string) => {
    try {
      
      const  [_, name] = url.split('/');
      await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_ENDPOINT}/download/${name}`, {
        headers: {
          'authorization': `Bearer12 ${token}`
        }
      })
        .then( res => res.blob() )
        .then( blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove(); 
        });
    } catch (error) {
      console.log(error);
    }
  }


  return {
    loading,
    fileData,
    upload,
    download
  }

}