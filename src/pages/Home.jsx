import React from 'react'
import { Loading } from '../components/Loading'
import { HeroSlider } from '../components/HeroSlider'
import { TrendingNews } from '../components/TrendingNews'
import { CategorySec } from '../components/CategorySec'
import { NewsList } from '../components/NewsList'

export const Home = ({ articles, loading }) => {
  return (
    <main className='Home'>
      {loading && <Loading />}
      {!loading && articles.length === 0 && <p>No articles found.</p>}




      {!loading && articles.length > 0 && (
        <>
          <HeroSlider articles={articles} />
          <TrendingNews articles={articles} />
        
          <NewsList articles={articles} />
          <CategorySec articles={articles} />
        </>
      )}
    </main>
  )
}
