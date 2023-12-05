"use client";

import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';

interface PostsListProps {
  posts: any[]; // Reemplaza 'any' con un tipo más específico si es posible
}

const PostsList = forwardRef<HTMLDivElement, PostsListProps>(({ posts }, ref) => {
    // const storedFavesJSON = localStorage.getItem('favorites');
    // const storedFaves = storedFavesJSON ? JSON.parse(storedFavesJSON) : [];
    const [favorites, setFavorites] : any[] = useState([]);

    const toggleFavorite = (post: any) => {
      setFavorites((prevFavorites: any[]) => {
        const isFavorite = prevFavorites.some(favoritePost => favoritePost.objectID === post.objectID);
    
        if (isFavorite) {
          return prevFavorites.filter(favoritePost => favoritePost.objectID !== post.objectID);
        } else {
          return [...prevFavorites, post];
        }
      });
    };
      
      useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }, [favorites]);

      useEffect(() => {
        const storedFavesJSON = localStorage.getItem('favorites');
        const storedFaves = storedFavesJSON ? JSON.parse(storedFavesJSON) : [];
        setFavorites(storedFaves);
      }, []);
    return (
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <div key={index} ref={index === posts.length - 1 ? ref : null} className="mt-4 card w-full h-auto border-r border-b border-l border-t bg-white rounded-b rounded-l rounded-r flex flex-col justify-between leading-normal border-customGrayBorder hover:opacity-50">
            <div className='grid grid-cols-12' style={{height: '-webkit-fill-available'}}>
                <a href={post.story_url} target='_blank' className='col-span-10 p-4 ' style={{height: '-webkit-fill-available'}}>
                    <div className="text-customGrayText">
                        <div>
                            <div className="mb-8 ">
                              <p className="text-sm text-gray-400 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mr-2 ">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z " />
                                </svg>
                                {getCreatedDate(post.created_at) + post.author}

                              </p>
                              <div className="text-gray-500 font-bold text-l mt-2 text-customGrayTitle">{post.story_title}</div>
                            </div>
                        </div>
                    </div> 
                </a>
                <div className='col-span-2 bg-customGrayBg flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" fill="currentColor" viewBox="0 0 24 24" onClick={() => toggleFavorite(post)}>
                    {favorites.some(favoritePost => favoritePost.objectID === post.objectID) ?
                      <path fill="#DD0031" d="M12 3.248C8.852-2.154 0-.577 0 6.192 0 10.853 5.571 15.619 12 22c6.43-6.381 12-11.147 12-15.808C24-.6 15.125-2.114 12 3.248z"/>
                      :
                      <path fill="#DD0031" d="M12 8.229C12.234 7.109 13.547 2 17.382 2 19.602 2 22 3.551 22 7.003c0 3.907-3.627 8.47-10 12.629C5.627 15.473 2 10.91 2 7.003c0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zM0 7.003C0 11.071 3.06 16.484 12 22c8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737C9.662-1.996 0-1.004 0 7.003z"/>
                    }
                    </svg>
                </div>
            </div>
            
            
          </div>
        ))}
      </div>
        
    
    );
});

  function getCreatedDate(date) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString() + ' by ';
  }
  PostsList.displayName = 'PostsList';
  export default PostsList;