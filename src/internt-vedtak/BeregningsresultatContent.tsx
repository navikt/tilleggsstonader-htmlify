import React from 'react';

import { NonBreakingDiv } from './felles';
import {
    Beregningsresultat,
    BeregningsresultatBoutgifter,
    BeregningsresultatLæremidler,
    BeregningsresultatTilsynBarn,
} from './typer/beregningsresultat';
import { formaterNorskDato, formaterNorskDatoTid } from '../felles/datoFormat';

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
                    <td>{beregningsresultat.beløp}</td>
                    <td>{beregningsresultat.stønadsbeløp}</td>
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
                <th>Ant. månder</th>
                <th>Månedsbeløp</th>
                <th>Stønadsbeløp</th>
                <th>Utbetalingsdato</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultatBoutgifter.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{formaterNorskDato(beregningsresultat.fom)}</td>
                    <td>{formaterNorskDatoTid(beregningsresultat.tom)}</td>
                    <td>{beregningsresultat.antallMåneder}</td>
                    <td>{beregningsresultat.beløp}</td>
                    <td>{beregningsresultat.stønadsbeløp}</td>
                    <td>{formaterNorskDato(beregningsresultat.utbetalingsdato)}</td>
                </tr>
            ))}
        </tbody>
    </table>
);
