import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../components/contexts/authContext';
import { useContext } from 'react';
import { useAuthGuard } from '../../components/hooks/useAuthGuard';
import { useFileTransfer } from '../../components/hooks/useFileTransfer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFiles, useMutateFile } from '../../components/hooks/useFiles';
import { FILE_STATUS, File, niceBytes } from '@cuban-eng/common';
import EditIcon from '@mui/icons-material/Edit';
import { FileDialog } from '../../components/ui/fileDialog/fileDialog';
import { BackDrop } from '../../components/ui/BackDrop';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const AppPageWrapper: React.FC = () => {
  
  useAuthGuard();
  const { logout, state } = useContext(AuthContext);

  if(state) {
    return <AppPage {...state} logout={logout}/>
  }
  return null;
}



interface IProps  {
  id: string,
  email: string,
  token: string,
  exp: number,
  logout: () => void
}
const AppPage: React.FC<IProps> = ({id: userId, token, logout}) => {
  
  const { upload, loading, download } = useFileTransfer(token);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {data, loading: loadingFiles, subscribeToFilesChange, refetch} = useFiles(userId);
  const [fileSelected, setFileSelected] = useState<File>();
  const { updateFile, error, loading: loadingUpdate } = useMutateFile()
  
  const handleSaveFileName = async (id: string, name: string) => {
    
    if(fileSelected) {
      
      await updateFile(id, name);
      refetch({userId: userId});
      setFileSelected(undefined);
    }
  }

  const handleFileSelected = (file: File) => {
    setFileSelected(file);

  }

  const handleFileDeselected = () => {
    setFileSelected(undefined)
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if(file){
      await upload(file);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadBtnStyle = {position: 'absolute',bottom: 24,right: 24};

  useEffect(() => {
    subscribeToFilesChange(userId)
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your Files
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File name</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Compressed size</TableCell>
            <TableCell align="right">Status</TableCell>
            
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.map((file: File) => (
            <TableRow
              key={file.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {file.name}
              </TableCell>
              <TableCell align="right">{niceBytes(file.size.toString())}</TableCell>
              <TableCell align="right">{niceBytes((file.zipped_size || 0).toString())}</TableCell>
              <TableCell align="right">{file.status} { file.status !== FILE_STATUS.COMPRESSED && <CircularProgress size={16} /> }</TableCell>
              
              <TableCell align="right">
                <IconButton color="primary" aria-label="Edit file" onClick={() => handleFileSelected(file)}>
                    <EditIcon />
                </IconButton>
              </TableCell>
              
              <TableCell align="right">
                <IconButton 
                  disabled={file.status !== FILE_STATUS.COMPRESSED} 
                  color="primary" aria-label="Download file" 
                  onClick={() => download(file.url)}>
                    <CloudDownloadIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={uploadBtnStyle}
      >
        Upload File
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>

      <BackDrop open={loading || loadingFiles || loadingUpdate} />
      {fileSelected && 
        <FileDialog 
          file={fileSelected} 
          handleClose={handleFileDeselected} 
          handleSave={(newFileName) => { handleSaveFileName(fileSelected.id, newFileName) }} 
        />
      }
    </>
  );
};

export default AppPageWrapper;
