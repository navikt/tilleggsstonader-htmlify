import { OppsummertBeregningForReise } from './typer';
import { formaterPeriode } from '../felles/datoFormat';
import { kronerMedTusenSkilleEllerStrek } from '../felles/tekstutils';

export const BeregningsresultatTabell: React.FC<{
    oppsummertReise: OppsummertBeregningForReise;
}> = ({ oppsummertReise }) => {
    return (
        <table style={{ fontSize: '90%', width: '100%' }}>
            <thead>
                <tr>
                    <th>Uke</th>
                    <th>Periode</th>
                    <th>Antall dager som dekkes</th>
                    <th>Totale bompengekostnader</th>
                    <th>Totale fergekostnader</th>
                    <th>Totale parkeringsutgifter</th>
                    <th>Stønadsbeløp</th>
                </tr>
            </thead>
            <tbody>
                {oppsummertReise.perioder.map((periode, index) => (
                    <tr key={`${periode.fom}-${periode.tom}-${index}`}>
                        <td>Uke {periode.ukenummer}</td>
                        <td>{formaterPeriode(periode)}</td>
                        <td>{periode.antallGodkjenteReisedager}</td>
                        <td>{kronerMedTusenSkilleEllerStrek(periode.bompengerTotalt)}</td>
                        <td>{kronerMedTusenSkilleEllerStrek(periode.fergekostnadTotalt)}</td>
                        <td>{kronerMedTusenSkilleEllerStrek(periode.parkeringskostnadTotalt)}</td>
                        <td>{kronerMedTusenSkilleEllerStrek(periode.stønadsbeløp)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
