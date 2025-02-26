import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PortfolioCard({ item }) {
  return (
    <div className="flex flex-row bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full">
      {/* Image Section */}
      <div className="relative w-1/3 h-40">
        {item.image && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${item.image.url}` || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div>
          <div className="text-xs font-medium bg-gray-200 px-2 py-1 inline-block rounded-md">{item.category}</div>
          <div className="text-xs text-gray-500 mt-1">{item.author}</div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex items-center pr-4">
        <Button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm">Add to Cart</Button>
      </div>
    </div>
  );
}
