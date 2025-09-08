import { formatDistanceToNow, parseISO } from 'date-fns'

interface TimeAgoProps {
  timestamp: string
}

export function TimeAgo({ timestamp }: TimeAgoProps) {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, {
      addSuffix: true,
    })
    timeAgo = timePeriod
  }

  return (
    <time dateTime={timestamp} title={timestamp}>
      <i>{timeAgo}</i>
    </time>
  )
}
