import { forwardRef } from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps {
	id: string
	label: string
	error?: string
	className?: string
	checked?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ id, label, error, className = '', checked, ...props }, ref) => {
		return (
			<div className={className}>
				<div className="flex items-start gap-3">
					<div className="relative flex items-center">
						<input
							{...props}
							ref={ref}
							id={id}
							type="checkbox"
							checked={checked}
							className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-white bg-transparent transition-all checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/20"
						/>
						<Check
							size={16}
							className="pointer-events-none absolute left-0.5 top-0.5 hidden text-white peer-checked:block"
							aria-hidden="true"
						/>
					</div>
					<label htmlFor={id} className="cursor-pointer text-sm text-white">
						{label}
					</label>
				</div>
				{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'
