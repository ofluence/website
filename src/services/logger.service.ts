/* eslint-disable no-console */
/**
 * Logger Service
 *
 * Goals:
 * - Provide a typed, centralized logging utility for the app
 * - Allow enabling/disabling by environment
 * - Optionally override global console methods (install/uninstall)
 * - Leave room to add extra sinks/handlers later (e.g., analytics)
 */

/**
 * Supported log levels. These are used to categorize each call,
 * but there is no global minimum level gating; enable/disable
 * is controlled solely by the `enabled` flag.
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

/**
 * Initialization options for the logger singleton.
 * - enabled: turn logging on/off globally (default: on in dev, off in test, opt-in in prod)
 * - prefix: label added to every log line, useful to identify the source/app
 * - useColors: apply CSS color styles to the console output
 */
export interface LoggerOptions {
  enabled?: boolean
  prefix?: string
  useColors?: boolean
}

/**
 * Structured record delivered to custom handlers.
 */
export interface LogRecord {
  level: LogLevel
  message: string
  args: unknown[]
  timestamp: string
  prefix?: string
  context?: Record<string, unknown>
}

type LogHandler = (_record: LogRecord) => void

// No global level threshold; presence of level is informational only

function nowTimestamp(): string {
  try {
    return new Date().toISOString()
  } catch {
    return ''
  }
}

function resolveEnvironmentModeEnabled(): boolean {
  // Enabled in dev by default; in prod only if explicitly enabled
  const mode = import.meta.env.MODE
  const isDevelopmentMode = Boolean(import.meta.env.DEV)
  const explicit = import.meta.env.VITE_ENABLE_LOGS === 'true'
  if (mode === 'test') return false
  return isDevelopmentMode || explicit
}

// No level resolution needed since we don't gate by level

/**
 * LoggerService provides a centralized, typed logging API.
 *
 * Characteristics:
 * - Non-throwing: logging must never break the app
 * - Environment-aware: can be disabled in non-dev contexts
 * - Extensible: custom handlers can be added for external sinks
 */
class LoggerService {
  private enabled: boolean
  private prefix?: string
  private useColors: boolean
  private context: Record<string, unknown> = {}
  private handlers: Set<LogHandler> = new Set<LogHandler>()

  private originalConsole?: {
    log: typeof console.log
    info: typeof console.info
    warn: typeof console.warn
    error: typeof console.error
    debug: typeof console.debug
    trace: typeof console.trace
    group?: typeof console.group
    groupCollapsed?: typeof console.groupCollapsed
    groupEnd?: typeof console.groupEnd
  }

  /**
   * Create a new logger instance.
   * @param options optional configuration overrides
   */
  constructor(options: LoggerOptions = {}) {
    this.enabled = options.enabled ?? resolveEnvironmentModeEnabled()
    this.prefix = options.prefix
    this.useColors = options.useColors ?? true
  }

  // Configuration
  /** Enable or disable all logging output. */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  /** Set a label prefix that is shown in every log line. */
  setPrefix(prefix?: string): void {
    this.prefix = prefix
  }

  /** Replace the structured context attached to every log. */
  setContext(context: Record<string, unknown>): void {
    this.context = { ...context }
  }

  /** Merge new keys into the existing structured context. */
  mergeContext(context: Record<string, unknown>): void {
    this.context = { ...this.context, ...context }
  }

  /** Register a custom handler to receive every log record. */
  addHandler(handler: LogHandler): void {
    this.handlers.add(handler)
  }

  /** Unregister a previously added custom handler. */
  removeHandler(handler: LogHandler): void {
    this.handlers.delete(handler)
  }

  isEnabled(): boolean {
    return this.enabled
  }

  // Console override install/uninstall
  /**
   * Override global console methods to route through the logger,
   * preserving original console in case we need to restore later.
   */
  installConsoleOverrides(): void {
    if (this.originalConsole) return
    this.originalConsole = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      debug: console.debug ? console.debug.bind(console) : console.log.bind(console),
      trace: console.trace ? console.trace.bind(console) : console.log.bind(console),
      group: console.group?.bind(console),
      groupCollapsed: console.groupCollapsed?.bind(console),
      groupEnd: console.groupEnd?.bind(console),
    }

    console.log = (...args: unknown[]) => this.log(args[0] as string, ...args.slice(1))
    console.info = (...args: unknown[]) => this.info(args[0] as string, ...args.slice(1))
    console.warn = (...args: unknown[]) => this.warn(args[0] as string, ...args.slice(1))
    console.error = (...args: unknown[]) => this.error(args[0] as string, ...args.slice(1))
    console.debug = (...args: unknown[]) => this.debug(args[0] as string, ...args.slice(1))
    console.trace = (...args: unknown[]) => this.trace(args[0] as string, ...args.slice(1))

    if (console.group && console.groupCollapsed && console.groupEnd) {
      console.group = (...args: unknown[]) => this.group(args[0] as string, ...args.slice(1))
      console.groupCollapsed = (...args: unknown[]) =>
        this.groupCollapsed(args[0] as string, ...args.slice(1))
      console.groupEnd = () => this.groupEnd()
    }
  }

  /** Restore original console methods if overrides were installed. */
  uninstallConsoleOverrides(): void {
    if (!this.originalConsole) return
    console.log = this.originalConsole.log
    console.info = this.originalConsole.info
    console.warn = this.originalConsole.warn
    console.error = this.originalConsole.error
    console.debug = this.originalConsole.debug
    console.trace = this.originalConsole.trace
    if (
      this.originalConsole.group &&
      this.originalConsole.groupCollapsed &&
      this.originalConsole.groupEnd
    ) {
      console.group = this.originalConsole.group
      console.groupCollapsed = this.originalConsole.groupCollapsed
      console.groupEnd = this.originalConsole.groupEnd
    }
    this.originalConsole = undefined
  }

  // Logging API
  /** Log a trace-level message. */
  trace(message: string, ...args: unknown[]): void {
    this.emit('trace', message, args)
  }

  /** Log a debug-level message. */
  debug(message: string, ...args: unknown[]): void {
    this.emit('debug', message, args)
  }

  /** Log an info-level message. */
  info(message: string, ...args: unknown[]): void {
    this.emit('info', message, args)
  }

  /** Log a warn-level message. */
  warn(message: string, ...args: unknown[]): void {
    this.emit('warn', message, args)
  }

  /** Log an error-level message. */
  error(message: string, ...args: unknown[]): void {
    this.emit('error', message, args)
  }

  /** Alias for info-level logging. */
  log(message: string, ...args: unknown[]): void {
    this.emit('info', message, args)
  }

  /** Start a console group using the logger formatting. */
  group(label: string, ...args: unknown[]): void {
    if (!this.isEnabled()) return
    const [fmt, styles, rest] = this.format(label, args)
    if (console.group) {
      console.group(fmt, ...styles, ...rest)
    } else {
      console.log(fmt, ...styles, ...rest)
    }
  }

  /** Start a collapsed console group using the logger formatting. */
  groupCollapsed(label: string, ...args: unknown[]): void {
    if (!this.isEnabled()) return
    const [fmt, styles, rest] = this.format(label, args)
    if (console.groupCollapsed) {
      console.groupCollapsed(fmt, ...styles, ...rest)
    } else if (console.group) {
      console.group(fmt, ...styles, ...rest)
    } else {
      console.log(fmt, ...styles, ...rest)
    }
  }

  /** End the most recently started console group. */
  groupEnd(): void {
    if (console.groupEnd) console.groupEnd()
  }

  private emit(level: LogLevel, message: string, args: unknown[]): void {
    if (!this.isEnabled()) return

    const record: LogRecord = {
      level,
      message,
      args,
      timestamp: nowTimestamp(),
      prefix: this.prefix,
      context: Object.keys(this.context).length > 0 ? { ...this.context } : undefined,
    }

    // Call registered handlers first (e.g., custom sinks)
    if (this.handlers.size > 0) {
      try {
        for (const handler of this.handlers) {
          handler(record)
        }
      } catch {
        // ignore handler errors
      }
    }

    // Then log to console
    const [fmt, styles, rest] = this.format(message, args, level)
    switch (level) {
      case 'trace': {
        if (console.trace) {
          console.trace(fmt, ...styles, ...rest)
        } else {
          console.log(fmt, ...styles, ...rest)
        }
        break
      }
      case 'debug': {
        if (console.debug) {
          console.debug(fmt, ...styles, ...rest)
        } else {
          console.log(fmt, ...styles, ...rest)
        }
        break
      }
      case 'info': {
        console.info(fmt, ...styles, ...rest)
        break
      }
      case 'warn': {
        console.warn(fmt, ...styles, ...rest)
        break
      }
      case 'error': {
        console.error(fmt, ...styles, ...rest)
        break
      }
    }
  }

  private format(
    message: string,
    args: unknown[],
    level: LogLevel = 'info'
  ): [string, string[], unknown[]] {
    const ts = nowTimestamp()
    const prefix = this.prefix ? `[${this.prefix}]` : ''
    const levelLabel = level.toUpperCase()

    // Context as final object argument if present
    const rest: unknown[] = [...args]
    if (this.context && Object.keys(this.context).length > 0) {
      rest.push({ __ctx: this.context })
    }

    if (!this.useColors) {
      const fmt = `${ts} ${prefix} ${levelLabel}: ${message}`.trim()
      return [fmt, [], rest]
    }

    const color = this.colorFor(level)
    const fmt = `%c${ts}%c ${prefix} %c${levelLabel}%c ${message}`
    const styles = [
      'color:#888',
      'color:inherit',
      `color:${color};font-weight:bold`,
      'color:inherit',
    ]
    return [fmt, styles, rest]
  }

  private colorFor(level: LogLevel): string {
    switch (level) {
      case 'trace': {
        return '#9AA0A6'
      }
      case 'debug': {
        return '#3B82F6'
      }
      case 'info': {
        return '#10B981'
      }
      case 'warn': {
        return '#F59E0B'
      }
      case 'error': {
        return '#EF4444'
      }
    }
  }
}

// Singleton instance for app-wide use
export const logger = new LoggerService({})

// Named helpers mirroring console API
export const trace = (message: string, ...args: unknown[]) => logger.trace(message, ...args)
export const debug = (message: string, ...args: unknown[]) => logger.debug(message, ...args)
export const info = (message: string, ...args: unknown[]) => logger.info(message, ...args)
export const warn = (message: string, ...args: unknown[]) => logger.warn(message, ...args)
export const error = (message: string, ...args: unknown[]) => logger.error(message, ...args)
export const log = (message: string, ...args: unknown[]) => logger.log(message, ...args)
export const group = (label: string, ...args: unknown[]) => logger.group(label, ...args)
export const groupCollapsed = (label: string, ...args: unknown[]) =>
  logger.groupCollapsed(label, ...args)
export const groupEnd = () => logger.groupEnd()

// Console override controls
export const installConsoleOverrides = () => logger.installConsoleOverrides()
export const uninstallConsoleOverrides = () => logger.uninstallConsoleOverrides()

// export default logger
