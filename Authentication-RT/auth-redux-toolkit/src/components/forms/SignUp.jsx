'use client';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { signup } from '@/Redux/Authantication/authSlice';

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSubmit = (e) => 
//   {
//     e.preventDefault();
//     dispatch(signup({ email, password }));
//     router.push('/Login');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 text-teal-500">
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" >
//         <h2 className="mb-6 text-2xl font-semibold text-center text-teal-600">Sign Up</h2>
//         <input type="em  placeholder= " value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
//         <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700">Sign Up</button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signup } from '@/Redux/Authantication/authSlice';
import { useForm } from 'react-hook-form';

export default function SignUp() 
{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => 
  {
    dispatch(signup(data)); 
    router.push('/Login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-teal-500">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-teal-600">Sign Up</h2>

        <input type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
        {errors.email && (
          <p className="text-sm text-red-500 mb-4">{errors.email.message}</p>
        )}

        <input type="password" placeholder="Password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
        {errors.password && (
          <p className="text-sm text-red-500 mb-4">{errors.password.message}</p>
        )}

        <input type="text" placeholder="City" {...register('city', { required: 'City is required' })} className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />

        <button type="submit" className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700">Sign Up</button>
      </form>
    </div>
  );
}



