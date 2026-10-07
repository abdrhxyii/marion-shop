"use client"

import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import { ChevronDown } from "lucide-react"
import Radio from "@modules/common/components/radio"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  const selectedItem = items.find((item) => item.value === value) || items[0]

  const handleListboxChange = (selectedValue: string) => {
    handleChange(selectedValue)
  }

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <Text className="text-base-semi text-black uppercase">{title}</Text>
      
      <div className="lg:hidden w-full">
        <Listbox value={value} onChange={handleListboxChange}>
          <div className="relative w-full">
            <Listbox.Button
              className="relative w-full flex justify-between items-center px-4 py-3 text-left bg-white cursor-default focus:outline-none text-base-regular"
              data-testid={`${dataTestId}-mobile-button`}
            >
              <span className="block text-black truncate pr-2">{selectedItem?.label}</span>
              <ChevronDown className="w-5 h-5 text-black flex-shrink-0" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute z-20 w-full mt-1 overflow-auto bg-white max-h-60 focus:outline-none"
                data-testid={`${dataTestId}-mobile-options`}
              >
                {items?.map((item) => (
                  <Listbox.Option
                    key={item.value}
                    value={item.value}
                    className="cursor-default select-none relative px-4 py-3 hover:bg-gray-50 text-base-regular"
                    data-testid={`${dataTestId}-mobile-option-${item.value}`}
                  >
                    <div className="flex items-center gap-x-3">
                      <Radio checked={item.value === value} />
                      <span className={clx("whitespace-nowrap", {
                        "text-black": item.value === value,
                        "text-gray-600": item.value !== value,
                      })}>
                        {item.label}
                      </span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      <div className="hidden lg:block">
        <RadioGroup data-testid={dataTestId} value={value} onValueChange={handleChange} className="flex flex-col gap-y-3">
          {items?.map((i) => (
            <div key={i.value} className="flex items-center gap-x-3">
              <RadioGroup.Item
                checked={i.value === value}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "flex items-center gap-x-3 cursor-pointer",
                  {
                    "text-black": i.value === value,
                    "text-gray-600": i.value !== value,
                  }
                )}
                data-testid="radio-label"
                data-active={i.value === value}
              >
                <Radio checked={i.value === value} data-testid={`radio-${i.value}`} />
                <span className="text-base-regular">{i.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterRadioGroup
