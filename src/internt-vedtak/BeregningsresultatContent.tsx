import React from 'react';

import { NonBreakingDiv } from './felles';
import {
    Beregningsresultat,
    BeregningsresultatBoutgifter,
    BeregningsresultatDagligReiseTso,
    BeregningsresultatLæremidler,
    BeregningsresultatTilsynBarn,
} from './typer/beregningsresultat';
import { formaterNorskDato } from '../felles/datoFormat';

export const BeregningsresultatContent: React.FC<{
    beregningsresultat?: Beregningsresultat;
}> = ({ beregningsresultat }) => {
    if (!beregningsresultat) {
        return null;
    }
    return (
        <NonBreakingDiv>
            <h2>Beregning</h2>
            {beregningsresultat.tilsynBarn && (
                <TilsynBarnBeregningsresultatTabell
                    beregningsresultatTilsynBarn={beregningsresultat.tilsynBarn}
                />
            )}
            {beregningsresultat.læremidler && (
                <LæremidlerBeregningsresultatTabell
                    beregningsresultatLæremidler={beregningsresultat.læremidler}
                />
            )}
            {beregningsresultat.boutgifter && (
                <BoutgifterBeregningsresultatTabell
                    beregningsresultatBoutgifter={beregningsresultat.boutgifter}
                />
            )}
            {beregningsresultat.dagligReiseTso && (
                <DagligReiseTsoBeregningsresultatTabell
                    beregningsresultatDagligReiseTso={beregningsresultat.dagligReiseTso}
                />
            )}
        </NonBreakingDiv>
    );
};

const TilsynBarnBeregningsresultatTabell: React.FC<{
    beregningsresultatTilsynBarn: BeregningsresultatTilsynBarn[];
}> = ({ beregningsresultatTilsynBarn }) => (
    <table>
        <thead>
            <tr>
                <th>Periode</th>
                <th>Barn</th>
                <th>Månedlige utgifter</th>
                <th>Dagsats</th>
                <th>Stønadsbeløp</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultatTilsynBarn.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{beregningsresultat.grunnlag.måned}</td>
                    <td>{beregningsresultat.grunnlag.antallBarn}</td>
                    <td>{beregningsresultat.grunnlag.utgifterTotal}</td>
                    <td>{beregningsresultat.dagsats}</td>
                    <td>{beregningsresultat.månedsbeløp}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const LæremidlerBeregningsresultatTabell: React.FC<{
    beregningsresultatLæremidler: BeregningsresultatLæremidler[];
}> = ({ beregningsresultatLæremidler }) => (
    <table>
        <thead>
            <tr>
                <th>Fom</th>
                <th>Tom</th>
                <th>Ant. månder</th>
                <th>Månedsbeløp</th>
                <th>Stønadsbeløp</th>
                <th>Utbetalingsdato</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultatLæremidler.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{beregningsresultat.fom}</td>
                    <td>{beregningsresultat.tom}</td>
                    <td>{beregningsresultat.antallMåneder}</td>
                    <td>{beregningsresultat.stønadsbeløpPerMåned}</td>
                    <td>{beregningsresultat.stønadsbeløpForPeriode}</td>
                    <td>{beregningsresultat.utbetalingsdato}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const BoutgifterBeregningsresultatTabell: React.FC<{
    beregningsresultatBoutgifter: BeregningsresultatBoutgifter[];
}> = ({ beregningsresultatBoutgifter }) => (
    <table>
        <thead>
            <tr>
                <th>Fom</th>
                <th>Tom</th>
                <th>Stønadsbeløp</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultatBoutgifter.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{formaterNorskDato(beregningsresultat.fom)}</td>
                    <td>{formaterNorskDato(beregningsresultat.tom)}</td>
                    <td>{beregningsresultat.stønadsbeløp}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const DagligReiseTsoBeregningsresultatTabell: React.FC<{
    beregningsresultatDagligReiseTso: BeregningsresultatDagligReiseTso;
}> = ({ beregningsresultatDagligReiseTso }) => {
    const reiser = beregningsresultatDagligReiseTso.offentligTransport?.reiser ?? [];

    if (reiser.length === 0) {
        return <div>Ingen reiser funnet</div>;
    }

    const renderBillettPris = (count: number, pris: number) =>
        count > 0 ? `${count} × ${pris} = ${count * pris}` : '-';

    return (
        <>
            {reiser.map((reise, reiseIndex) => {
                const relevantePerioder = (reise.perioder ?? []).filter(
                    (periode) => !periode.fraTidligereVedtak
                );
                const medBrukersNavKontor = reise.perioder.some((p) => p.brukersNavKontor);

                if (relevantePerioder.length === 0) {
                    return null;
                }

                const hasEnkeltbillett = relevantePerioder.some(
                    (p) => (p.billettdetaljer['ENKELTBILLETT'] ?? 0) > 0
                );
                const has7dagersbillett = relevantePerioder.some(
                    (p) => (p.billettdetaljer['SYVDAGERSBILLETT'] ?? 0) > 0
                );
                const has30dagersbillett = relevantePerioder.some(
                    (p) => (p.billettdetaljer['TRETTIDAGERSBILLETT'] ?? 0) > 0
                );
                const hasAntallReisedager = relevantePerioder.some(
                    (p) => p.antallReisedager !== undefined
                );

                const antallDager = relevantePerioder[0]?.antallReisedagerPerUke;

                return (
                    <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                        <h3>
                            {reise.adresse} - Offentlig transport - {antallDager} dager/uke
                        </h3>
                        <table style={{ fontSize: '90%' }}>
                            <thead>
                                <tr>
                                    <th>Fom</th>
                                    <th>Tom</th>
                                    {hasEnkeltbillett && <th>Enkeltb.</th>}
                                    {has7dagersbillett && <th>7-dagersb.</th>}
                                    {has30dagersbillett && <th>30-dagersb.</th>}
                                    {hasAntallReisedager && <th>Reisedager</th>}
                                    <th>Beløp</th>
                                    {medBrukersNavKontor && <th>Brukers NAV-kontor</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {relevantePerioder.map((periode, periodeIndex) => {
                                    const countEnkelt =
                                        periode.billettdetaljer['ENKELTBILLETT'] ?? 0;
                                    const count7d =
                                        periode.billettdetaljer['SYVDAGERSBILLETT'] ?? 0;
                                    const count30d =
                                        periode.billettdetaljer['TRETTIDAGERSBILLETT'] ?? 0;

                                    return (
                                        <tr key={periodeIndex}>
                                            <td>{formaterNorskDato(periode.fom)}</td>
                                            <td>{formaterNorskDato(periode.tom)}</td>
                                            {hasEnkeltbillett && (
                                                <td>
                                                    {renderBillettPris(
                                                        countEnkelt,
                                                        periode.prisEnkeltbillett
                                                    )}
                                                </td>
                                            )}
                                            {has7dagersbillett && (
                                                <td>
                                                    {renderBillettPris(
                                                        count7d,
                                                        periode.prisSyvdagersbillett
                                                    )}
                                                </td>
                                            )}
                                            {has30dagersbillett && (
                                                <td>
                                                    {renderBillettPris(
                                                        count30d,
                                                        periode.pris30dagersbillett
                                                    )}
                                                </td>
                                            )}
                                            {hasAntallReisedager && (
                                                <td>{periode.antallReisedager}</td>
                                            )}
                                            <td>{periode.beløp}</td>
                                            {medBrukersNavKontor && (
                                                <td>{periode.brukersNavKontor}</td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </>
    );
};
