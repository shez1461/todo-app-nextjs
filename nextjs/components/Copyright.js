import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}{new Date().getFullYear()}. {' Tasks To Do App by '}
      <MuiLink color="inherit" href="https://github.com/shez1461/">
        Mohamed Shez
      </MuiLink>
    </Typography>
  );
}
