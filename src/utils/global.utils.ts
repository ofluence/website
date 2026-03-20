import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * This function is a wrapper around clsx and tailwind-merge. which merges classnames according specificity rules.
 *
 * @param {ClassValue[]} inputs classnames to merge
 * @returns {string} merged classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
