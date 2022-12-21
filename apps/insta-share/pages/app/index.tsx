import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Backdrop,
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
import { useFileUpload } from '../../components/hooks/useFileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFiles } from '../../components/hooks/useFiles';
import { File, niceBytes } from '@cuban-eng/common';


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
const AppPage: React.FC<IProps> = ({id: userId, logout}) => {
  
  const { upload, loading } = useFileUpload();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {data, loading: loadingFiles, subscribeToFilesChange} = useFiles(userId);
  
  
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    await upload(file);
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
              <TableCell align="right">{file.status}</TableCell>
              
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || loadingFiles}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AppPageWrapper;
