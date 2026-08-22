import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

// Placeholder ambient loop — swap public/audio/ambient.mp3 for your own track
// whenever you like; the path and looping behavior here won't need to change.
const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/ambient.mp3`

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  const [volume, setVolume] = useState(0.3)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    if (enabled) {
      audio.play().catch(() => {
        // Browser blocked autoplay-with-sound; require another explicit tap.
        setEnabled(false)
      })
    } else {
      audio.pause()
    }
  }, [enabled, volume])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="none" />
      
      {enabled && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-accent-3 cursor-pointer"
          aria-label="Volume"
        />
      )}

      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        aria-pressed={enabled}
        aria-label={enabled ? 'Mute background audio' : 'Play background audio'}
        className="flex h-11 w-11 items-center justify-center border border-line-strong bg-surface/80 backdrop-blur-md text-ink transition-all duration-300 hover:border-accent hover:text-accent-3 hover-glow"
      >
        {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  )
}
