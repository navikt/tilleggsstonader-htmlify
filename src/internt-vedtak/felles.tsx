import React from 'react';

export const NonBreakingDiv: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => <div className={`internt-vedtak-page-break ${className || ''}`}>{children}</div>;

export const Begrunnelse: React.FC<{ begrunnelse?: string }> = ({ begrunnelse }) => {
    return (
        begrunnelse && (
            <p style={{ whiteSpace: 'pre-wrap' }}>
                Begrunnelse: <br />
                {begrunnelse}
            </p>
        )
    );
};
