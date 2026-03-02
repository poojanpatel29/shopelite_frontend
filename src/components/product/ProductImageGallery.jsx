import { useState } from 'react'

export default function ProductImageGallery({ images, name }) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
        <img src={images[selected]} alt={name} className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button key={i}
              onClick={() => setSelected(i)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selected === i ? 'border-primary-500' : 'border-transparent'}`}
            >
              <img src={img} alt={`${name} ${i+1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}