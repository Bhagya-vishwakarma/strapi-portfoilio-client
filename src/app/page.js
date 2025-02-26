"use client"
import { useState, useEffect } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioCard } from "@/components/portfolio-card"
import axios from "axios"
import { TabsContent } from "@radix-ui/react-tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"



export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("project")
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState()
  const [searchedContent, setSearchedContent] = useState()
  const [portfolioCards, setPortfolioCards] = useState([]);
  const [categories, setCategories] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolio-cards?populate=*`);
        setPortfolioCards(response.data.data);
        setSearchedContent(response.data.data);
        console.log(response.data.data);

      } catch (error) {
        console.error("Error fetching portfolio cards:", error);
      }
    };
    fetchData();

  }, []);

  useEffect(() => {
    setCategories([...new Set(portfolioCards.map((card) => card.category))]);
  }, [portfolioCards])

  useEffect(() => {
    setSearchedContent(portfolioCards.filter((card) => {
      const matched = search ? card.title.toLowerCase().includes(search.toLowerCase()) || card.description.toLowerCase().includes(search.toLowerCase()) || card.author.toLowerCase().includes(search.toLowerCase()) || card.category.toLowerCase().includes(search.toLowerCase()) : true
      const catMatched = selectedCategory ? card.category.toLowerCase() === (selectedCategory.toLowerCase()) : true;
      return matched && catMatched;
    }))
  }, [search, selectedCategory])




  return (
    <div className="min-h-screen bg-gray-50 ml-0 md:ml-64 mt-16 p-4 md:p-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 hidden md:inline">Portfolio</h1>
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div className="w-full lg:w-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full lg:w-auto grid grid-cols-4 gap-1">
                <TabsTrigger value="project" className="px-4 py-2">Project</TabsTrigger>
                <TabsTrigger value="saved" className="px-4 py-2">Saved</TabsTrigger>
                <TabsTrigger value="shared" className="px-4 py-2">Shared</TabsTrigger>
                <TabsTrigger value="achievement" className="px-4 py-2">Achievement</TabsTrigger>
              </TabsList>
              <TabsContent value="saved">Saved content </TabsContent>
              <TabsContent value="shared">Shared content</TabsContent>
              <TabsContent value="achievement">Achievement content</TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div variant="outline" size="icon" className="hover:bg-gray-100">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                  <span className="text-gray-600">Filter</span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Filters</DialogTitle>
                </DialogHeader>
                <DialogDescription>Choose a category to filter the portfolio items. Select one option from the available categories below.</DialogDescription>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {categories && categories.map((cat) =>
                    <label key={cat} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        id={cat}
                        name="category"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          setSelectedCategory(e.target.id);
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">{cat}</span>
                    </label>
                  )}
                </div>
                <DialogClose>
                  <div className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-center cursor-pointer transition-colors duration-200">Apply</div>
                  <div className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-center cursor-pointer transition-colors duration-200" onClick={()=>setSelectedCategory("")}>Reset</div>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search a project"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full sm:w-[300px] rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {searchedContent && searchedContent.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}