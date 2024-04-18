"use client";
import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import { Container, Divider, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { GoSearch } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
export default function Home() {
  return (
    <>
      <NavBar />
     
      <Container  maxWidth="lg" style={{ height: '500px' }}>
     

        <main>
        <Typography  variant="h3" fontWeight="bold" align-text=" left" margin="auto" color="black"  >Discover<br></br>
     more than</Typography>
     <Typography  variant="h2" fontWeight="bold" align-text=" left" margin="auto" color="blue"  font-weight="bold" >5000+ Jobs</Typography>
    <Typography  variant="h5" color="#9e9d9d" align="left">Great platform for the job seeker that searching <br></br>for new career
    heights and passionate about startups.</Typography>
        <Box sx={{ border: '2px solid grey' }}height={80}
      width={700}
      my={4}
      display="flex"
      alignItems="center"
    justifyContent="space-around"
      > 
       

       < GoSearch  />
        <TextField id="standard-basic" label="Job titel or keyword" variant="standard"  
         
        />
  <Divider orientation="vertical" flexItem />
  < FaLocationDot />
        
        <div>
          
              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} >
              <InputLabel id="location-label">Florence,Italy</InputLabel>
              <Select
                labelId="location-label"
                
               
              >
                <MenuItem value="location1">Egypt</MenuItem>
                <MenuItem value="location2">Australia</MenuItem>
                <MenuItem value="location3">Canda</MenuItem>
                <MenuItem value="location1">France</MenuItem>
                <MenuItem value="location2">Dubia</MenuItem>
               
        
              </Select>
            </FormControl>
             
            </div>
            <Button  variant="contained"  >search</Button>
        </Box>
       
        </main>
      </Container>
      <Footer />
      </>
      
  
  );
 
}
