import { formaterPeriode } from '../../../felles/datoFormat';
import { kronerMedTusenSkilleEllerStrek } from '../../../felles/tekstutils';
import { BeregningsresultatOffentligTransport } from '../../typer/beregningsresultatReiseTilSamling';

export const OffentligTransportSamlingTabell: React.FC<{
    samlinger: BeregningsresultatOffentligTransport[];
}> = ({ samlinger }) => {
    return (
        <>
            <h3>Offentlig transport</h3>
            {samlinger.map((samling, reiseIndex) => (
                <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                    <h4>
                        {formaterPeriode(samling)} - {samling.adresse ?? 'Ukjent adresse'}
                    </h4>
                    {samling.fraTidligereVedtak && <p>Fra tidligere vedtak</p>}
                    <table style={{ fontSize: '90%' }}>
                        <thead>
                            <tr>
                                <th>Stønadsbeløp</th>
                                <th>Spesifikasjon av utgift</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{kronerMedTusenSkilleEllerStrek(samling.beløp)}</td>
                                <td>{samling.begrunnelse}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};
