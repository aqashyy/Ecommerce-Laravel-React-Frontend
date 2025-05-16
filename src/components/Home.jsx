import React from 'react'
import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Hero from './common/Hero';
import Layout from './common/Layout';

export default function Home() {
  return (
    <>
        <Layout>
            <Hero />
            <LatestProducts />
            <FeaturedProducts />
        </Layout>
        
    </>
  )
}
