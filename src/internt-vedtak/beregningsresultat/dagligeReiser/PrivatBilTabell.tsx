import { formaterPeriode } from '../../../felles/datoFormat';
import { booleanTilJaNei, kronerMedTusenSkilleEllerStrek } from '../../../felles/tekstutils';
import { NonBreakingDiv } from '../../felles';
import { OppsummertBeregningForReise } from '../../typer/beregningsresultatDagligeReiser';

export const PrivatBilTabell: React.FC<{
    reiser: OppsummertBeregningForReise[];
}> = ({ reiser }) => {
    return (
        <NonBreakingDiv>
            <h3>Privat Bil - beregningsresultat</h3>
            {reiser.map((reise) => (
                <div key={reise.reiseId}>
                    <h4>
                        {reise.aktivitetsadresse} - {reise.reiseavstandEnVei} km
                    </h4>
                    <p>ReiseID: {reise.reiseId}</p>
                    {reise.fraTidligereVedtak && <p>Fra tidligere vedtak</p>}

                    <table style={{ fontSize: '90%' }}>
                        <thead>
                            <tr>
                                <th>Periode</th>
                                <th>Antall godkjente reisedager</th>
                                <th>Bompenger totalt</th>
                                <th>Fergekostnad totalt</th>
                                <th>Parkeringskostnad totalt</th>
                                <th>Stønadsbeløp</th>
                                <th>Fra tidligere vedtak</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reise.perioder.map((periode, indeks) => (
                                <tr key={indeks}>
                                    <td>{formaterPeriode(periode)}</td>
                                    <td>{periode.antallGodkjenteReisedager}</td>
                                    <td>
                                        {kronerMedTusenSkilleEllerStrek(periode.bompengerTotalt)}
                                    </td>
                                    <td>
                                        {kronerMedTusenSkilleEllerStrek(periode.fergekostnadTotalt)}
                                    </td>
                                    <td>
                                        {kronerMedTusenSkilleEllerStrek(
                                            periode.parkeringskostnadTotalt
                                        )}
                                    </td>
                                    <td>{kronerMedTusenSkilleEllerStrek(periode.stønadsbeløp)}</td>
                                    <td>{booleanTilJaNei(periode.fraTidligereVedtak)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Totalt stønadsbeløp med perioder fra tidligere vedtak:{' '}
                        {kronerMedTusenSkilleEllerStrek(
                            reise.totaltStønadsbeløpMedPerioderFraForrigeVedtak
                        )}
                    </p>
                    <p>
                        Totalt stønadsbeløp uten perioder fra tidligere vedtak:{' '}
                        {kronerMedTusenSkilleEllerStrek(
                            reise.totaltStønadsbeløpUtenPerioderFraForrigeVedtak
                        )}
                    </p>
                </div>
            ))}
        </NonBreakingDiv>
    );
};
