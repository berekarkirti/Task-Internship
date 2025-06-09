'use client'

import { signOut } from 'firebase/auth'
import { auth } from '../config'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => 
{
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => 
    {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => 
        {
            if (currentUser) 
            {
                setUser(currentUser)
            } 
            else 
            {
                router.push('/')
            }
        })
        return () => unsubscribe()
    }, [router])

    const handleSignOut = async () => 
    {
        try 
        {
            await signOut(auth)
            router.push('/')
        } 
        catch (error) 
        {
            console.error('Sign out error:', error)
        }
    }

    if (!user) 
    {
        return null ;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome, {user.phoneNumber || 'User'}!
                    </h1>
                    <button onClick={handleSignOut} className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" >
                        Sign Out
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h2 className="text-xl font-semibold text-white mb-4">Your Profile</h2>
                    <div className="space-y-2">
                        <p className="text-gray-200">
                          <span className="font-medium">Phone:</span> {user.phoneNumber || 'Not set'}
                        </p>
                        <p className="text-gray-200">
                          <span className="font-medium">Last Login:</span> {new Date(user.metadata.lastSignInTime).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Activity Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                        <ul className="space-y-3 text-gray-200">
                            <li className="flex justify-between">
                                <span>Logged in</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Updated profile</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Viewed dashboard</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard