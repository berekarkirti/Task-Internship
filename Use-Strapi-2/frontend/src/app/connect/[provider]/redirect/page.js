// 'use client';
// import { useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import axios from 'axios';

// const SocialRedirectPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const url = new URL(window.location.href);
//     const token = url.searchParams.get('access_token');
//     const provider = url.pathname.includes('google') ? 'google' : 'github'; 

//     console.log(url);
//     console.log(token);
//     console.log(provider);

//     if (token) {
//       axios.get(`http://localhost:1337/api/auth/${provider}/callback?access_token=${token}`)
//         .then(res => {
//           const data = res.data;
//           console.log(data);

//           if (data.jwt && data.user) 
//           {
//             localStorage.setItem('jwt', data.jwt);
//             localStorage.setItem('user', JSON.stringify(data.user));
//             router.push('/product');
//           } 
//           else 
//           {
//             // alert('Login failed: Invalid JWT or user.');
            
//           }
//         })
//         .catch(() => 
//         {
//           alert('Something went wrong during social login.');
//         });

//     } 
//     else 
//     {
//       alert('Login failed: No token in URL');
//     }
//   }, []);

//   return <p className="text-center py-10">Logging you in...</p>;
// };

// export default SocialRedirectPage;

'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialRedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('access_token');
    const provider = url.pathname.includes('google') ? 'google' : 'github'; 

    console.log(url);
    console.log(token);
    console.log(provider);

    if (token) {
      axios.get(`http://localhost:1337/api/auth/${provider}/callback?access_token=${token}`)
        .then(res => {
          const data = res.data;
          console.log(data);

          if (data.jwt && data.user) {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Login successful!', { autoClose: 2000 });
            setTimeout(() => router.push('/product'), 2000); 
          } else {
            toast.error('Login failed: Invalid JWT or user.');
          }
        })
        .catch(() => {
          toast.error('Email is already taken !');
        });
    } else {
      toast.error('Email is already taken !');
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <p className="text-center py-10">Logging you in...</p>
    </>
  );
};

export default SocialRedirectPage;
