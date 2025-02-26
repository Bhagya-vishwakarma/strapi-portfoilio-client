import React from 'react'
import { Bell, ChevronDown, User, Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="fixed top-0 z-20 left-0 h-16 w-full md:w-full bg-[var(--primary)] text-black p-4 shadow-lg border-b border-gray-200/20">
      <div className="flex  justify-between items-center h-full ">
        <h2 className="text-2xl font-bold opacity-100 md:opacity-0">Portfolio</h2>
        <div className="flex items-center gap-x-1">
          <div className="cursor-pointer hover:bg-white/30 p-2 rounded-full transition duration-200 hover:shadow-md">
            <Bell className="w-6 h-6" color='black' />
          </div>

          <div className="flex items-center gap-x-1 cursor-pointer hover:bg-white/30 p-2 rounded-md transition duration-200 hover:shadow-md">
            <User color='black' className="w-8 h-8 rounded-full border-2 border-white/30" />
            <span className="font-medium hidden md:flex">John Doe</span>
            <ChevronDown color='black' className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar