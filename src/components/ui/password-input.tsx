import { useState } from 'react'

import { LockPasswordIcon, ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/utils/global.utils'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

interface PasswordInputProps {
  value?: string
  error?: boolean
  showIcon?: boolean
  onChange?: (_value: string) => void
  placeholder?: string
  className?: string
  showPasswordStrength?: boolean
  autoComplete?: 'current-password' | 'new-password'
}

const PasswordInput = ({
  value,
  showIcon,
  onChange,
  placeholder = 'Enter your password',
  className,
  showPasswordStrength = false,
  autoComplete = 'current-password',
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <>
      <InputGroup
        className={cn(
          className,
          error &&
            'border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40'
        )}
      >
        <InputGroupInput
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete={autoComplete}
        />
        {showIcon && (
          <InputGroupAddon align="inline-start">
            <HugeiconsIcon
              icon={LockPasswordIcon}
              strokeWidth={2}
              className={cn(error && 'text-destructive')}
            />
          </InputGroupAddon>
        )}
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  className="rounded-full"
                  size="icon-xs"
                  onClick={togglePasswordVisibility}
                />
              }
            >
              {showPassword ? (
                <HugeiconsIcon
                  icon={ViewIcon}
                  strokeWidth={2}
                  className={cn(className, 'bg-transparent', error && 'text-destructive')}
                />
              ) : (
                <HugeiconsIcon
                  icon={ViewOffIcon}
                  strokeWidth={2}
                  className={cn(className, 'bg-transparent', error && 'stroke-destructive')}
                />
              )}
            </TooltipTrigger>
            <TooltipContent>{showPassword ? 'Hide password' : 'Show password'}</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      {value !== undefined && value !== '' && showPasswordStrength && (
        <p className="text-muted-foreground text-sm">
          Password strength: {value.length < 8 ? 'Weak' : 'Strong'}
        </p>
      )}
    </>
  )
}

export { PasswordInput }
