import { formaterNorskDato } from '../../felles/datoFormat';
import { OffentligTransportReise } from '../typer/beregningsresultat';

export const OffentligTransportTabell: React.FC<{
    offentligTransportReiser: OffentligTransportReise[];
}> = ({ offentligTransportReiser }) => {
    const renderBillettPris = (count: number, pris: number) =>
        count > 0 ? `${count} × ${pris} = ${count * pris}` : '-';

    return (
        <>
            {offentligTransportReiser.map((reise, reiseIndex) => {
                const perioder = reise.perioder ?? [];
                const medBrukersNavKontor = reise.perioder.some((p) => p.brukersNavKontor);

                if (perioder.length === 0) {
                    return (
                        <div key={reiseIndex}>
                            <h3>Reise {reiseIndex + 1}</h3>
                            <div>Ingen perioder funnet</div>
                        </div>
                    );
                }

                return (
                    <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                        <h3>Reise {reiseIndex + 1} - offentlig transport</h3>
                        <table style={{ fontSize: '90%' }}>
                            <thead>
                                <tr>
                                    <th>Fom</th>
                                    <th>Tom</th>
                                    <th>Enkeltbillett</th>
                                    <th>7-dagersbillett</th>
                                    <th>30-dagersbillett</th>
                                    <th>Antall reisedager per uke</th>
                                    <th>Beløp</th>
                                    {medBrukersNavKontor && <th>Brukers NAV-kontor</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {perioder.map((periode, periodeIndex) => {
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
                                            <td>
                                                {renderBillettPris(
                                                    countEnkelt,
                                                    periode.prisEnkeltbillett
                                                )}
                                            </td>
                                            <td>
                                                {renderBillettPris(
                                                    count7d,
                                                    periode.prisSyvdagersbillett
                                                )}
                                            </td>
                                            <td>
                                                {renderBillettPris(
                                                    count30d,
                                                    periode.pris30dagersbillett
                                                )}
                                            </td>
                                            <td>{periode.antallReisedagerPerUke}</td>
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
