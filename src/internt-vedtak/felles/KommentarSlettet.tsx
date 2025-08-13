import React from 'react';

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
