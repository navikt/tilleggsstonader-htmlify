import React from 'react';

import { NonBreakingDiv } from './felles';
import { typeStønadsperiodeTilTekst } from './typer/vilkårperiode';
import { formaterNorskDato } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';
import { Vedtaksperiode } from './typer/vedtaksperiode';

const VedtaksperiodeRad: React.FC<{ periode: Vedtaksperiode }> = ({ periode }) => {
    return (
        <tr>
            {periode.målgruppe && (
                <td>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.målgruppe)}</td>
            )}
            {periode.aktivitet && (
                <td>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.aktivitet)}</td>
            )}
            <td>{formaterNorskDato(periode.fom)}</td>
            <td>{formaterNorskDato(periode.tom)}</td>
        </tr>
    );
};

/*
Denne komponenten gjør en sjekk for om målgrupper og aktiviteter finnes da denne komponentetn brukes både for
vedtaksperioder tilsyn barn og vedtaksperioder læremidler.
Når vedtaksperioder læremidler får målgruppe og aktivtet kan dette skrives om
 */
const VedtaksperiodeContent: React.FC<{
    perioder: Vedtaksperiode[];
}> = ({ perioder }) => {
    const harMålgrupper = perioder[0]?.målgruppe !== null;
    const harAktiviteter = perioder[0]?.aktivitet !== null;

    return (
        <NonBreakingDiv className={'vedtaksperioder'}>
            <h2>Vedtaksperioder</h2>
            <table>
                <thead>
                    <tr>
                        {harMålgrupper && <th>Målgruppe</th>}
                        {harAktiviteter && <th>Aktivitet</th>}
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
};

export default VedtaksperiodeContent;
