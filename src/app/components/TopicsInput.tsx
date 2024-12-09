import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TopicsInputProps = {
  topics: string[]
  onTopicChange: (index: number, value: string) => void
}

export default function TopicsInput({ topics, onTopicChange }: TopicsInputProps) {
  return (
    <div className="space-y-2">
      <Label>Top Topics</Label>
      <div className="grid grid-cols-2 gap-2">
        {topics.map((topic, index) => (
          <Input
            key={index}
            type="text"
            placeholder={`Topic ${index + 1}`}
            value={topic}
            onChange={(e) => onTopicChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  )
}

