"use client"
import { GetHeroes } from './hooks/getHeroes'
import { useState } from 'react';
import Flow from './components/nodes'
import 'isomorphic-fetch';


export default function Home() {
  const [page, setPage] = useState(1)
  const [heroeVisible, setHeroeVisible] = useState(false)
  const [heroeData, setHeroeData] = useState()

  let { data } = GetHeroes(`${page}`);////API data

  let numberOfPagesPerURL = Math.ceil(data.count / 10)/////page size

  const handleNextClick = () => {///previous page method
    if (page === numberOfPagesPerURL) return
    setPage(page + 1)
  }

  const handlePrevClick = () => {////next page method
    if (page === 1) return
    setPage(page - 1)
  }

  const handleHeroClick = (hero) => {////method shows hero nodes,starts render Flow component
    setHeroeData(hero);
    setHeroeVisible(true)
  }

  return (
    <div data-testid="header">
      <div className=" flex items-center justify-center">
        <h2 className="text-2xl font-light text-black sm:text-4xl sm:leading-tight">
          Choose your Starwar hero
        </h2>
      </div>
      <div className="flow-root" data-testid="heroes-list">
        <div className="float-left w-[35%]" >
          {data?.results?.map((item, ind) => (
            <div key={ind} onClick={() => handleHeroClick(item)}>
              <section className="w-full rounded-lg bg-primary-100 p-1 text-primary-600 ">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
                  <div className="bg-white h-12 flex shadow-lg items-center justify-center hover:bg-teal-700" data-testid="ss">
                    {item?.name}
                  </div>
                </div>
              </section>
            </div>
          ))}
          <div className="flex justify-center items-center">
            <nav >
              <ul className="inline-flex -space-x-px text-bg">
                <li>
                  <a onClick={handlePrevClick} href="#" className="flex text-blue-600  border border-gray-300 bg-blue-50 hover:bg-blue-100  items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                <li>
                  <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{page}</a>
                </li>
                <li>
                  <a onClick={handleNextClick} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="float-right w-[64%] " style={{ height: '600px' }} >
          {
            heroeVisible ?
              <Flow data={heroeData} data-testid="heroes-data" />
              : <div data-testid="loader"></div>}
        </div>
      </div>
    </div >
  );
}
