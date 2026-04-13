import React from 'react';

import { RammevedtakPrivatBil } from './typer/rammevedtakPrivatBil';
import { formaterNorskDato } from '../felles/datoFormat';

export const RammevedtakContent: React.FC<{ rammevedtak: RammevedtakPrivatBil | undefined }> = ({
    rammevedtak,
}) => {
    if (!rammevedtak) {
        return null;
    }

    if (rammevedtak.reiser.length === 0) {
        return null;
    }

    return (
        <>
            <h2>Rammevedtak kjøring med privat bil</h2>
            {rammevedtak.reiser.map((reise, index) => (
                <div style={{ margin: '1rem 0' }} key={index}>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <strong>Tiltaksadresse: </strong>
                        {reise.aktivitetsadresse}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <strong>Periode: </strong>
                        <span>
                            {formaterNorskDato(reise.grunnlag.fom)}
                            {' til '}
                            {formaterNorskDato(reise.grunnlag.tom)}
                        </span>
                    </div>
                    <table style={{ fontSize: '90%' }}>
                        <thead>
                            <tr>
                                <th>Reisedager per uke</th>
                                <th>Reiseavstand én vei</th>
                                <th>Kilometersats</th>
                                <th>Bom én vei</th>
                                <th>Ferge én vei</th>
                                <th>Dagsats u/park</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reise.grunnlag.delperioder.map((delperiode) => (
                                <tr key={reise.reiseId}>
                                    <td>{delperiode.reisedagerPerUke}</td>
                                    <td>
                                        {reise.grunnlag.reiseavstandEnVei}
                                        {' km'}
                                    </td>
                                    <td>
                                        {
                                            delperiode.satser[delperiode.satser.length - 1]
                                                .kilometersats
                                        }
                                        {' kr'}
                                    </td>
                                    <td>
                                        {delperiode.ekstrakostnader.bompengerPerDag}
                                        {' kr'}
                                    </td>
                                    <td>
                                        {delperiode.ekstrakostnader.fergekostnadPerDag}
                                        {' kr'}
                                    </td>
                                    <td>
                                        {
                                            delperiode.satser[delperiode.satser.length - 1]
                                                .dagsatsUtenParkering
                                        }
                                        {' kr'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};
