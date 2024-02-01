import React from 'react';

export const NonBreakingDiv: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={'internt-vedtak-page-break'}>{children}</div>
);

export const Begrunnelse: React.FC<{ data: { begrunnelse?: string } }> = ({ data }) => {
    return (
        data.begrunnelse && (
            <div>
                Begrunnelse: <p style={{ whiteSpace: 'pre-wrap' }}>{data.begrunnelse}</p>
            </div>
        )
    );
};
