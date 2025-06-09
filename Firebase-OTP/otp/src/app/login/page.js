'use client'

import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../config'

const OtpLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [verificationId, setVerificationId] = useState(null)
    const router = useRouter();

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    console.log('Recaptcha solved');
                }
            });
        }
    };

    const handleSendOtp = async () => {
        if (!phoneNumber.startsWith('+')) {
            alert('Please include country code, e.g. +91xxxxxxxxxx');
            return;
        }

        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            console.log('OTP sent successfully');
        } catch (error) {
            console.log('handle send', error);
        }
    };

    const VerifyOtp = async () => {
        if (!verificationId || !otp) {
            alert('Please enter the OTP and ensure it’s sent.');
            return;
        }

        const credential = PhoneAuthProvider.credential(verificationId, otp);
        try {
            await signInWithCredential(auth, credential);
            alert('OTP verified successfully');
            router.push('/dashboard');  
        } catch (error) {
            console.log(error);
            alert('OTP verification failed. Please try again.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
                <h2 className="text-2xl font-bold text-center text-white">Phone Verification</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="e.g. +91xxxxxxxxxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    <button
                        onClick={handleSendOtp}
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300"
                    >
                        Send OTP
                    </button>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/5 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        />
                    </div>

                    <button
                        onClick={VerifyOtp}
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300"
                    >
                        Verify OTP
                    </button>
                </div>

                <div id="recaptcha-container" className="mt-4"></div>
            </div>
        </div>
    )
}

export default OtpLogin;