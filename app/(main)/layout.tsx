import React from 'react'
import Header from '../components/layout/Header';

import { getCurrentUser } from '../lib/auth';

const mainLayout=async  ({children}:{children: React.ReactNode})=>{
    const user = await getCurrentUser();

    return(
        <div>
             <Header user={user ?? null}/>
             <main className='container mx-auto x-4 py-8 '>{children}</main>
        </div>
    )
}
export default mainLayout;