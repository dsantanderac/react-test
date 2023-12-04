import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Tabs from './tabs'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderPage() {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white-800">
          {({ open }) => (
            <>
              <div className="border-b mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <p className="text-black">Hacker News</p>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"><Tabs/></div>
        </main>
      </div>
    </>
  )
}
