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

// Store status history in memory
let statusHistory: Record<string, Array<{ timestamp: number; status: 'up' | 'down' }>> = {}
let lastCheckTime = 0

BACKENDS.forEach(backend => {
  statusHistory[backend.url] = []
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

async function performHealthCheck() {
  const timestamp = Date.now()
  
  const checkPromises = BACKENDS.map(async (backend) => {
    const status = await checkBackendStatus(backend.url)
    
    if (!statusHistory[backend.url]) {
      statusHistory[backend.url] = []
    }
    
    statusHistory[backend.url].push({ timestamp, status })
    
    // Keep only last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    statusHistory[backend.url] = statusHistory[backend.url].filter(
      (entry) => entry.timestamp > oneDayAgo
    )
  })
  
  await Promise.all(checkPromises)
  lastCheckTime = timestamp
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')

  // Check if we need to perform a fresh health check (every 60 seconds)
  const now = Date.now()
  if (now - lastCheckTime > 60000 || lastCheckTime === 0) {
    await performHealthCheck()
  }

  if (action === 'check') {
    // Force immediate check
    await performHealthCheck()
  }

  // Return current status with uptime calculation
  const results = BACKENDS.map((backend) => {
    const history = statusHistory[backend.url] || []
    
    if (history.length === 0) {
      return {
        name: backend.name,
        services: backend.services,
        url: backend.url,
        status: 'unknown',
        uptime: 'N/A',
        checkCount: 0,
        lastChecked: null
      }
    }
    
    const currentStatus = history[history.length - 1].status
    const upCount = history.filter((h) => h.status === 'up').length
    const uptime = (upCount / history.length) * 100

    return {
      name: backend.name,
      services: backend.services,
      url: backend.url,
      status: currentStatus,
      uptime: parseFloat(uptime.toFixed(2)),
      checkCount: history.length,
      lastChecked: history[history.length - 1].timestamp
    }
  })

  return NextResponse.json({ results, timestamp: Date.now() })
}
