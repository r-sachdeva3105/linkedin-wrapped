import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type BackgroundCustomizationProps = {
  onRandomGradient: () => void
  onCustomUpload: (file: string) => void
}

export default function BackgroundCustomization({
  onRandomGradient,
  onCustomUpload,
}: BackgroundCustomizationProps) {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        if (typeof result === 'string') {
          onCustomUpload(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }, [onCustomUpload])

  return (
    <div className="space-y-4">
      <Button onClick={onRandomGradient} className="w-full">Generate Random Gradient</Button>
      <div>
        <Label htmlFor="custom-background">Upload Custom Background</Label>
        <Input
          type="file"
          id="custom-background"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}

