'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

const brandsE: Brand[] = [
  {
    id: '1',
    name: 'Marca 1',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Marca 2',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Marca 3',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Marca 4',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Marca 5',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Marca 6',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Marca 7',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Marca 8',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    name: 'Marca 9',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    name: 'Marca 10',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '11',
    name: 'Marca 11',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '12',
    name: 'Marca 12',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '13',
    name: 'Marca 13',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '14',
    name: 'Marca 14',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '15',
    name: 'Marca 15',
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const brands = await prismadb.brand.findMany()

    return brands.length ? brands : brandsE
  } catch (error) {
    console.log('[BRANDS_GET]', error)
  }

  return []
}
