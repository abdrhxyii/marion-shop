"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { isEqual } from "lodash"
import ProductOptionSelector from "../product-option-selector"
import ProductAddToCart from "../product-add-to-cart"
import ProductExpandableSection from "../product-expandable-section"
import { getProductPrice } from "@lib/util/get-product-price"
import { RotateCcw } from "lucide-react"

type ProductDetailProps = {
	product: HttpTypes.StoreProduct
	region: HttpTypes.StoreRegion
}

const optionsAsKeymap = (
	variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
	return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
		acc[varopt.option_id] = varopt.value
		return acc
	}, {})
}

export default function ProductDetail({
	product,
	region,
}: ProductDetailProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [options, setOptions] = useState<Record<string, string>>({})

	useEffect(() => {
		const variantId = searchParams.get("v_id")
		if (variantId && product.variants) {
			const variant = product.variants.find((v) => v.id === variantId)
			if (variant) {
				const variantOptions = optionsAsKeymap(variant.options)
				setOptions(variantOptions ?? {})
				return
			}
		}

		if (product.variants?.length === 1) {
			const variantOptions = optionsAsKeymap(product.variants[0].options)
			setOptions(variantOptions ?? {})
		}
	}, [product.variants, searchParams])

	const selectedVariant = useMemo(() => {
		if (!product.variants || product.variants.length === 0) {
			return null
		}

		return (
			product.variants.find((v) => {
				const variantOptions = optionsAsKeymap(v.options)
				return isEqual(variantOptions, options)
			}) || null
		)
	}, [product.variants, options])

	useEffect(() => {
		if (!selectedVariant) return

		const params = new URLSearchParams(searchParams.toString())
		if (params.get("v_id") !== selectedVariant.id) {
			params.set("v_id", selectedVariant.id)
			router.replace(pathname + "?" + params.toString())
		}
	}, [selectedVariant, pathname, router, searchParams])

	const priceInfo = useMemo(() => {
		if (selectedVariant) {
			const priceData = getProductPrice({
				product,
				variantId: selectedVariant.id,
			})
			return priceData.variantPrice
		}
		const priceData = getProductPrice({ product })
		return priceData.cheapestPrice
	}, [product, selectedVariant])

	const handleOptionChange = (optionId: string, value: string) => {
		setOptions((prev) => ({
			...prev,
			[optionId]: value,
		}))
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 
				className="text-black font-medium"
				style={{
					fontSize: '30px',
					lineHeight: '39px',
					letterSpacing: '-0.6px',
					color: '#1a1a1a'
				}}
			>
				{product.title}
			</h1>

			{product.description && (
				<p 
					className="font-medium"
					style={{
						color: '#6b6b6b',
						letterSpacing: '-0.32px',
						lineHeight: '24px'
					}}
				>
					{product.description}
				</p>
			)}

			{product.options?.map((option) => {
				const selectedValue = options[option.id] || null
				return (
					<ProductOptionSelector
						key={option.id}
						option={option}
						selectedValue={selectedValue}
						onValueChange={(value) => handleOptionChange(option.id, value)}
					/>
				)
			})}

			{priceInfo && (
				<div className="flex flex-col gap-1">
					<span className="text-2xl font-semibold text-black">
						{priceInfo.calculated_price}
					</span>
					{priceInfo.price_type === "sale" && priceInfo.original_price && (
						<span className="text-lg text-gray-500 line-through">
							{priceInfo.original_price}
						</span>
					)}
				</div>
			)}

			<ProductAddToCart product={product} selectedOptions={options} />

			<div className="flex flex-col">
				<ProductExpandableSection title="Details & Care">
					<div className="space-y-2">
						{product.material && (
							<p>
								<strong>Material:</strong> {product.material}
							</p>
						)}
						{product.weight && (
							<p>
								<strong>Weight:</strong> {product.weight}g
							</p>
						)}
						<p>
							Care instructions: Machine wash cold, tumble dry low. Do not
							bleach.
						</p>
					</div>
				</ProductExpandableSection>

				<ProductExpandableSection title="Delivery and Payment">
					<div className="space-y-2">
						<p>
							<strong>Free shipping</strong> on orders over $50
						</p>
						<p>
							<strong>Standard delivery:</strong> 3-5 business days
						</p>
						<p>
							<strong>Express delivery:</strong> 1-2 business days
						</p>
						<p>
							We accept all major credit cards and PayPal.
						</p>
					</div>
				</ProductExpandableSection>
			</div>

			<div className="flex items-center gap-2">
				<RotateCcw className="w-4 h-4" />
				<span 
					className="font-medium"
					style={{
						color: '#565656',
						fontSize: '15px',
						letterSpacing: '-0.28px',
						lineHeight: '21px'
					}}
				>
					Easy returns within 30 days
				</span>
			</div>
		</div>
	)
}

