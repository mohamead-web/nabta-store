import React from 'react';

type Props = {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  textArea?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
};

export default function GlassField({ label, value, onChange, required, textArea, inputMode }: Props) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.35)',
    background: 'linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.65))',
    color: '#0B3C24',          // نص داكن ومقروء
    padding: '12px 14px',
    outline: 'none',
    boxShadow: '0 6px 20px rgba(15,87,49,.10)',
  };

  const wrapStyle: React.CSSProperties = { display:'grid', gap: 6 };
  const labelStyle: React.CSSProperties = { fontSize: 13, opacity:.9, color:'#0F5731', fontWeight: 600 };

  return (
    <div style={wrapStyle}>
      <label style={labelStyle}>
        {label} {required && <span style={{color:'crimson'}}>*</span>}
      </label>
      {textArea ? (
        <textarea
          required={required}
          value={value}
          onChange={onChange}
          rows={4}
          style={baseStyle}
          placeholder="اكتب هنا"
        />
      ) : (
        <input
          required={required}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          style={baseStyle}
          placeholder="اكتب هنا"
        />
      )}
    </div>
  );
}
