import React from 'react';

export const NonBreakingDiv: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => <div className={`internt-vedtak-page-break ${className || ''}`}>{children}</div>;

export const Begrunnelse: React.FC<{ data: { begrunnelse?: string } }> = ({ data }) => {
    return (
        data.begrunnelse && (
            <p style={{ whiteSpace: 'pre-wrap' }}>
                Begrunnelse: <br />
                {data.begrunnelse}
            </p>
        )
    );
};

export const KommentarSlettet: React.FC<{ data: { slettetKommentar?: string } }> = ({ data }) => {
    return (
        data.slettetKommentar && (
            <p style={{ whiteSpace: 'pre-wrap' }}>
                Kommentar slettet: <br />
                {data.slettetKommentar}
            </p>
        )
    );
};
