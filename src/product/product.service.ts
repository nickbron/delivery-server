import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'

import { ProductDto } from './dto/product.dto'
import { returnProductObject, returnProductObjectFullest } from './return-product.object'

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private categoryService: CategoryService,
    ) {}

    async getAll(searchTerm?: string) {
        if (searchTerm) {
            return this.search(searchTerm)
        }

        return this.prisma.product.findMany({
            select: returnProductObject,
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async search(searchTerm: string) {
        return this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            select: returnProductObject,
        })
    }

    async bySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug,
            },
            select: returnProductObjectFullest,
        })

        if (!product) throw new NotFoundException('Product not found!')
        return product
    }

    async byCategory(categorySlug: string) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug,
                },
            },
            select: returnProductObjectFullest,
        })

        if (!products) throw new NotFoundException('Products not found!')
        return products
    }

    async create(dto: ProductDto) {
        const { description, image, price, name, categoryId } = dto
        const product = await this.prisma.product.create({
            data: {
                description: description,
                image: image,
                price: price,
                name: name,
                slug: generateSlug(dto.name),
                categoryId: categoryId,
            },
        })

        return product
    }

    async update(id: string, dto: ProductDto) {
        const { description, image, price, name, categoryId } = dto

        // await this.categoryService.getById(categoryId)

        return this.prisma.product.update({
            where: {
                id,
            },
            data: {
                description,
                image,
                price,
                name,
                slug: generateSlug(name),
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        })
    }

    async delete(id: string) {
        return this.prisma.product.delete({ where: { id } })
    }
}
