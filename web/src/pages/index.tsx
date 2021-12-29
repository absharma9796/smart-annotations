import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AppLogo from '@reusable/icons/logo';
import styles from '../styles/Home.module.css';
import { Button, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Home: NextPage = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async () => {
    alert('Implement login logic here');
  }

  return (
    <div>
      <Head>
        <title>Smart Annotations Interface</title>
        <meta name="description" content="Next Gen Web Interface to annotate your audio dataset" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-start items-center overflow-auto w-screen h-screen bg-gray-800">
        <motion.div 
          initial={{
            scale: 1,
            y: 50,
            opacity: 0,
          }}
          animate={{
            scale: [1, 0.7],
            y: 0,
            opacity: 1,
            transition: {
              duration: 1,
              delay: 0.5,
            }
          }}
          className="flex flex-col items-center"
        >
          <Typography
            variant="h1"
            className="text-gray-600 text-center selection:bg-amber-300 selection:text-amber-900"
          >
            Welcome to Smart Annotations Interface
          </Typography>
          {/* <AppLogo 
            size={200}
          /> */}
        </motion.div>
        <motion.div 
          initial={{
            opacity: 0,
            y: 200
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: 1.5,
          }}
          className="login-form bg-amber-300 p-4 rounded-xl w-96"
        >
          <div className="flex justify-center">
            <AppLogo 
              size={100}
            />
          </div>
          <div>
            <label
              className="text-xl text-amber-900"
              htmlFor="email"
            >
              Email
            </label>
            <TextField 
              id="email"
              type="email"
              variant="outlined"
              className="my-2 focus:border-amber-700"
              size="medium"
              fullWidth
            />
          </div>
          <div>
            <label
              className="text-xl text-amber-900"
              htmlFor="password"
            >
              Password
            </label>
            <TextField 
              id="password"
              type="password"
              variant="outlined"
              className="my-2 focus:border-amber-700"
              size="medium"
              fullWidth
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              className="align-center mt-4 bg-gray-700 hover:bg-gray-600 text-white capitalize"
              size="large"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Home
