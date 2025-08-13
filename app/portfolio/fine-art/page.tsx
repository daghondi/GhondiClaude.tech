import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Fine Art Collection",
  description: "Fine art by Ghondi Claude",
}

export default function FineArtPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
          Fine Art Collection
        </h1>
        <p className="text-xl text-gray-700">
          Collection coming soon
        </p>
      </div>
    </main>
  )
}
