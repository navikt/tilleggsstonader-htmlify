import React from 'react';

import { NonBreakingDiv } from './felles';
import { formaterNorskDato } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';
import { aktivitetTilTekst, faktiskMålgruppeTilTekst } from './typer/målgruppeOgAktivitet';
import { Vedtaksperiode } from './typer/vedtaksperiode';

const VedtaksperiodeRad: React.FC<{ periode: Vedtaksperiode }> = ({ periode }) => {
    return (
        <tr>
            <td>{tekstEllerFeil(faktiskMålgruppeTilTekst, periode.målgruppe)}</td>
            <td>{tekstEllerFeil(aktivitetTilTekst, periode.aktivitet)}</td>
            {periode.tilltaksvariant && <td>{periode.tilltaksvariant}</td>}
            <td>{formaterNorskDato(periode.fom)}</td>
            <td>{formaterNorskDato(periode.tom)}</td>
        </tr>
    );
};

const VedtaksperiodeContent: React.FC<{
    perioder: Vedtaksperiode[];
}> = ({ perioder }) => {
    return (
        <NonBreakingDiv className={'vedtaksperioder'}>
            <h2>Vedtaksperioder</h2>
            <table>
                <thead>
                    <tr>
                        <th>Målgruppe</th>
                        <th>Aktivitet</th>
                        {finnesTiltaksvariant(perioder) && <th>Tilltaksvariant</th>}
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

const finnesTiltaksvariant = (perioder: Vedtaksperiode[]) =>
    perioder.some((periode) => periode.tilltaksvariant);

export default VedtaksperiodeContent;
