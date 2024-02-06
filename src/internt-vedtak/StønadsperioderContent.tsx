import React from 'react';

import { NonBreakingDiv } from './felles';
import { Stønadsperiode } from './typer/vilkårperiode';
import { formaterNorskDato } from '../felles/datoFormat';

const StønadsperiodeRad: React.FC<{ periode: Stønadsperiode }> = ({ periode }) => {
    return (
        <tr>
            <td>{periode.målgruppe}</td>
            <td>{periode.aktivitet}</td>
            <td>{formaterNorskDato(periode.fom)}</td>
            <td>{formaterNorskDato(periode.tom)}</td>
        </tr>
    );
};

const StønadsperioderContent: React.FC<{
    perioder: Stønadsperiode[];
}> = ({ perioder }) => {
    return (
        <NonBreakingDiv className={'stonadsperioder'}>
            <h2>Stønadsperioder</h2>
            <table>
                <thead>
                    <tr>
                        <th>Målgruppe</th>
                        <th>Aktivitet</th>
                        <th>Fra</th>
                        <th>Til</th>
                    </tr>
                </thead>
                <tbody>
                    {perioder.map((periode, index) => (
                        <StønadsperiodeRad key={index} periode={periode} />
                    ))}
                </tbody>
            </table>
        </NonBreakingDiv>
    );
};

export default StønadsperioderContent;
