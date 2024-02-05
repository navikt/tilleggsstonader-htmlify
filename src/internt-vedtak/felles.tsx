import React from 'react';

export const NonBreakingDiv: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => <div className={`internt-vedtak-page-break ${className || ''}`}>{children}</div>;

export const Begrunnelse: React.FC<{ data: { begrunnelse?: string } }> = ({ data }) => {
    return (
        data.begrunnelse && (
            <div>
                Begrunnelse: <p style={{ whiteSpace: 'pre-wrap' }}>{data.begrunnelse}</p>
            </div>
        )
    );
};

export const KommentarSlettet: React.FC<{ data: { slettetKommentar?: string } }> = ({ data }) => {
    return (
        data.slettetKommentar && (
            <div>
                Kommentar slettet: <p style={{ whiteSpace: 'pre-wrap' }}>{data.slettetKommentar}</p>
            </div>
        )
    );
};
