import React from 'react';
import Link from 'next/link';

const Home = async() =>{
    const user= false;
    return(
        <div className='max-w-4xl mx-auto p-5'>
            <h1 className='text-3xl font-bold mb-3 text-white '>TAC system</h1>
            <p className='text-slate-200 mb-3'>
                This is a system Management control for Admin,Team and Users.
            </p>
            <div className='grid md:grid-cols-2 gap-6 mb-8  '>
                <div className='bg-black rounded-lg p-6  border-1 text-white'>
                    <h3 className='font-bold text-xl pb-6'>Feature Demostrated</h3>
                    <ul className='list-disc list-inside space-y-1 text-lg text-slate-300'>
                        <li>Role-Based access control(RBAC)</li>
                        <li>Route Protection with middleware</li>
                        <li>Server-Side Permission Check</li>
                        <li>Click-Side Permission hook</li>
                        <li>Dynamic Route Access</li>
                    </ul>
                </div>
                <div className='bg-black rounded-lg p-6 text-white  border-1'>
                    <h3 className='font-bold text-xl pb-6'>User Role</h3>
                    <ul className=' space-y-1 text-lg text-slate-300'>
                        <li><strong className='text-purple-400'>Super_Admin: </strong>Full System Access.</li>
                        <li><strong className='text-green-400'>Admin: </strong>User & Team Management.</li>
                        <li><strong className='text-yellow-400'>Manager: </strong>Team Specific Management.</li>
                        <li><strong className='text-blue-400'>User: </strong>Basic Dashboard.</li>
                        
                    </ul>
                </div>
            </div>
            {user ? <div className='bg-green-900 border border-green-600 rounded-lg p-4 '>
                <p className='text-green-300'>Welcome back, <strong>Dadyy</strong>! you are logged in as {""}<strong className='text-green-200'>User</strong></p>
                <Link href="/dashboard" className='inline-block mt-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>Go to Dashboard</Link>
            </div> :
             <div className='bg-slate-900  rounded-lg p-4'>
                  <p className='text-white mb-3'> You are logged Out.</p> 
                  <div className='space-x-3'>
                        <Link href="/login" className='inline-block mt-3 px-4 py-2 bg-orange-400 text-black     rounded      hover:bg-orange-300 transition-colors'>Log In</Link>
                        <Link href="/register" className='inline-block mt-3 px-4  text-white /*border border-black*/ px-4 py-2 rounded hover:text-gray-400 transition-colors'>Register</Link>  
                    </div>    
                                    
           </div>}
        </div>
    )
}

export default Home