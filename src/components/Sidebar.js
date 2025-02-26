'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'



const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState();
  const [allSideBarItems, setAllSideBarItems] = useState()
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/side-bar-content`)
        setAllSideBarItems(response.data.data.SideBar.split(','));
        setSelectedTab(response.data.data.SideBar.split(',')[1]);
      }
      catch (error) {
        console.error("Error fetching Side bar Items:", error);
      }
    };
    fetchData();
  }, []);

 

  return (
    <div className="fixed md:flex bottom-0 md:top-0 left-0 z-30 h-16 md:h-screen w-full md:w-64 bg-[var(--secondary)] text-[var(--primary)]">
      <div className="flex flex-col w-full h-full">
        <h2 className="text-2xl font-bold p-4 hidden md:flex">Portfolio</h2>
        <nav className="h-full">
          <ul className="flex justify-around md:justify-start items-center md:items-start md:flex-col h-full md:p-4 md:gap-4">
            {
              allSideBarItems&&allSideBarItems.map((item) => {
                return (
                  <li
                    key={item}
                    onClick={() => {
                      setSelectedTab(item)
                      router.push(`/${item.toLowerCase().trim()}`)
                    }}
                    className={`p-2 rounded-md flex flex-col justify-center items-center md:flex-row cursor-pointer w-full
                      ${selectedTab === item ? 'bg-gradient-to-r from-white/30 to-transparent' : 'hover:bg-white/10'}`}
                  >
                    <img src={`${item.toLowerCase()}.png`} alt={item} className="w-5 h-5 md:mr-2" />
                    <span className='text-xs md:text-sm mt-1 md:mt-0'>{item}</span>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar