{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-19-2024
Description: Main page component with main page content and RandomImage component
===========================================================================
*/

'use client'
import { List, StackView, Typography, Link } from '@telus-uds/components-web'
import RandomImage from '@/components/RandomImage'

export default function Home() {

  return (
    <StackView space={{ xs: 3, xl: 5 }}>
      <Typography>
        This is a sample NextJS multi-page application generated from Arch-as-Code starter-kit templates and uses
        components from the TELUS Universal Design System (UDS). This sample includes features listed below. Additional features and examples
        may be also found in the <Link href='https://www.telus.com/universal-design-system/components/allium' target="_blank">TELUS UDS Documentation.</Link>
      </Typography>
      <List>
      <List.Item>Home Page: Random image from API</List.Item>
        <List.Item>Data Page: File upload implementation</List.Item>
        <List.Item>Data Page: Table with File data fetched from a public API</List.Item>
        <List.Item>Data Page: Sample records and pagination, using static sample data</List.Item>
      </List>
      <RandomImage />
    </StackView>
  )
}
{% endraw %}
