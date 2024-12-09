'use client'

import { useState, useCallback } from 'react'
import StatInput from './StatInput'
import TopicsInput from './TopicsInput'
import ProfilePictureUpload from './ProfilePictureUpload'
import BackgroundCustomization from './BackgroundCustomization'
import ImagePreview from './ImagePreview'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'

type Stat = {
  label: string
  value: string
}

export default function LinkedInWrapped() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Followers', value: '' },
    { label: 'Impressions', value: '' },
    // { label: '', value: '' },
    // { label: '', value: '' },
  ])
  const [topTopics, setTopTopics] = useState<string[]>(['', '', '', ''])
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [isCircle, setIsCircle] = useState(true)
  const [background, setBackground] = useState<string | null>(null)

  const handleStatChange = useCallback((index: number, field: 'label' | 'value', value: string) => {
    setStats(prevStats => prevStats.map((stat, i) => 
      i === index ? { ...stat, [field]: value } : stat
    ))
  }, [])

  const handleTopicChange = useCallback((index: number, value: string) => {
    setTopTopics(prevTopics => prevTopics.map((topic, i) => i === index ? value : topic))
  }, [])

  const generateRandomGradient = useCallback(() => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      'linear-gradient(135deg, #b721ff 0%, #21d4fd 100%)',
      'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
      'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    ]
    const randomIndex = Math.floor(Math.random() * gradients.length)
    setBackground(gradients[randomIndex])
  }, [])

  const handleCustomBackgroundUpload = useCallback((file: string) => {
    setBackground(file)
  }, [])

  const handleDownload = useCallback(async () => {
    const element = document.getElementById('linkedin-wrapped-preview')
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3,
          logging: false,
          useCORS: true,
          allowTaint: true,
        })
        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = 'linkedin-wrapped.png'
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error('Error generating image:', err)
        alert('There was an error generating the image. Please try again.')
      }
    }
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <StatInput
              key={index}
              label={stat.label}
              value={stat.value}
              onLabelChange={(value) => handleStatChange(index, 'label', value)}
              onValueChange={(value) => handleStatChange(index, 'value', value)}
            />
          ))}
        </div>
        <TopicsInput topics={topTopics} onTopicChange={handleTopicChange} />
        <ProfilePictureUpload
          onUpload={setProfilePicture}
          isCircle={isCircle}
          onShapeChange={setIsCircle}
        />
        <BackgroundCustomization
          onRandomGradient={generateRandomGradient}
          onCustomUpload={handleCustomBackgroundUpload}
        />
        <Button onClick={handleDownload} className="w-full">Download Image</Button>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <ImagePreview
            stats={stats}
            topTopics={topTopics}
            profilePicture={profilePicture}
            isCircle={isCircle}
            background={background}
          />
        </div>
      </div>
    </div>
  )
}

