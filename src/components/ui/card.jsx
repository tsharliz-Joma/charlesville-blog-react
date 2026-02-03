import React from 'react'

/**
 * A simple Card implementation inspired by shadcn/ui. Components are
 * composed so you can build rich card layouts. Each part accepts
 * children and optional className props to allow further styling.
 */

export function Card({ className = '', children }) {
  return (
    <div
      className={`glass-panel rounded-2xl overflow-hidden text-fog ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children }) {
  return (
    <div className={`p-4 divider-glow border-b border-slate ${className}`}>{children}</div>
  )
}

export function CardTitle({ className = '', children }) {
  return <h2 className={`font-semibold ${className}`}>{children}</h2>
}

export function CardDescription({ className = '', children }) {
  return <p className={`text-sm ${className}`}>{children}</p>
}

export function CardContent({ className = '', children }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardFooter({ className = '', children }) {
  return <div className={`p-4 divider-glow border-t border-slate ${className}`}>{children}</div>
}

export default {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
