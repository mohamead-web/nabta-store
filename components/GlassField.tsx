import React from 'react';

export default class CrashGuard extends React.Component<
  { children: React.ReactNode },
  { error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: '#fff', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: 22, marginBottom: 8 }}>حدث خطأ في الواجهة</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,.12)', padding: 12, borderRadius: 8 }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <p style={{ opacity: .8, marginTop: 12 }}>افتح Console لو احتجنا التفاصيل.</p>
        </div>
      );
    }
    return this.props.children as any;
  }
}
