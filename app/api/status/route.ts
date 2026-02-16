import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const BACKENDS = [
  {
    url: 'https://voice-assistant-ai-adnm.onrender.com/ping',
    name: 'Neura Essence & Swift',
    services: ['neura.essence1.o', 'neura.swift1.o']
  },
  {
    url: 'https://doc-summarization.onrender.com/ping',
    name: 'Neura Infinity',
    services: ['neura.infinity1.o']
  },
  {
    url: 'https://stackoverflow-parakeet.onrender.com/ping',
    name: 'StackOverflow AI Mode',
    services: ['Stackoverflow Ai Mode']
  },
  {
    url: 'https://google-custom-searchapi.onrender.com/ping',
    name: 'Hybrid AI',
    services: ['Hybrid ai']
  },
  {
    url: 'https://web-data-scraping.onrender.com/ping',
    name: 'Neura Vista',
    services: ['neura.vista1.o']
  }
]

// Store status history in memory (use a database in production)
let statusHistory: Record<string, Array<{ timestamp: number; status: 'up' | 'down' }>> = {}

BACKENDS.forEach(backend => {
  if (!statusHistory[backend.url]) {
    statusHistory[backend.url] = []
  }
})

async function checkBackendStatus(url: string): Promise<'up' | 'down'> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    return response.ok ? 'up' : 'down'
  } catch {
    return 'down'
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')

  if (action === 'check') {
    const results = await Promise.all(
      BACKENDS.map(async (backend) => {
        const status = await checkBackendStatus(backend.url)
        const timestamp = Date.now()

        if (!statusHistory[backend.url]) {
          statusHistory[backend.url] = []
        }

        statusHistory[backend.url].push({ timestamp, status })

        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
        statusHistory[backend.url] = statusHistory[backend.url].filter(
          (entry) => entry.timestamp > oneDayAgo
        )

        return {
          name: backend.name,
          services: backend.services,
          url: backend.url,
          status,
          timestamp
        }
      })
    )

    return NextResponse.json({ results, timestamp: Date.now() })
  }

  // Default: return current status with 24h uptime calculation
  const results = BACKENDS.map((backend) => {
    const history = statusHistory[backend.url] || []
    const currentStatus = history.length > 0 ? history[history.length - 1].status : 'unknown'
    const uptime = history.length > 0
      ? ((history.filter((h) => h.status === 'up').length / history.length) * 100)
      : 'N/A'

    return {
      name: backend.name,
      services: backend.services,
      url: backend.url,
      status: currentStatus,
      uptime: typeof uptime === 'number' ? parseFloat(uptime.toFixed(2)) : uptime,
      checkCount: history.length,
      lastChecked: history.length > 0 ? history[history.length - 1].timestamp : null
    }
  })

  return NextResponse.json({ results, timestamp: Date.now() })
}