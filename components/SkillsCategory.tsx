'use client'

import { useState } from 'react'

interface Skill {
  name: string
  endorsements?: number
  verified?: boolean
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

interface SkillsCategoryProps {
  category: {
    categoryTitle: string
    skills: string[]
  }
  linkedInSkills: Skill[]
  index: number
}

export default function SkillsCategory({ category, linkedInSkills, index }: SkillsCategoryProps) {
  const [showAll, setShowAll] = useState(false)
  const initialSkillsCount = 2
  const hasMoreSkills = category.skills.length > initialSkillsCount
  const displayedSkills = showAll ? category.skills : category.skills.slice(0, initialSkillsCount)

  const getSkillIcon = (categoryTitle: string) => {
    switch (categoryTitle) {
      case 'Fine Art':
        return '🎨'
      case 'Technology':
        return '💻'
      case 'Leadership':
        return '👥'
      case 'Languages':
        return '🌐'
      default:
        return '⭐'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      {/* Category Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <span className="text-blue-600 text-xl">{getSkillIcon(category.categoryTitle)}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {category.categoryTitle}
        </h3>
      </div>
      
      {/* Skills List */}
      <div className="space-y-4 mb-6">
        {displayedSkills.map((skill: string, skillIndex: number) => {
          const skillData = linkedInSkills.find(s => s.name === skill)
          const endorsements = skillData?.endorsements || 0
          
          return (
            <div key={skillIndex} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{skill}</span>
                {skillData?.verified && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                    ✓ Verified
                  </span>
                )}
              </div>
              
              {skillData?.endorsements && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{skillData.endorsements} endorsements</span>
                  {skillData.level && (
                    <span className="capitalize text-blue-600 font-medium">{skillData.level}</span>
                  )}
                </div>
              )}
              
              {/* Simple progress indicator */}
              {endorsements > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`bg-blue-600 h-1 rounded-full transition-all duration-500 ${
                        endorsements >= 40 ? 'w-full' :
                        endorsements >= 30 ? 'w-4/5' :
                        endorsements >= 20 ? 'w-3/5' :
                        endorsements >= 10 ? 'w-2/5' : 'w-1/5'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Show More/Less Button */}
      {hasMoreSkills && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2 border-t border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {showAll 
            ? `Show Less (-${category.skills.length - initialSkillsCount})`
            : `Show More (+${category.skills.length - initialSkillsCount})`
          }
        </button>
      )}
    </div>
  )
}
