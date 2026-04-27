import React from 'react';

import { formaterNorskDato } from '../felles/datoFormat';
import { NavIkon } from '../ikoner/navIkon';

interface BrevhodeProps {
    tittel: string;
    navn: string;
    fodselsnummer: string;
    dato: string;
}

export const Brevhode = (props: BrevhodeProps) => {
    const { tittel, navn, fodselsnummer, dato } = props;

    return (
        <div style={{ marginBottom: '20px' }}>
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    margin: 0,
                    padding: 0,
                }}
            >
                <NavIkon />
                <p>{formaterNorskDato(dato)}</p>
            </div>
            <div style={{ marginTop: '80px' }}>
                <h1>{tittel}</h1>
                <p>
                    Navn: {navn}
                    <br />
                    Fødselsnummer: {fodselsnummer}
                </p>
            </div>
        </div>
    );
};
