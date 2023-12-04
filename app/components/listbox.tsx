"use client";

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const frameworks = [
    {
        id: 1,
        value: 'angular',
        name: 'Angular',
        avatar: 'images/ico_angular.png',
    },
    {
        id: 2,
        value: 'reactjs',
        name: 'Reactjs',
        avatar: 'images/ico_react.png',
    },
    {
        id: 3,
        value: 'vuejs',
        name: 'Vuejs',
        avatar: 'images/ico_vue.png',
    }
  ]
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  

  export default function ListFrameworks({ onItemSelected, selectedItem }) {
    const [selected, setSelected] = useState(frameworks.filter(obj => obj.value === selectedItem)[0]);
    
    const handleSelection = (item) => {
        setSelected(item);
        onItemSelected(item.value); 
      };
    return (
      <Listbox value={selected} onChange={handleSelection}>
        {({ open }) => (
          <>
            <div className="relative mt-2 w-fit">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:border-customSelectedBg sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
  
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {frameworks.map((framework) => (
                    <Listbox.Option
                      key={framework.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-customSelectedBg text-gray-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={framework}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img src={framework.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {framework.name}
                            </span>
                          </div>

                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    )
  }