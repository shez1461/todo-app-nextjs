import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "local-dev";

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <span style={{ display: "block", marginBottom: 4 }}>
        Version: {version}
      </span>
      {"Copyright "}&copy;{new Date().getFullYear()}
      {" under "}
      <MuiLink
        color="inherit"
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/MIT_License"
      >
        {"MIT"}
      </MuiLink>
      {" License. "}
      <MuiLink
        color="inherit"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/shez1461/"
      >
        Mohamed Shez
      </MuiLink>
    </Typography>
  );
}
