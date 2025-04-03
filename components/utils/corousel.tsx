import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"

export default function CategoryCarousel({allCategories}: {allCategories: Array<{id: string, name: string}>}) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent className="-ml-1">
        {allCategories.map((category) => (
          <CarouselItem key={category.id} className="basis-auto">
              <Button variant="outline" className="rounded-md px-4 py-1.5">
                {category.name}
              </Button>
          </CarouselItem>
        ))}
      </CarouselContent> 
    </Carousel>
  )
}
