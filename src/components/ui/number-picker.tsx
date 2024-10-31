import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NumberPickerProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function NumberPicker({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}: NumberPickerProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  const increment = () => {
    const newValue = value + step
    if (newValue <= max) {
      onChange(newValue)
    }
  }

  const decrement = () => {
    const newValue = value - step
    if (newValue >= min) {
      onChange(newValue)
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={value <= min}
        className="h-4"
      >
        <MinusIcon />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        className="h-4 w-16 text-center"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={value >= max}
        className="h-4"
      >
        <PlusIcon />
      </Button>
    </div>
  )
} 