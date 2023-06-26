import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';

const UserPage = async() => {

  // const session = await getServerSession(authOptions);
  // console.log(session);

  
  return (
    <div>
        로그인 된 유저만
    </div>
  )
}

export default UserPage