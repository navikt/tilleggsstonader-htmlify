import { OppsummertBeregningForReise } from './typer';
import { formaterPeriode } from '../felles/datoFormat';
import { kronerMedTusenSkilleEllerStrek } from '../felles/tekstutils';

export const BeregningsresultatTabell: React.FC<{
    oppsummertReise: OppsummertBeregningForReise;
}> = ({ oppsummertReise }) => {
    const harBompengeutgifter = oppsummertReise.perioder.some(
        (periode) => periode.bompengerTotalt && periode.bompengerTotalt > 0
    );

    const harFergekostnader = oppsummertReise.perioder.some(
        (periode) => periode.fergekostnadTotalt && periode.fergekostnadTotalt > 0
    );

    return (
        <div>
            <table style={{ fontSize: '89%' }}>
                <thead>
                    <tr>
                        <th>Uke</th>
                        <th>Periode</th>
                        <th>Antall dager</th>
                        {harBompengeutgifter && <th>Bompenger</th>}
                        {harFergekostnader && <th>Fergekostnad</th>}
                        <th>Parkeringskostnad</th>
                        <th>Stønadsbeløp</th>
                    </tr>
                </thead>
                <tbody>
                    {oppsummertReise.perioder.map((periode, index) => (
                        <tr key={`${periode.fom}-${periode.tom}-${index}`}>
                            <td>{periode.ukenummer}</td>
                            <td style={{ minWidth: '140px' }}>{formaterPeriode(periode)}</td>
                            <td>{periode.antallGodkjenteReisedager}</td>
                            {harBompengeutgifter && (
                                <td className="høyrejustert">
                                    {kronerMedTusenSkilleEllerStrek(periode.bompengerTotalt)}
                                </td>
                            )}
                            {harFergekostnader && (
                                <td className="høyrejustert">
                                    {kronerMedTusenSkilleEllerStrek(periode.fergekostnadTotalt)}
                                </td>
                            )}
                            <td className="høyrejustert">
                                {kronerMedTusenSkilleEllerStrek(periode.parkeringskostnadTotalt)}
                            </td>
                            <td className="høyrejustert">
                                {kronerMedTusenSkilleEllerStrek(periode.stønadsbeløp)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="tabell-beskrivelse">
                Antall dager viser hvor mange dager innenfor perioden hvor kjøring med privat bil
                dekkes. Parkeringskostnad, fergekostnad og bompenger er oppgitt som totalsum for
                hele uken.
            </p>
        </div>
    );
};
