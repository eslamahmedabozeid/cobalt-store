import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '40px 20px'
      }}
    >
      <div style={{ fontSize: '4.5rem', marginBottom: '16px' }}>🔍</div>
      <h1 style={{ color: '#FFF', fontSize: '2rem', fontWeight: 900, marginBottom: '12px' }}>
        الصفحة غير موجودة (404)
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', lineHeight: '1.7', marginBottom: '24px' }}>
        عذراً، الصفحة التي تبحث عنها قد تم نقلها أو أنها غير متوفرة حالياً. يمكنك العودة إلى متجر كوبالت واستعراض خدماتنا.
      </p>
      <Link href="/" className="btn-cobalt-primary">
        العودة للرئيسية
      </Link>
    </div>
  );
}
