/**
 * Fallback component displayed during hydration
 * This is shown while the React application is loading its initial state
 * Provides a better user experience than a blank screen during loading
 */
const RootHydrateFallback = () => {
  return (
    <div
      className={'text-foreground flex h-screen flex-col items-center justify-center bg-gray-800'}
    >
      <div className="flex items-center justify-center space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="size-4 animate-bounce rounded-full bg-purple-800 [animation-delay:-0.3s]"></div>
        <div className="size-4 animate-bounce rounded-full bg-purple-800 [animation-delay:-0.15s]"></div>
        <div className="size-4 animate-bounce rounded-full bg-purple-800"></div>
      </div>
    </div>
  )
}

export { RootHydrateFallback }
