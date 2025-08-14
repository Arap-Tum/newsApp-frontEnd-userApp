import React from 'react'
import { Loading } from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
export const ArticlePage = ({articles, loading}) => {

  const {title} = useParams();
  const article = articles.find(a => a.title === title);

  return (
     <main className="article-page">
      {loading && <Loading />}
      
    {!loading && <>
     {article ? (
  <div className='article'>
    {article.imageUrl && (
      <img src={article.imageUrl} alt={article.title} />
    )}
    <h1>{article.title}</h1>      
    <p>{article.content}</p>
    <p>{article.author?.name}</p>
    <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
    <p>{article.readingTime} | 40 min read</p>
   </div>
) : (
  !loading && <p>Article not found</p>
)}
      <Link to="/">
        <button>Back to Articles</button>
      </Link>
    
    </>}

    </main>
  )
}
