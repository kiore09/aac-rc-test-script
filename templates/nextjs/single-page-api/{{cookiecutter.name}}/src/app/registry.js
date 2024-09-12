/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: Provider component wraps application with BaseProvider to apply Allium theme as a client component.
===========================================================================
*/
'use client'
import { useState, useEffect } from "react";
import { BaseProvider } from '@telus-uds/components-web'
import alliumTheme from '@telus-uds/theme-allium'
import '@telus-uds/palette-allium/build/web/fonts/fonts-cdn.css'

export const Provider = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  // Ensure theme is applied after the component is mounted to avoid any inconsistencies with server-side rendering and hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <BaseProvider defaultTheme={alliumTheme}>
      {children}
    </BaseProvider>
  )
}
