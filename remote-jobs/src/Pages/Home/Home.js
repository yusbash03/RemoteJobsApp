import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, Pagination, Fade, Alert, Chip, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../utils/API';
import Hero from '../../Components/Hero/Hero';
import './Home.css'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Common/Navbar';
import SendIcon from '@mui/icons-material/Send';



//const API_URL = 'https://api.crackeddevs.com/api/get-jobs?limit=20';
const defaultImage = 'https://media.istockphoto.com/id/1398473177/photo/questionnaire-with-checkboxes-filling-survey-form-online-answer-questions.jpg?s=1024x1024&w=is&k=20&c=A38N141knXQRDuPUZCsj_dIKkJa-pnsT_lz3QK3_6n4=';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const jobsPerPage = 10;

  useEffect(() => {

    setIsLoading(true);
    const FetchCrackDevesAPI = async ()=>{
      await axios
     .get(`${API_BASE_URL}/get-jobs`, {
       headers: {
         'api-key': API_KEY,
       },
       params: {
         limit: jobsPerPage,
         page: currentPage,
       },
     })
     .then((response) => {
       setJobs(response.data);
       setFilteredJobs(response.data);
       setIsLoading(false)
       //console.log(response.data);
     })
     .catch((error) => 
     {
      alert(error);
      console.error('Error fetching data: ', error);
      setIsLoading(false)
     }
     );
   };

  FetchCrackDevesAPI();
  setIsLoading(false)
  }, [currentPage]);




  // This will handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) 
      //|| job.technologies.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); 
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleAlert = (event) => {
    event.preventDefault();
    alert('not available');
  };

  return (
    <>
    <Navbar/>
    <Hero/>
    <div className='searchBar' >
      <Container>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      </Container>
   
    </div>
    <Container>
      
   
      <Typography variant="h4" style={{float: 'left', textDecoration: 'underline', color: 'blue', marginBottom: 10}} gutterBottom>
        Available Jobs
      </Typography>

    {isLoading &&  <CircularProgress />}
   
    {currentJobs ? 
    <>
     <Grid container spacing={2}>
        {currentJobs.map(job => (
          <Grid item xs={12} key={job.id}>
           <Link 
           to={`/job/${job.id}`}
           state= {{
            id: job.id,
            title: job.title,
            applications: job.applications,
            company: job.company,
            imageURL: job.image_url || defaultImage,
            technologies: job.technologies,
            description: job.description,
          }}
          style={{ textDecoration: 'none', color: 'inherit' }}
           >
           <Fade in timeout={500}>
            <Card>
                <CardContent>
                  <Grid container >
                    <Grid item >
                    {job.image_url && job.image_url !== "" ? (
                <img
                  src={job.image_url}
                  alt="Logo"
                  style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                  
                />
              ) : (
                <img
                  src={defaultImage}
                  alt="Default Logo"
                  style={{ width: '120px', height: '120px',  borderRadius: '50%' }}
                />
              )}
                     
                    </Grid>
                    <Grid item style={{ flex: 1 }} > 
                      <Typography variant="h4">{job.title}</Typography>
                      <Typography color="textSecondary" variant='h5'>{job.company}</Typography>
                     <p></p>
                      {job.min_salary_usd > 0 ? (<Chip color="secondary" label={`Min Salary: ${job.min_salary_usd}`}/> ):
                      (<Chip color="secondary" label={`Min Salary: N/A`}/>)}
                      
                    </Grid>
                    <Grid item >
                    <Button variant="contained" onClick={(e)=> handleAlert(e)} size='large' endIcon={<SendIcon />} color="primary">
                        Apply
                      </Button>

                      <p></p>
                      {job.degree_required ? (
                      <Chip label="Degree Required" color='primary' variant='outlined' size="small" />
                      ) : (
                        <Chip label="No Degree Required" color='primary' variant='outlined' size="small" />
                      )}
                     
                    </Grid>
                    {/* <Grid item>
                      
                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>
             
            </Fade>
           </Link>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredJobs.length / jobsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px' }}
        disabled={false}
      />
    </> : <><h4>Cound not fetch data</h4></>}
     
    </Container>
    </>
  );

 
};

export default Home;
