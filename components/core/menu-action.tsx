import React, {ReactNode} from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Link from "next/link";
type Props = {
  text: string;
  icon: ReactNode;
  path_details: string;
  // path_edit: string;
}

type Props_={

  path_details: string;
  path_edit: string;
}

const Item: React.FC<Props> = ({text, icon, path_details})=>{
  return(
    <div className="flex">
      <Link href={path_details}>
      {icon}<span className="ml-8 gb-black">{text}</span>
      </Link>
      </div>
  )
}
// const options: ReactNode[] = [
//   <Item icon={<EditIcon/>} text={"Editer"}/>
// ];

const ITEM_HEIGHT = 48;

const MenuAction: React.FC<Props_> = ({path_details, path_edit})=> {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {/* {options.map((option, i) => ( */}
          <MenuItem onClick={handleClose}>
             <Item icon={<EditIcon/>} text={"Editer"} path_details={path_edit}/>
          </MenuItem>
          <MenuItem onClick={handleClose}>
             <Item icon={<ReadMoreIcon/>} text={"Détails"} path_details={path_details}/>
          </MenuItem>
        {/* ))} */}
      </Menu>
    </div>
  );
}

export default  MenuAction;
