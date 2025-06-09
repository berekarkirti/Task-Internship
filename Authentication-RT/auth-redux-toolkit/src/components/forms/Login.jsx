'use client';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '@/Redux/Authantication/authSlice';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSubmit = (e) => 
//   {
//     e.preventDefault();
//     try 
//     {
//       dispatch(login({ email, password }));
//       alert('Login successful!');
//       router.push('/Dashboard');
//     } 
//     catch (error) 
//     {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 text-teal-400">
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" >
//         <h2 className="mb-6 text-2xl font-semibold text-center text-teal-600">Login</h2>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
//         <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700" >Login</button>
//       </form>
//     </div>
//   );
// }


'use client';


import { useDispatch } from 'react-redux';
import { login } from '@/Redux/Authantication/authSlice';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => 
  {
    try 
    {
      dispatch(login(data)); 
      alert('Login successful!');
      router.push('/Dashboard');
    } 
    catch (error) 
    {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-teal-400">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-teal-600">Login</h2>

        <input type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"/>
        {errors.email && (
          <p className="text-sm text-red-500 mb-4">{errors.email.message}</p>
        )}

        <input type="password" placeholder="Password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
        {errors.password && (
          <p className="text-sm text-red-500 mb-4">{errors.password.message}</p>
        )}

        <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700">Login</button>
      </form>
    </div>
  );
}

