import { formaterNorskDato } from '../../felles/datoFormat';
import { BeregningsresultatPrivatBil } from '../typer/beregningsresultat';

export const PrivatBilSamlingTabell: React.FC<{
    samlinger: BeregningsresultatPrivatBil[];
}> = ({ samlinger }) => {
    return (
        <>
            {samlinger.map((samling, reiseIndex) => (
                <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                    <h3>{samling.adresse}- Privat bil</h3>

                    <table style={{ fontSize: '75%' }}>
                        <thead>
                            <tr>
                                <th>Fom</th>
                                <th>Tom</th>
                                <th>Totalt reiseavstand</th>
                                <th>Sats</th>
                                {samling.bompenger != null && <th>Bompenger</th>}
                                {samling.parkering != null && <th>Parkering</th>}
                                {samling.fergekostnad != null && <th>Fergekostnad</th>}
                                {samling.piggdekkavgift != null && <th>Piggdekkavgift</th>}
                                <th>Beløp.</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{formaterNorskDato(samling.fom)}</td>
                                <td>{formaterNorskDato(samling.tom)}</td>
                                <td>{samling.totaltReiseavstand}</td>
                                <td>{samling.sats}</td>
                                {samling.bompenger != null && <td>{samling.bompenger}</td>}
                                {samling.parkering != null && <td>{samling.parkering}</td>}
                                {samling.fergekostnad != null && <td>{samling.fergekostnad}</td>}
                                {samling.piggdekkavgift != null && (
                                    <td>{samling.piggdekkavgift}</td>
                                )}
                                <td>{samling.beløp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    );
};
