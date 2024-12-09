import { useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type StatInputProps = {
  label: string
  value: string
  onLabelChange: (value: string) => void
  onValueChange: (value: string) => void
}

export default function StatInput({ label, value, onLabelChange, onValueChange }: StatInputProps) {
  const handleLabelChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onLabelChange(event.target.value)
  }, [onLabelChange])

  const handleValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value)
  }, [onValueChange])

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="label">Stat Label</Label>
        <Input
          type="text"
          id="label"
          placeholder="e.g., Followers"
          value={label}
          onChange={handleLabelChange}
        />
      </div>
      <div>
        <Label htmlFor="value">Stat Value</Label>
        <Input
          type="text"
          id="value"
          placeholder="e.g., 1000"
          value={value}
          onChange={handleValueChange}
        />
      </div>
    </div>
  )
}

