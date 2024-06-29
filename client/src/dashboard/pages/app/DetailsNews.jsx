import React from 'react'
import SimpleDetailsNewsCard from '../../components/items/SimpleDetailsNewsCard'
import Title from '../../components/items/Title'

const DetailsNews = ({news,category}) => {
  return (
    <div className='w-full flex flex-col gap-[14px] pr-2 py-8'>
        <Title title={category}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3'>
        {news?.length >= 1 ? <SimpleDetailsNewsCard news={news[0]} type='details-news' height={400}  /> : null}
        {news?.length >= 1 ? <SimpleDetailsNewsCard news={news[1]} type='details-news' height={400}  /> : null}

        </div>
        
    </div>
  )
}

export default DetailsNews