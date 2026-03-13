import React from 'react';

import { RammevedtakPrivatBil } from './typer/rammevedtakPrivatBil';
import { formaterNorskDato } from '../felles/datoFormat';

export const RammevedtakContent: React.FC<{ rammevedtak: RammevedtakPrivatBil | undefined }> = ({
    rammevedtak,
}) => {
    if (!rammevedtak) {
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
                            <tr key={reise.reiseId}>
                                <td>{reise.grunnlag.reisedagerPerUke}</td>
                                <td>
                                    {reise.grunnlag.reiseavstandEnVei}
                                    {' km'}
                                </td>
                                <td>
                                    {
                                        reise.grunnlag.satser[reise.grunnlag.satser.length - 1]
                                            .kilometersats
                                    }
                                    {' kr'}
                                </td>
                                <td>
                                    {reise.grunnlag.ekstrakostnader.bompengerEnVei}
                                    {' kr'}
                                </td>
                                <td>
                                    {reise.grunnlag.ekstrakostnader.bompengerEnVei}
                                    {' kr'}
                                </td>
                                <td>
                                    {
                                        reise.grunnlag.satser[reise.grunnlag.satser.length - 1]
                                            .dagsatsUtenParkering
                                    }
                                    {' kr'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};
