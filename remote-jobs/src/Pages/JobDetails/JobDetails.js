import React from 'react';
import {  Link, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../../Components/Common/Navbar';

const JobDetails = () => {
    const location = useLocation();
  const {  title, technologies, description, imageURL, company, applications } = location.state || {}; 
console.log('loc', location);


  return (
    <>
    <Navbar/>
      <Container>
        <div style={{float : 'left'}}>
        <IconButton component={Link} to="/" style={{ marginBottom: 20 }}>
        <ArrowBackIcon color='dodgerblue' /> <Typography variant='h6'>Back to all jobs</Typography>
      </IconButton>
        </div>
     
      <br/>
      <Card>
        {title && <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">{title}</Typography>
              <br/>
              <Typography variant="h4" color="textSecondary">
                {company}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img
                src={imageURL}
                alt="Job Logo"
                style={{ width: '195px', height: '200px',  borderRadius: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="h5">Technologies: {technologies}</Typography>
              <br/>
              <Typography color="textSecondary" variant="h5">Number Of Applicants: {applications} </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h4'>Job Description</Typography>
              <Typography variant="body1">{description}</Typography>
            </Grid>
            <Grid item xs={12}>
                    <Button variant="contained" onClick={()=> alert('not available')} size='large' endIcon={<SendIcon />} color="primary">
                        Apply
                      </Button>
               
            </Grid>
          </Grid>
        </CardContent>}
        
      </Card>
    </Container></>
  
  );
};

export default JobDetails;
