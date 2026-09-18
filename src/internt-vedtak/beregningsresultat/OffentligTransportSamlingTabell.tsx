import { formaterNorskDato } from '../../felles/datoFormat';
import { BeregningsresultatOffentligTransport } from '../typer/beregningsresultat';

export const OffentligTransportSamlingTabell: React.FC<{
    samlinger: BeregningsresultatOffentligTransport[];
}> = ({ samlinger }) => {
    return (
        <>
            {samlinger.map((samling, reiseIndex) => (
                <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                    <h3>{samling.adresse} - Offentlig transport</h3>

                    <table style={{ fontSize: '90%' }}>
                        <thead>
                            <tr>
                                <th>Fom</th>
                                <th>Tom</th>
                                {samling.beløp && <th>Beløp.</th>}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{formaterNorskDato(samling.fom)}</td>
                                <td>{formaterNorskDato(samling.tom)}</td>
                                <td>{samling.beløp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};
