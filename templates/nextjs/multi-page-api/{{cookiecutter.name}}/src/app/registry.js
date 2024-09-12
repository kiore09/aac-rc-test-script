/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-26-2024
Description: Provider component wraps application with BaseProvider to apply Allium theme.
===========================================================================
*/
'use client'
import { useState, useEffect } from 'react'
import { BaseProvider } from "@telus-uds/components-web";
import alliumTheme from "@telus-uds/theme-allium";
import "@telus-uds/palette-allium/build/web/fonts/fonts-cdn.css";

export function Provider ({ children }) {
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
  );
}
