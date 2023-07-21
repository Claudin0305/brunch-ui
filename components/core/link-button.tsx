import React, {ReactNode} from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

type Props = {
  path: string;
  text: string;
  icon: ReactNode;
};

const LinkButton: React.FC<Props> = ({ path, text, icon }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Link href={path}>
        <Button className="bg-blue-500 capitalize" variant="contained" startIcon={icon}>
         {text}
        </Button>
      </Link>
    </Stack>
  );
};
export default LinkButton;
