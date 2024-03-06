import { Fragment, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, CalendarDaysIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { name: "Health Insurance Plans", url: "/plans" },
  { name: "Insurance FAQ", url: "/insurance-faq" },
  { name: "About Us", url: "/about" },
  { name: "Contact Us", url: "/contact" },
];

const callsToAction = [
  { name: 'Get a Quote', href: '/get-a-quote', icon: CalendarDaysIcon },
  { name: 'Call for Support', href: 'tel:+1234567890', icon: PhoneIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="static top-0 z-50 flex-shrink-0 bg-slate-50 border-b shadow-lg md:sticky">
      <nav className="mx-auto flex container items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Insurance Help</span>
            {/* <Image
              className='h-12 w-auto'
              src={"/insurance-logo.png"} // Update this path to your logo image
              alt='Insurance Help Logo'
              width={200}
              height={200}
            /> */}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {links.map((link, i) => (
            <Link 
              key={i}
              href={link.url}
              className="text-base font-medium leading-6 text-gray-700 hover:text-gray-950 duration-200"
            >
              {link.name}
            </Link>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="tel:+1234567890" // Update this with your actual phone number
            className='text-base font-semibold leading-6 rounded-lg text-primary-400 border-2 p-2 px-4 border-primary-400'
          >
            Call Us Now!
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Insurance Help</span>
              {/* <Image
                className='h-10 w-auto'
                src={"/insurance-logo.png"} // Update this path to your logo image
                alt='Insurance Help Logo'
                width={200}
                height={200}
              /> */}
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text-900 hover:bg-gray-50"
                  >
                      {link.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="tel:+1234567890" // Update this with your actual phone number
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-text-900 hover:bg-gray-50"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
