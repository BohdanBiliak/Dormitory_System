import React from 'react';

export type StatusVariant = 
  | 'paid' 
  | 'pending' 
  | 'unpaid' 
  | 'available' 
  | 'unavailable' 
  | 'occupied' 
  | 'maintenance'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default';

export type StatusSize = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  variant: StatusVariant;
  size?: StatusSize;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  animate?: boolean;
}

const getVariantStyles = (variant: StatusVariant): string => {
  const styles = {
    paid: 'bg-green-100 text-green-800 border-green-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    unpaid: 'bg-red-100 text-red-800 border-red-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    available: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    unavailable: 'bg-slate-100 text-slate-800 border-slate-200',
    occupied: 'bg-blue-100 text-blue-800 border-blue-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    maintenance: 'bg-orange-100 text-orange-800 border-orange-200',
    default: 'bg-slate-100 text-slate-800 border-slate-200',
  };
  
  return styles[variant] || styles.default;
};

const getSizeStyles = (size: StatusSize): string => {
  const styles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  return styles[size];
};

const getIconSize = (size: StatusSize): string => {
  const styles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  return styles[size];
};

const StatusBadge = React.memo(function StatusBadge({ 
  variant, 
  size = 'md', 
  children, 
  className = '', 
  icon,
  animate = false 
}: StatusBadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border ';
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const animationStyles = animate ? 'animate-pulse' : '';
  
  return (
    <span className={`${baseStyles} ${variantStyles} ${sizeStyles} ${animationStyles} ${className}`}>
      {icon && (
        <span className={`${getIconSize(size)} mr-1.5 flex items-center justify-center`}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
});

export default StatusBadge;

// Helper function to get appropriate variant for payment status
export const getPaymentStatusVariant = (status: string): StatusVariant => {
  switch (status?.toUpperCase()) {
    case 'PAID':
      return 'paid';
    case 'PENDING':
      return 'pending';
    case 'UNPAID':
    case 'OVERDUE':
      return 'unpaid';
    default:
      return 'default';
  }
};

// Helper function to get appropriate variant for room status
export const getRoomStatusVariant = (status: string): StatusVariant => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'available';
    case 'occupied':
      return 'occupied';
    case 'maintenance':
      return 'maintenance';
    case 'unavailable':
      return 'unavailable';
    default:
      return 'default';
  }
};

// Helper function to get appropriate variant for general status
export const getGeneralStatusVariant = (status: string): StatusVariant => {
  const lowercaseStatus = status?.toLowerCase();
  
  if (['active', 'completed', 'success', 'approved'].includes(lowercaseStatus)) {
    return 'success';
  }
  
  if (['pending', 'in progress', 'processing'].includes(lowercaseStatus)) {
    return 'warning';
  }
  
  if (['inactive', 'failed', 'error', 'rejected'].includes(lowercaseStatus)) {
    return 'error';
  }
  
  if (['info', 'information'].includes(lowercaseStatus)) {
    return 'info';
  }
  
  return 'default';
};

// Pre-built status badges for common use cases
export const PaymentStatusBadge = React.memo(function PaymentStatusBadge({ status, size = 'md' }: { status: string; size?: StatusSize }) {
  return (
    <StatusBadge variant={getPaymentStatusVariant(status)} size={size}>
      {status}
    </StatusBadge>
  );
});

export const RoomStatusBadge = React.memo(function RoomStatusBadge({ status, size = 'md' }: { status: string; size?: StatusSize }) {
  return (
    <StatusBadge variant={getRoomStatusVariant(status)} size={size}>
      {status}
    </StatusBadge>
  );
});

export const GeneralStatusBadge = React.memo(function GeneralStatusBadge({ status, size = 'md' }: { status: string; size?: StatusSize }) {
  return (
    <StatusBadge variant={getGeneralStatusVariant(status)} size={size}>
      {status}
    </StatusBadge>
  );
});