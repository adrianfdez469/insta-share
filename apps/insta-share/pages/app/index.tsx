import { ChangeEvent } from 'react'
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { AuthContext } from '../../components/contexts/authContext';
import { useContext } from 'react';
import { useAuthGuard } from '../../components/hooks/useAuthGuard';
import { useFileUpload } from '../../components/hooks/useFileUpload';

const AppPage: React.FC = () => {
  useAuthGuard();
  const { logout } = useContext(AuthContext);
  const { upload, fileData, loading } = useFileUpload()
  

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    upload(file);
  };

  return (
    <>
      Welcome
      <Button variant="contained" onClick={logout}>
        Cerrar sesion
      </Button>
      <Button variant="contained" component="label" startIcon={<UploadFileIcon  />}>
        Upload File
        
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
      {fileData && 
        <>
          <Typography variant='body1'>FileName {fileData.name}</Typography>
          <Typography variant='body1'>FileSize {fileData.size}</Typography>
          <Typography variant='body1'>FileType {fileData.type}</Typography>
        </>
      }
      
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          //onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      
    </>
  );
};

export default AppPage;
