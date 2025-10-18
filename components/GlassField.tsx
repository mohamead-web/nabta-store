import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const GlassField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', ...rest }, ref) => {
    return (
      <div className="space-y-1">
        {label ? <label className="block text-sm text-white/80">{label}</label> : null}
        <input
          ref={ref}
          className={
            'w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-white px-4 py-3 outline-none ' +
            'shadow-[0_6px_20px_rgba(15,87,49,.10)] placeholder-white/70 ' + className
          }
          {...rest}
        />
        {error ? <p className="text-xs text-red-300">{error}</p> : null}
      </div>
    );
  }
);

export default GlassField;
