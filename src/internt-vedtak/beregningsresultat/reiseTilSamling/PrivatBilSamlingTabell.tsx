import { formaterPeriode } from '../../../felles/datoFormat';
import { kronerMedTusenSkilleEllerStrek } from '../../../felles/tekstutils';
import { BeregningsresultatPrivatBil } from '../../typer/beregningsresultat';

export const PrivatBilSamlingTabell: React.FC<{
    samlinger: BeregningsresultatPrivatBil[];
}> = ({ samlinger }) => {
    return (
        <>
            <h3>Privat bil</h3>
            {samlinger.map((samling, reiseIndex) => (
                <div key={reiseIndex}>
                    <h4>
                        {formaterPeriode(samling)} - {samling.adresse ?? 'Ukjent adresse'}
                    </h4>
                    <table style={{ verticalAlign: 'top' }}>
                        <colgroup>
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '15%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Total reiseavstand</th>
                                <th>Kilometersats</th>
                                <th>Kjøreutgift</th>
                                <th>Ekstrakostnader</th>
                                <th>Stønadsbeløp</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{samling.totalReiseavstand} km</td>
                                <td>{samling.sats} kr/km</td>
                                <td>
                                    {kronerMedTusenSkilleEllerStrek(
                                        samling.beløpUtenAndreKostnader
                                    )}
                                </td>
                                <td>
                                    {samling.bompenger != null && (
                                        <div>
                                            Bompenger:{' '}
                                            {kronerMedTusenSkilleEllerStrek(samling.bompenger)}
                                        </div>
                                    )}
                                    {samling.parkering != null && (
                                        <div>
                                            Parkering:{' '}
                                            {kronerMedTusenSkilleEllerStrek(samling.parkering)}
                                        </div>
                                    )}
                                    {samling.fergekostnad != null && (
                                        <div>
                                            Fergekostnad:{' '}
                                            {kronerMedTusenSkilleEllerStrek(samling.fergekostnad)}
                                        </div>
                                    )}
                                    {samling.piggdekkavgift != null && (
                                        <div>
                                            Piggdekkavgift:{' '}
                                            {kronerMedTusenSkilleEllerStrek(samling.piggdekkavgift)}
                                        </div>
                                    )}
                                </td>
                                <td>{kronerMedTusenSkilleEllerStrek(samling.beløp)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};
