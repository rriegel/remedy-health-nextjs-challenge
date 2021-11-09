import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function Feed() {

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('/api/guestbook').then((res, err) => {
      if (err) {
        throw new Error("An error occurred");
      } else {
        setPosts(res.data.posts);
      }
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderPosts = () => (
    posts.length ?
      posts.map((post) => (
        <Paper key={ post.id } >
          <ListItem>
            <ListItemText
              primary={ post.name }
              secondary={ post.message }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Paper>
      )) :
      <Paper>
        <ListItem >
          <ListItemText
            primary="There are no guests :("
            secondary="(try adding a guest in the Home screen!)"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Paper>
  )

  return (
    <>
      <Box textAlign="center">
        <Link href="/">
          <Button sx={{ cursor:"pointer" }}>Home</Button>
        </Link>
      </Box>
      <Paper sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>
        <Typography>
          Guest List
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          { renderPosts() }
        </List>
      </Paper>
    </>
  )
};
