import { Backdrop, CircularProgress } from "@mui/material"

interface IProps {
  open: boolean
}
const BackDrop:React.FC<IProps> = ({open}) => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export { BackDrop };