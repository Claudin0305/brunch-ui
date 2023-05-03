import React from "react";
import Stack from "@mui/material/Stack";

type Props = {
  text: string;
};

const Error: React.FC<Props> = ({ text }) => {
  return (
    <Stack direction="row" spacing={2}>
        <span className="text-red-600 text-xs mt-2">{text}</span>

    </Stack>
  );
};
export default Error;
