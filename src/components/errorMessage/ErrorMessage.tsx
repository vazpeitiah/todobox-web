const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="label">
      <span className="text-xs text-error">{children}</span>
    </div>
  )
}

export default ErrorMessage
