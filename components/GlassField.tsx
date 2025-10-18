// src/components/GlassField.tsx
import React from "react";

type CommonProps = {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
};

type InputOnlyProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaOnlyProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props =
  | (CommonProps & InputOnlyProps & { as?: "input" })
  | (CommonProps & TextareaOnlyProps & { as: "textarea" });

/**
 * GlassField — حقل إدخال آمن لا يرمي أخطاء وقت التشغيل.
 * - يدعم input أو textarea عبر prop `as`.
 * - لا يعتمد على window/localStorage عند التحميل.
 * - يعرض label و icon وخطأ إن وُجدت.
 */
const GlassField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>(function GlassField(props, ref) {
  const {
    as = "input",
    label,
    error,
    icon,
    containerClassName = "",
    labelClassName = "",
    className = "",
    // باقي الخصائص تُمرّر كما هي لعنصر الإدخال
    ...rest
  } = props as any;

  // كلاسات ستايل لطيفة وآمنة (لو ما عندك field-glass ما يكسّر شيء)
  const base =
    "w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 " +
    "px-4 py-3 outline-none shadow-[0_6px_20px_rgba(15,87,49,.10)]";
  const merged = `${base} ${className}`.trim();

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label ? (
        <label className={`block text-sm text-white/80 ${labelClassName}`}>
          {label}
        </label>
      ) : null}

      <div className="relative">
        {icon ? (
          <span className="absolute inset-y-0 end-3 grid place-items-center pointer-events-none opacity-70">
            {icon}
          </span>
        ) : null}

        {as === "textarea" ? (
          <textarea ref={ref as any} className={merged} {...(rest as any)} />
        ) : (
          <input ref={ref as any} className={merged} {...(rest as any)} />
        )}
      </div>

      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
});

export default GlassField;
