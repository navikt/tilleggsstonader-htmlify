import { formaterNorskDato } from '../../../felles/datoFormat';
import { booleanTilJaNei } from '../../../felles/tekstutils';
import { NonBreakingDiv } from '../../felles';
import { BeregningsresultatForReiseOffentlig } from '../../typer/beregningsresultatDagligeReiser';

export const OffentligTransportTabell: React.FC<{
    offentligTransportReiser: BeregningsresultatForReiseOffentlig[];
}> = ({ offentligTransportReiser }) => {
    const renderBillettPris = (count: number, pris?: number) => {
        if (!pris) return '-';

        return count > 0 ? `${count} × ${pris} = ${count * pris}` : '-';
    };

    return (
        <NonBreakingDiv>
            <h3>Offentlig transport</h3>
            {offentligTransportReiser.map((reise, reiseIndex) => {
                const medBrukersNavKontor = reise.perioder.some((p) => p.brukersNavKontor);

                if (reise.perioder.length === 0) {
                    return null;
                }

                const hasEnkeltbillett = reise.perioder.some(
                    (p) => (p.billettdetaljer['ENKELTBILLETT'] ?? 0) > 0
                );
                const has7dagersbillett = reise.perioder.some(
                    (p) => (p.billettdetaljer['SYVDAGERSBILLETT'] ?? 0) > 0
                );
                const has30dagersbillett = reise.perioder.some(
                    (p) => (p.billettdetaljer['TRETTIDAGERSBILLETT'] ?? 0) > 0
                );
                const hasAntallReisedager = reise.perioder.some(
                    (p) => p.antallReisedager !== undefined
                );

                const antallDager = reise.perioder[0]?.antallReisedagerPerUke;

                return (
                    <div key={reiseIndex} style={{ marginBottom: '2rem' }}>
                        <h4>
                            {reise.adresse} - {antallDager} dager/uke
                        </h4>
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
                                    <th>Fra tidligere vedtak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reise.perioder.map((periode, periodeIndex) => {
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
                                            <td>{booleanTilJaNei(periode.fraTidligereVedtak)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </NonBreakingDiv>
    );
};
