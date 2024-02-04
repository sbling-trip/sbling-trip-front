interface ErrorMessageProps {
  error: string
  className?: string
}

export default function ErrorMessage({ error, className }: ErrorMessageProps) {
  return error && <strong className={className}>{error}</strong>
}
