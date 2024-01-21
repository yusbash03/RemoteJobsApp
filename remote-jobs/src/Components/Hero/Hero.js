import React from 'react';
import { Typography, Fade, Grid } from '@mui/material';
import  './Hero.css';
import { Container } from '@mui/system';

const Hero = () => {
    return ( 
        <div className="home-container">
           <Container>
        <Grid container>
         
          <Grid item xs={12} md={12} className="welcome-message">
            <Fade in={true} timeout={1000}>
            <Typography variant="h2">
                Welcome to remote daily!!! Remote jobs worldwide at your fingertips
              </Typography>
            </Fade>
          </Grid>
          <Grid item xs={12} md={23} className="welcome-message">
            <Fade in={true} timeout={1500}>
              <Typography variant="h5">
                We find connect developers to the best remote coding jobs in the world,
              only found on CrackedDevs.com
              </Typography>
            </Fade>
          </Grid>
        </Grid>
        </Container>
      </div>
     );
}
 
export default Hero;