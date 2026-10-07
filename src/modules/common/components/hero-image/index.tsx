import Image from "next/image"

interface HeroImageProps {
	handle?: string
	title: string
}

export default function HeroImage({ handle, title }: HeroImageProps) {
	const categoryHandle = handle?.toLowerCase()
	const isWomen = categoryHandle?.includes("women")
	const heroImage = isWomen
		? "/Collection/mens.avif"
		: categoryHandle?.includes("men")
			? "/Collection/mens.avif"
			: "/Collection/mens.avif"

	const heroText = `For ${title}`

	return (
		<div className="relative w-full h-[400px] md:h-[600px] overflow-hidden -mt-20 px-5 lg:px-8">
			<Image
				src={heroImage}
				alt={title || ""}
				fill
				className="object-cover"
				priority
				sizes="100vw"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 via-transparent to-transparent z-[1]"></div>
			<div className="absolute bottom-8 lg:bottom-16 left-5 lg:left-8 z-10">
				<p className="text-white text-4xl lg:text-[85px]" style={{ fontWeight: 500 }}>
					{heroText}
				</p>
			</div>
		</div>
	)
}

