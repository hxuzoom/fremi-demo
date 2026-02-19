import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	isLoading?: boolean
	children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			isLoading = false,
			children,
			className = '',
			disabled,
			onClick,
			type = 'button',
			...props
		},
		ref
	) => {
		const baseStyles =
			'inline-flex items-center justify-center font-semibold transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

		const variants = {
			primary:
				'bg-accent text-white hover:bg-accent/90 focus:ring-accent shadow-lg hover:shadow-xl',
			secondary:
				'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600',
			outline:
				'border-2 border-accent text-accent hover:bg-accent/10 focus:ring-accent',
			ghost: 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800',
		}

		const sizes = {
			sm: 'px-4 py-2 text-sm',
			md: 'px-6 py-3 text-base',
			lg: 'px-8 py-4 text-lg',
		}

		return (
			<motion.button
				ref={ref}
				whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
				whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
				className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
				disabled={disabled || isLoading}
				onClick={onClick}
				type={type}
				{...props}
			>
				{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				{children}
			</motion.button>
		)
	}
)

Button.displayName = 'Button'
