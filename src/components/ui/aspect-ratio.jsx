import * as React from "react"

const AspectRatio = React.forwardRef(({ ratio = 16 / 9, children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative ${className}`}
    style={{
      paddingBottom: `${100 / ratio}%`,
    }}
    {...props}
  >
    <div className="absolute inset-0">{children}</div>
  </div>
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }