import React from 'react'
import ProfileInfos from '../Components/ProfileInfos'
import Chart from '../Components/Chart'

export default function Profile() {
  return (
    <div className='profile-container h-screen w-screen bg-slate-900'>
      <div>
        <Chart />
      </div>
      <div>
        <ProfileInfos />
      </div>
    </div>
  )
}
