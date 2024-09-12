/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 01-23-2024
Description: Navigation component
===========================================================================
*/
'use client'
import { useState, useEffect } from 'react'
import { NavigationBar, StackView } from '@telus-uds/components-web'
import { usePathname, useRouter } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter();
  const [ currentPage ] = useState(pathname === '/data-page' ? '2' : '1');
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClick = (event, href) => {
    event.preventDefault();
    router.push(href);
  };

  const items = [
    {
      id: '1',
      label: 'Home',
      href: `/`
    },
    {
      id: '2',
      label: 'Data Page',
      href: `/data-page`
    }
  ]

	return (
    <StackView space={4}>
      <NavigationBar
        selectedId={currentPage}
        items={items}
        onClick={handleClick}
      />
    </StackView>
	)
}

export default Navigation
