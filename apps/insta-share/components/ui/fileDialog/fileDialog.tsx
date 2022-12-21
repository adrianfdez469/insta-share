import { FILE_STATUS, File, niceBytes } from "@cuban-eng/common";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";


interface IProps {
  file: File
  handleClose: () => void
  handleSave: (name: string) => void

}

const FileDialog:React.FC<IProps> = ({file, handleClose, handleSave}) => {

  const nameParts = file.name.split('.');
  const defaultName = nameParts.slice(0, nameParts.length - 1).join('.')
  const type = nameParts[nameParts.length - 1];
  const [name, setName] = useState(defaultName);

  return (
    <Dialog open={!!file} onClose={handleClose} fullWidth>
        <DialogTitle>File details</DialogTitle>
        <DialogContent>
          
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            variant="standard"
            fullWidth
            disabled={file.status !== FILE_STATUS.COMPRESSED}
          />
          <Typography>{`Type: ${type}`}</Typography>
          <Typography>{`Size: ${niceBytes(file.size.toString())}`}</Typography>
          <Typography>{`Compressed file size: ${niceBytes((file.zipped_size || 0).toString())}`}</Typography>
          <Typography>{`Saved space: ${niceBytes((file.size - (file.zipped_size || 0)).toString())}`}</Typography>
          <Typography>{`Status: ${file.status}`}</Typography>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={file.status !== FILE_STATUS.COMPRESSED || file.name === `${name}.${type}`} onClick={() => handleSave(name)}>Save</Button>
        </DialogActions>
      </Dialog>
  )
}

export { FileDialog };