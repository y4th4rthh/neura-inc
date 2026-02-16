'use client'

import { useState, useEffect } from 'react'
import type React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface BackendStatus {
  name: string
  services: string[]
  url: string
  status: 'up' | 'down' | 'unknown'
  uptime: number | string
  checkCount: number
  lastChecked: number | null
}

interface StatusResponse {
  results: BackendStatus[]
  timestamp: number
}

export default function StatusPage() {
  const [statuses, setStatuses] = useState<BackendStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status')
      const data: StatusResponse = await response.json()
      setStatuses(data.results)
      setLastUpdated(new Date(data.timestamp))
    } catch (err) {
      console.error('Failed to fetch status:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchStatus()
    }, 60000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-500/10'
      case 'down':
        return 'bg-red-500/10'
      default:
        return 'bg-gray-500/10'
    }
  }

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'border-green-500/30'
      case 'down':
        return 'border-red-500/30'
      default:
        return 'border-gray-500/30'
    }
  }

  const getUptimeColor = (uptime: number | string) => {
    if (typeof uptime === 'string') return 'text-gray-500'
    if (uptime >= 99) return 'text-green-500'
    if (uptime >= 95) return 'text-yellow-500'
    return 'text-red-500'
  }

  const formatUptime = (uptime: number | string) => {
    if (typeof uptime === 'string') return uptime
    return `${uptime.toFixed(2)}%`
  }

  const formatLastChecked = (timestamp: number | null) => {
    if (!timestamp) return 'Never'
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  const overallStatus = statuses.every(s => s.status === 'up') ? 'All Systems Operational' : 'Some Systems Down'
  const statusColor = statuses.every(s => s.status === 'up') ? 'text-green-500' : 'text-red-500'

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading status...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 w-full">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">System Status</h1>
              <p className={`text-lg font-semibold ${statusColor}`}>{overallStatus}</p>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Status Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statuses.map((backend) => (
            <div
              key={backend.url}
              className={`rounded-lg border ${getStatusBorderColor(backend.status)} ${getStatusBgColor(backend.status)} p-6 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">{backend.name}</h3>
                  <p className="text-xs text-muted-foreground">{backend.services.join(', ')}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(backend.status)}`}
                >
                  <span className={`h-2 w-2 rounded-full bg-current`} />
                  {backend.status === 'up' ? 'Operational' : backend.status === 'down' ? 'Offline' : 'Unknown'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Uptime (24h)</span>
                  <span className={`font-semibold ${getUptimeColor(backend.uptime)}`}>
                    {formatUptime(backend.uptime)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Check</span>
                  <span className="text-sm text-foreground">{formatLastChecked(backend.lastChecked)}</span>
                </div>
              </div>

              <div className="mt-4 w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${backend.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: typeof backend.uptime === 'number' ? `${backend.uptime}%` : '0%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-lg border border-border bg-card p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">About This Status Page</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-foreground mb-2">📊 Real-time Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                All APIs are monitored continuously with checks performed every 60 seconds.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">📈 24-Hour History</h3>
              <p className="text-sm text-muted-foreground">
                Uptime percentages are calculated from the last 24 hours of monitoring data.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">⚡ Response Time</h3>
              <p className="text-sm text-muted-foreground">
                Each check has a 5-second timeout to detect unresponsive services.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">🔄 Auto-refresh</h3>
              <p className="text-sm text-muted-foreground">
                This page automatically refreshes every minute to show the latest status.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )

}
