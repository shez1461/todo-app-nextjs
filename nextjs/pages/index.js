import * as React from 'react';
import App from '../src/App';
import Head from 'next/head'

export default function Index() {
  return (
    <>
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <App />
    </div>
    </>
  )
}
