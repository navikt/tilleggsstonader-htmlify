import { NonBreakingDiv } from '../felles';
import { DagligReiseBeregningsresultatTabell } from './dagligeReiser/DagligeReiserBeregningsresultatTabell';
import { ReiseTilSamlingBeregningsresultatTabell } from './reiseTilSamling/ReiseTilSamlingBeregningsresultatTabell';
import { formaterPeriode } from '../../felles/datoFormat';
import { booleanTilJaNei } from '../../felles/tekstutils';
import {
    Beregningsresultat,
    BeregningsresultatBoutgifter,
    BeregningsresultatLæremidler,
    BeregningsresultatTilsynBarn,
} from '../typer/beregningsresultat';

export const BeregningsresultatContent: React.FC<{
    beregningsresultat?: Beregningsresultat;
}> = ({ beregningsresultat }) => {
    if (!beregningsresultat) {
        return null;
    }
    return (
        <NonBreakingDiv>
            <h2 style={{ marginBottom: '1rem' }}>Beregning</h2>
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
            {beregningsresultat.dagligReise && (
                <DagligReiseBeregningsresultatTabell
                    beregningsresultat={beregningsresultat.dagligReise}
                />
            )}
            {beregningsresultat.reiseTilSamling && (
                <ReiseTilSamlingBeregningsresultatTabell
                    beregningsresultat={beregningsresultat.reiseTilSamling}
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
                <th>Antall barn</th>
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
                <th>Periode</th>
                <th>Ant. månder</th>
                <th>Månedsbeløp</th>
                <th>Stønadsbeløp</th>
                <th>Utbetalingsdato</th>
                <th>Ekstrainformasjon</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultatLæremidler.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{formaterPeriode(beregningsresultat)}</td>
                    <td>{beregningsresultat.antallMåneder}</td>
                    <td>{beregningsresultat.stønadsbeløpPerMåned}</td>
                    <td>{beregningsresultat.stønadsbeløpForPeriode}</td>
                    <td>{beregningsresultat.utbetalingsdato}</td>
                    <td style={{ fontSize: '75%' }}>
                        <div>Studienivå: {beregningsresultat.studienivå}</div>
                        <div>Studieprosent: {beregningsresultat.studieprosent}</div>
                        <div>Aktivitet: {beregningsresultat.aktivitet}</div>
                        <div>Faktisk målgruppe: {beregningsresultat.målgruppe}</div>
                        <div>
                            Del av tidligere utbetaling:{' '}
                            {booleanTilJaNei(beregningsresultat.delAvTidligereUtbetaling)}
                        </div>
                    </td>
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
                <th>Periode</th>
                <th>Sum utgifter</th>
                <th>Stønadsbeløp</th>
                <th>Ekstrainformasjon</th>
            </tr>
        </thead>
        <tbody>
            {beregningsresultatBoutgifter.map((beregningsresultat, index) => (
                <tr key={index}>
                    <td>{formaterPeriode(beregningsresultat)}</td>
                    <td>{beregningsresultat.sumUtgifter}</td>
                    <td>{beregningsresultat.stønadsbeløp}</td>
                    <td style={{ fontSize: '75%' }}>
                        <div>
                            Del av tidligere utbetaling:{' '}
                            {booleanTilJaNei(beregningsresultat.delAvTidligereUtbetaling)}
                        </div>
                        <div>
                            Makssats bekreftet:{' '}
                            {booleanTilJaNei(beregningsresultat.makssatsBekreftet)}
                        </div>
                        <div>
                            {' '}
                            Får dekt faktiske utgifter:{' '}
                            {booleanTilJaNei(beregningsresultat.skalFåDekketFaktiskeUtgifter)}
                        </div>
                        <div>
                            Inneholder utgifter overnatting:{' '}
                            {booleanTilJaNei(beregningsresultat.inneholderUtgifterOvernatting)}
                        </div>
                        <div>Aktivitet: {beregningsresultat.aktivitet}</div>
                        <div>Faktisk målgruppe: {beregningsresultat.målgruppe}</div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
