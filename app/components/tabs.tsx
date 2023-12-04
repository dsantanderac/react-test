"use client";

import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import ListFrameworks from './listbox'
import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { ChevronDoubleDownIcon, ClockIcon } from '@heroicons/react/20/solid';
import PostsList from './card';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Tabs() {
  const storedValue = JSON.parse(localStorage.getItem('framework')) ? JSON.parse(localStorage.getItem('framework')) : 'angular' ;
  const storedFaves = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [] ;

  const [selectedValue, setSelectedValue] = useState(storedValue);
  const [posts, setPosts] = useState([]);
  const [selectedPage, setPage] = useState(0);
  const handleItemSelected = (value) => {
    setSelectedValue(value);
    fetchNewsData(value);
  };

  const observer = useRef();

  const lastPostElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMorePosts();
      }
    });
  
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    localStorage.setItem('framework', JSON.stringify(selectedValue));
  }, [selectedValue])

  const fetchMorePosts = async () => {
    try {
      const nextPage = selectedPage + 1;
      const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${selectedValue}&page=${nextPage}`);
      const data = await response.json();
      const validPosts = data.hits.filter(post => post.author && post.story_title && post.story_url && post.created_at);
  
      setPage(nextPage);
      setPosts(currentPosts => [...currentPosts, ...validPosts]);

    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };

  const fetchNewsData = async (framework) => {
    try {
      const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=${selectedPage}`);
      const data = await response.json();
      const validPosts = data.hits.filter(post => post.author && post.story_title && post.story_url && post.created_at);
      setPosts(validPosts);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchNewsData(selectedValue);
  }, []);

  return (
    <div className='w-full'>
    <Tab.Group defaultIndex={0} >
      <Tab.List className="flex justify-center space-x-4">
        <Tab 
            className={({ selected }) =>
            classNames(
              'w-1/12  py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 ',
              selected
                ? 'bg-white ring-2 border-customAzure text-customAzure shadow'
                : 'text-customGrayTitle border-customGrayBorder1'
            )
        }> All
        </Tab>

        <Tab 
            className={({ selected }) =>
            classNames(
              'w-1/12  py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-customAzure ',
              selected
                ? 'bg-white border-customAzure ring-2 text-customAzure shadow'
                : 'text-customGrayTitle border-customGrayBorder1'
            )
        }> My faves 
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
            <div>
                <ListFrameworks onItemSelected={handleItemSelected} selectedItem={selectedValue}/>
                <br />
                <PostsList posts={posts} ref={lastPostElementRef}/>
            </div>
            
        </Tab.Panel>

        <Tab.Panel>
        <PostsList posts={storedFaves} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>

    </div>
  )
}