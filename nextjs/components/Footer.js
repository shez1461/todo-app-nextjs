import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright "}&copy;{new Date().getFullYear()}
      {" under "}
      <MuiLink
        color="inherit"
        target="_blank"
        href="https://en.wikipedia.org/wiki/MIT_License"
      >
        {"MIT"}
      </MuiLink>
      {" License. "}
      <MuiLink
        color="inherit"
        target="_blank"
        href="https://github.com/shez1461/"
      >
        Mohamed Shez
      </MuiLink>
    </Typography>
  );
}
