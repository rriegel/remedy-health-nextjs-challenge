import React, {useState} from 'react';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Form() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    setMessageError(false);

    if (name === "") setNameError(true);
    if (message === "") setMessageError(true);
    if (name && message) {
      axios.post('/api/guestbook', {
        "name": name,
        "message": message
      }).then((res, err) => {
        if (err) throw new Error("An error occurred");
        // eslint-disable-next-line no-alert
        alert(`${name} successfully submitted "${message}"`);
        const frm = document.getElementById('form');
        frm.reset();
      });
    }
  };

  return (
    <>
      <Box textAlign="center">
        <Link href="/Feed">
          <Button sx={{ cursor:"pointer" }}>Guest List</Button>
        </Link>
      </Box>
      <Paper sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>

        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)} id="form">
          <TextField
            label="Name"
            variant="outlined"
            required
            fullWidth
            onChange={ (e) => setName(e.target.value) }
            error={ nameError }
            helperText={ nameError ? "Name cannot be empty" : null }
          />
          <TextField
            label="Message"
            variant="outlined"
            required
            fullWidth
            multiline
            maxRows={4}
            onChange={ (e) => setMessage(e.target.value) }
            error={ messageError }
            helperText={ messageError ? "Message cannot be empty" : null }
          />
          <Box textAlign="center">
            <Button type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  )
};
