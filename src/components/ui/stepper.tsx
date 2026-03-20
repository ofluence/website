import * as React from 'react'
import { createContext, useContext } from 'react'

import { Loading03Icon, Tick01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

/**
 * Type definitions for the Stepper component
 */

/**
 * Context value for the main Stepper component
 * Provides shared state and methods for all child components
 */
interface StepperContextValue {
  /** Current active step index (0-based) */
  activeStep: number
  /** Function to programmatically change the active step */
  setActiveStep: (_step: number) => void
  /** Layout orientation - affects visual arrangement */
  orientation: 'horizontal' | 'vertical'
}

/**
 * Context value for individual StepperItem components
 * Provides step-specific state and configuration
 */
interface StepItemContextValue {
  /** Step number/index for this specific step */
  step: number
  /** Current visual/interaction state of this step */
  state: StepState
  /** Whether this step is disabled and cannot be interacted with */
  isDisabled: boolean
  /** Whether this step is currently showing a loading state */
  isLoading: boolean
}

/**
 * Possible states for each step in the stepper
 * - active: Currently selected/focused step
 * - completed: Step has been finished
 * - inactive: Step is not yet reached or not selected
 * - loading: Step is processing (special case of active)
 */
type StepState = 'active' | 'completed' | 'inactive' | 'loading'

/**
 * React contexts for state management
 * These provide data flow between parent Stepper and child components
 */
const StepperContext = createContext<StepperContextValue | undefined>(undefined)
const StepItemContext = createContext<StepItemContextValue | undefined>(undefined)

/**
 * Custom hook to access Stepper context
 * Must be used within a Stepper component tree
 * @returns StepperContextValue with activeStep, setActiveStep, and orientation
 * @throws Error if used outside of a Stepper component
 */
const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within a Stepper')
  }
  return context
}

/**
 * Custom hook to access StepperItem context
 * Must be used within a StepperItem component tree
 * @returns StepItemContextValue with step, state, isDisabled, and isLoading
 * @throws Error if used outside of a StepperItem component
 */
const useStepItem = () => {
  const context = useContext(StepItemContext)
  if (!context) {
    throw new Error('useStepItem must be used within a StepperItem')
  }
  return context
}

/**
 * COMPONENT DEFINITIONS
 * Main stepper component and all its child components
 */

/**
 * Props for the main Stepper component
 * Extends standard HTML div attributes
 */
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial step when component mounts (uncontrolled mode) */
  defaultValue?: number
  /** Current step value (controlled mode) */
  value?: number
  /** Callback fired when step changes */
  onValueChange?: (_value: number) => void
  /** Visual layout orientation */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Main Stepper component
 *
 * A flexible stepper component that can be used in both controlled and uncontrolled modes.
 * Supports horizontal and vertical orientations, and provides context for all child components.
 *
 * @example
 * // Uncontrolled mode
 * <Stepper defaultValue={0}>
 *   <StepperItem step={1}>...</StepperItem>
 *   <StepperItem step={2}>...</StepperItem>
 * </Stepper>
 *
 * @example
 * // Controlled mode
 * <Stepper value={currentStep} onValueChange={setCurrentStep}>
 *   <StepperItem step={1}>...</StepperItem>
 *   <StepperItem step={2}>...</StepperItem>
 * </Stepper>
 */
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { defaultValue = 0, value, onValueChange, orientation = 'horizontal', className, ...props },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [activeStep, setInternalStep] = React.useState(defaultValue)

    // Handles step changes for both controlled and uncontrolled modes
    const setActiveStep = React.useCallback(
      (step: number) => {
        // In uncontrolled mode, update internal state
        if (value === undefined) {
          setInternalStep(step)
        }
        // Always call onValueChange if provided (for controlled mode)
        onValueChange?.(step)
      },
      [value, onValueChange]
    )

    // Use controlled value if provided, otherwise use internal state
    const currentStep = value ?? activeStep

    return (
      <StepperContext.Provider
        value={{
          activeStep: currentStep,
          setActiveStep,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn(
            // Base layout classes with orientation-based responsive design
            'group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col',
            className
          )}
          data-orientation={orientation}
          {...props}
        />
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = 'Stepper'

/**
 * Props for StepperItem component
 * Represents an individual step within the stepper
 */
interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step number/index (should be unique within the stepper) */
  step: number
  /** Override to mark this step as completed regardless of activeStep */
  completed?: boolean
  /** Whether this step is disabled and cannot be interacted with */
  disabled?: boolean
  /** Whether this step should show a loading indicator when active */
  loading?: boolean
}

/**
 * StepperItem component
 *
 * Represents an individual step within the stepper. Automatically determines its state
 * based on the current activeStep from context, but can be overridden with props.
 *
 * @example
 * <StepperItem step={1}>
 *   <StepperTrigger>
 *     <StepperIndicator />
 *     <StepperTitle>Step 1</StepperTitle>
 *   </StepperTrigger>
 * </StepperItem>
 */
const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  (
    { step, completed = false, disabled = false, loading = false, className, children, ...props },
    ref
  ) => {
    const { activeStep } = useStepper()

    // Determine step state based on current active step and props
    const getStepState = (): StepState => {
      if (completed || step < activeStep) return 'completed'
      if (activeStep === step) return 'active'
      return 'inactive'
    }
    const state: StepState = getStepState()

    // Only show loading when this step is active and loading prop is true
    const isLoading = loading && step === activeStep

    return (
      <StepItemContext.Provider value={{ step, state, isDisabled: disabled, isLoading }}>
        <div
          ref={ref}
          className={cn(
            // Base flexbox layout that adapts to parent stepper orientation
            'group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col',
            className
          )}
          data-state={state}
          {...(isLoading ? { 'data-loading': true } : {})}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    )
  }
)
StepperItem.displayName = 'StepperItem'

/**
 * Props for StepperTrigger component
 * Clickable element that allows navigation to a specific step
 */
interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** When true, renders as a div instead of button (for custom trigger elements) */
  asChild?: boolean
}

/**
 * StepperTrigger component
 *
 * Clickable element that allows users to navigate to a specific step.
 * Automatically disabled when the step is disabled. Can render as a button
 * or as a div (when asChild=true) for custom trigger implementations.
 *
 * @example
 * <StepperTrigger>
 *   <StepperIndicator />
 *   <div>
 *     <StepperTitle>Step 1</StepperTitle>
 *     <StepperDescription>Enter your details</StepperDescription>
 *   </div>
 * </StepperTrigger>
 */
const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { setActiveStep } = useStepper()
    const { step, isDisabled } = useStepItem()

    // Render as div when asChild is true (for custom implementations)
    if (asChild) {
      return <div className={className}>{children}</div>
    }

    return (
      <button
        ref={ref}
        className={cn(
          // Base button styles with disabled state handling
          'inline-flex items-center gap-3 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        onClick={() => setActiveStep(step)}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)
StepperTrigger.displayName = 'StepperTrigger'

/**
 * Props for StepperIndicator component
 * Visual indicator showing step number, completion status, or loading state
 */
interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, renders custom content instead of default step number/icons */
  asChild?: boolean
}

/**
 * StepperIndicator component
 *
 * Visual indicator that displays the step number, check mark for completed steps,
 * or loading spinner for steps in progress. The appearance changes based on step state.
 *
 * States:
 * - inactive: Shows step number with muted styling
 * - active: Shows step number with primary styling
 * - completed: Shows check mark with primary styling
 * - loading: Shows spinning loader (when step is active and loading=true)
 *
 * @example
 * <StepperIndicator /> // Shows step number/check/loader automatically
 *
 * @example
 * <StepperIndicator asChild>
 *   <CustomIcon />
 * </StepperIndicator>
 */
const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { state, step, isLoading } = useStepItem()

    return (
      <div
        ref={ref}
        className={cn(
          // Base circular indicator with state-based color changes
          'bg-muted text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium',
          className
        )}
        data-state={state}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/* Step number - hidden when completed or loading */}
            <span className="transition-all group-data-[loading=true]/step:scale-0 group-data-[loading=true]/step:opacity-0 group-data-[loading=true]/step:transition-none group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0">
              {step}
            </span>

            {/* Check icon - shown when step is completed */}
            <HugeiconsIcon
              icon={Tick01Icon}
              className="absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />

            {/* Loading spinner - shown when step is active and loading */}
            {isLoading && (
              <span className="absolute transition-all">
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="animate-spin"
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            )}
          </>
        )}
      </div>
    )
  }
)
StepperIndicator.displayName = 'StepperIndicator'

/**
 * StepperTitle component
 *
 * Displays the title/label for a step. Typically used within StepperTrigger
 * to provide a clear description of what the step represents.
 *
 * @example
 * <StepperTitle>Personal Information</StepperTitle>
 * <StepperTitle>Payment Details</StepperTitle>
 */
const StepperTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-sm font-medium', className)} {...props} />
  )
)
StepperTitle.displayName = 'StepperTitle'

/**
 * StepperDescription component
 *
 * Provides additional descriptive text for a step. Usually displayed below
 * the StepperTitle to give users more context about what the step involves.
 *
 * @example
 * <StepperDescription>
 *   Enter your name, email, and phone number
 * </StepperDescription>
 */
const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
))
StepperDescription.displayName = 'StepperDescription'

/**
 * StepperSeparator component
 *
 * Visual connector between steps that changes color to indicate completion.
 * Automatically adapts its dimensions based on the stepper orientation:
 * - Horizontal: thin horizontal line that expands to fill available width
 * - Vertical: thin vertical line with fixed height
 *
 * The separator shows as primary color when the step it follows is completed.
 *
 * @example
 * <StepperItem step={1}>
 *   <StepperTrigger>...</StepperTrigger>
 *   <StepperSeparator />
 * </StepperItem>
 */
const StepperSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base separator with orientation-specific dimensions and completion styling
          'bg-muted group-data-[state=completed]/step:bg-primary m-0.5 group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5',
          className
        )}
        {...props}
      />
    )
  }
)
StepperSeparator.displayName = 'StepperSeparator'

/**
 * EXPORTS
 * All stepper components and utilities for external use
 */
export {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
}
