import CategoryCarousel from '@/components/utils/corousel'
import db from '@/db';
import { categories } from '@/db/schema';
import React from 'react'

export default async function PostCategories() {
  const allCategories = await db.select().from(categories);
  return (
    <div>
      <div className="flex gap-2">
          <CategoryCarousel allCategories={allCategories}/>
      </div>
    </div>
  )
}