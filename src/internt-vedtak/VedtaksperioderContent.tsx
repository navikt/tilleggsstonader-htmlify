import React from 'react';

import { NonBreakingDiv } from './felles';
import { typeStønadsperiodeTilTekst } from './typer/vilkårperiode';
import { formaterNorskDato } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';
import { Vedtaksperiode } from './typer/vedtaksperiode';

const VedtaksperiodeRad: React.FC<{ periode: Vedtaksperiode }> = ({ periode }) => {
    return (
        <tr>
            <td>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.målgruppe)}</td>
            <td>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.aktivitet)}</td>
            <td>{formaterNorskDato(periode.fom)}</td>
            <td>{formaterNorskDato(periode.tom)}</td>
        </tr>
    );
};

const VedtaksperiodeContent: React.FC<{
    perioder: Vedtaksperiode[];
}> = ({ perioder }) => {
    if (perioder.length > 0) {
        return (
            <NonBreakingDiv className={'vedtaksperioder'}>
                <h2>Vedtaksperioder</h2>
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
                            <VedtaksperiodeRad key={index} periode={periode} />
                        ))}
                    </tbody>
                </table>
            </NonBreakingDiv>
        );
    }
};

export default VedtaksperiodeContent;
