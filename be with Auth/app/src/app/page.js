import Link from 'next/link';
import React from 'react';


const Home = () => 
{
  return (
    <>
      <h1>Home page</h1>
      <Link href="/signup">Go to Signup Page</Link>
    </>
  );
};

export default Home;
