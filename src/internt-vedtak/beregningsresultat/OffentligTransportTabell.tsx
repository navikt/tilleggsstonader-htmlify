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
                const relevantePerioder = (reise.perioder ?? []).filter(
                    (periode) => !periode.fraTidligereVedtak
                );
                const medBrukersNavKontor = reise.perioder.some((p) => p.brukersNavKontor);

                if (relevantePerioder.length === 0) {
                    return null;
                }

                const hasEnkeltbillett = relevantePerioder.some(
                    (p) => (p.billettdetaljer['ENKELTBILLETT'] ?? 0) > 0
                );
                const has7dagersbillett = relevantePerioder.some(
                    (p) => (p.billettdetaljer['SYVDAGERSBILLETT'] ?? 0) > 0
                );
                const has30dagersbillett = relevantePerioder.some(
                    (p) => (p.billettdetaljer['TRETTIDAGERSBILLETT'] ?? 0) > 0
                );
                const hasAntallReisedager = relevantePerioder.some(
                    (p) => p.antallReisedager !== undefined
                );

                const antallDager = relevantePerioder[0]?.antallReisedagerPerUke;

                return (
                    <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                        <h3>
                            {reise.adresse} - Offentlig transport - {antallDager} dager/uke
                        </h3>
                        <table style={{ fontSize: '90%' }}>
                            <thead>
                                <tr>
                                    <th>Fom</th>
                                    <th>Tom</th>
                                    {hasEnkeltbillett && <th>Enkeltb.</th>}
                                    {has7dagersbillett && <th>7-dagersb.</th>}
                                    {has30dagersbillett && <th>30-dagersb.</th>}
                                    {hasAntallReisedager && <th>Reisedager</th>}
                                    <th>Beløp</th>
                                    {medBrukersNavKontor && <th>Brukers NAV-kontor</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {relevantePerioder.map((periode, periodeIndex) => {
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
                                            {hasEnkeltbillett && (
                                                <td>
                                                    {renderBillettPris(
                                                        countEnkelt,
                                                        periode.prisEnkeltbillett
                                                    )}
                                                </td>
                                            )}
                                            {has7dagersbillett && (
                                                <td>
                                                    {renderBillettPris(
                                                        count7d,
                                                        periode.prisSyvdagersbillett
                                                    )}
                                                </td>
                                            )}
                                            {has30dagersbillett && (
                                                <td>
                                                    {renderBillettPris(
                                                        count30d,
                                                        periode.pris30dagersbillett
                                                    )}
                                                </td>
                                            )}
                                            {hasAntallReisedager && (
                                                <td>{periode.antallReisedager}</td>
                                            )}
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
