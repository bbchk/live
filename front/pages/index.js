import CategoriesGallery from 'features/categories/comps/gallery'
import Head from 'next/head'
import axios from 'axios'
import { useStopLoading } from 'hooks/useStopLoading'
// import { useSession } from 'next-auth/react'

// import dynamic from 'next/dynamic'
// const LoadingOverlay = dynamic(() => import('comps/loading/overlay'))

// const lazyLoadwithFallback = (importStatement) =>
//   dynamic(importStatement, { loading: () => <LoadingOverlay loading={true} /> })

const Home = ({ rootCategories }) => {
  // const { data: session } = useSession()
  // const user = session?.user
  // const token = user?.token
  // console.log('🚀 ~ token:', token)

  useStopLoading()

  return (
    <>
      <Head>
        <title>
          Живий Світ: товари для саду, городу та домашніх улюбленців
        </title>
        <meta
          name='description'
          content='Живий Світ: товари для саду, городу та домашніх улюбленців. Найкраще для вас у магазині Живий Світ!'
        />
      </Head>

      <div id='main_content' className='my-5'>
        <CategoriesGallery rootCategories={rootCategories} />
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const res = await axios.get('/categories/root')
  const rootCategories = res.data

  const HALF_AN_HOUR = 1800
  return {
    props: {
      rootCategories,
      revalidate: HALF_AN_HOUR,
    },
  }
}
