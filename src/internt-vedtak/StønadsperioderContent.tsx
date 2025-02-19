import React from 'react';

import { NonBreakingDiv } from './felles';
import { Stønadsperiode, typeStønadsperiodeTilTekst } from './typer/vilkårperiode';
import { formaterNorskDato } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';

const StønadsperiodeRad: React.FC<{ periode: Stønadsperiode }> = ({ periode }) => {
    return (
        <tr>
            <td>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.målgruppe)}</td>
            <td>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.aktivitet)}</td>
            <td>{formaterNorskDato(periode.fom)}</td>
            <td>{formaterNorskDato(periode.tom)}</td>
        </tr>
    );
};

const StønadsperioderContent: React.FC<{
    perioder: Stønadsperiode[];
}> = ({ perioder }) => {
    if (perioder.length > 0) {
        return (
            <NonBreakingDiv className={'stonadsperioder'}>
                <h2>Overlappsperioder</h2>
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
    }
};

export default StønadsperioderContent;
