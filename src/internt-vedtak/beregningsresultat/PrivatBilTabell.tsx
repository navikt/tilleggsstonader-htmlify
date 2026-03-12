import React from 'react';

import { formaterNorskDato } from '../../felles/datoFormat';
import { PrivatBilReise } from '../typer/beregningsresultat';

export const PrivatBilTabell: React.FC<{
    privatBilReiser: PrivatBilReise[];
}> = ({ privatBilReiser }) => {
    return (
        <>
            {privatBilReiser.map((reise, reiseIndex) => {
                return (
                    <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                        <h3>Reise {reiseIndex + 1} - privat bil</h3>
                        <table style={{ fontSize: '90%', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Fom</th>
                                    <th>Tom</th>
                                    <th>Utbetalingsdato</th>
                                    <th>Stønadsbeløp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reise.perioder.map((periode, periodeIndex) => (
                                    <React.Fragment key={periodeIndex}>
                                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                                            <td>{formaterNorskDato(periode.fom)}</td>
                                            <td>{formaterNorskDato(periode.tom)}</td>
                                            <td>{formaterNorskDato(periode.utbetalingsdato)}</td>
                                            <td>
                                                {periode.stønadsbeløp}
                                                {' kr'}
                                            </td>
                                        </tr>
                                        {periode.grunnlag?.dager &&
                                            periode.grunnlag.dager.length > 0 && (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <table
                                                            style={{
                                                                width: '100%',
                                                                fontSize: '90%',
                                                                background: '#fff',
                                                            }}
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th>Dato</th>
                                                                    <th>Stønadsbeløp per dag</th>
                                                                    <th>Parkeringskostnad</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {periode.grunnlag.dager.map(
                                                                    (dag, dagIndex) => (
                                                                        <tr key={dagIndex}>
                                                                            <td>
                                                                                {formaterNorskDato(
                                                                                    dag.dato
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    dag.stønadsbeløpForDag
                                                                                }
                                                                                {' kr'}
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    dag.parkeringskostnad
                                                                                }
                                                                                {' kr'}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </>
    );
};
