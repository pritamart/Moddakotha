import React from 'react'
import SimpleDetailsNewsCard from '../../components/items/SimpleDetailsNewsCard'
import Title from '../../components/items/Title'

const DetailsNews = () => {
  return (
    <div className='w-full flex flex-col gap-[14px] pr-2 py-8'>
        <Title title='স্বাস্থ্য'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3'>
            <SimpleDetailsNewsCard type='details-news'/>
            <SimpleDetailsNewsCard type='details-news'/>

        </div>
        
    </div>
  )
}

export default DetailsNews