"use client"

import { HttpTypes } from "@medusajs/types"

type ProductOptionSelectorProps = {
  option: HttpTypes.StoreProductOption
  selectedValue: string | null
  onValueChange: (value: string) => void
}

export default function ProductOptionSelector({
  option,
  selectedValue,
  onValueChange,
}: ProductOptionSelectorProps) {
  if (!option || !option.values || option.values.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-3">
      <label 
        className="font-medium"
        style={{
          color: '#6b6b6b',
          fontSize: '14px',
          letterSpacing: '-0.28px',
          lineHeight: '21px'
        }}
      >
        {option.title}
      </label>
      <div className="flex flex-wrap gap-2">
        {option.values.map((optionValue) => {
          const isSelected = selectedValue === optionValue.value
          return (
            <button
              key={optionValue.id}
              onClick={() => onValueChange(optionValue.value || "")}
              className="px-4 py-2 transition-colors"
              style={{
                backgroundColor: isSelected ? '#1a1a1a' : '#f7f7f7',
                color: isSelected ? '#ffffff' : '#686868',
              }}
            >
              {optionValue.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

