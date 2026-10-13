import { NonBreakingDiv } from './felles';
import { formaterPeriode } from '../felles/datoFormat';
import { kronerMedTusenSkilleEllerStrek } from '../felles/tekstutils';
import {
    erFaktaDagligReisePrivatBil,
    VilkårFakta,
    FaktaDagligReisePrivatBil,
    erFaktaDagligReiseOffentligTransport,
    FaktaDagligReiseOffentligTransport,
    FaktaReiseTilSamlingOffentligTransport,
    erFaktaReiseTilSamlingOffentligTransport,
    FaktaReiseTilSamlingPrivatBil,
    NødvendigUtgiftReiseTilSamling,
    erFaktaReiseTilSamlingPrivatBil,
} from './typer/vilkår';
import { svarVurderingTilTekst } from './typer/vilkårperiode';

export const Fakta: React.FC<{ fakta: VilkårFakta }> = ({ fakta }) => {
    if (!fakta) return null;

    if (erFaktaDagligReiseOffentligTransport(fakta)) {
        return <FaktaDagligReiseOffentligTransportOppsummering fakta={fakta} />;
    }

    if (erFaktaDagligReisePrivatBil(fakta)) {
        return <FaktaDagligReisePrivatBilOppsummering fakta={fakta} />;
    }

    if (erFaktaReiseTilSamlingOffentligTransport(fakta)) {
        return <FaktaReiseTilSamlingOffentligTransportOppsummering fakta={fakta} />;
    }

    if (erFaktaReiseTilSamlingPrivatBil(fakta)) {
        return <FaktaReiseTilSamlingPrivatBilOppsummering fakta={fakta} />;
    }

    return null;
};

export const FaktaDagligReiseOffentligTransportOppsummering: React.FC<{
    fakta: FaktaDagligReiseOffentligTransport;
}> = ({ fakta }) => {
    return (
        <FaktaContainer tittel="Fakta offentlig transport">
            <>
                <div>Reisedager per uke: {fakta.reisedagerPerUke}</div>
                {fakta.prisEnkelbillett != null && (
                    <div>Pris enkelbillett: {fakta.prisEnkelbillett} kr</div>
                )}
                {fakta.prisSyvdagersbillett != null && (
                    <div>Pris 7-dagersbillett: {fakta.prisSyvdagersbillett} kr</div>
                )}
                {fakta.prisTrettidagersbillett != null && (
                    <div>Pris 30-dagersbillett: {fakta.prisTrettidagersbillett} kr</div>
                )}
            </>
        </FaktaContainer>
    );
};

export const FaktaDagligReisePrivatBilOppsummering: React.FC<{
    fakta: FaktaDagligReisePrivatBil;
}> = ({ fakta }) => {
    return (
        <FaktaContainer tittel="Fakta privat bil">
            <table>
                <thead>
                    <tr>
                        <th>Periode</th>
                        <th>Reisedager per uke</th>
                        <th>Bompenger per dag</th>
                        <th>Fergekostnad per dag</th>
                    </tr>
                </thead>
                <tbody>
                    {fakta.faktaDelperioder.map((delperiode, index) => (
                        <tr key={index}>
                            <td>{formaterPeriode({ fom: delperiode.fom, tom: delperiode.tom })}</td>
                            <td>{delperiode.reisedagerPerUke}</td>
                            <td>
                                {kronerMedTusenSkilleEllerStrek(delperiode.prisBompengerPerDag)}
                            </td>
                            <td>
                                {kronerMedTusenSkilleEllerStrek(delperiode.prisFergekostandPerDag)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </FaktaContainer>
    );
};

const FaktaReiseTilSamlingOffentligTransportOppsummering: React.FC<{
    fakta: FaktaReiseTilSamlingOffentligTransport;
}> = ({ fakta }) => {
    return (
        <FaktaContainer tittel="Fakta offentlig transport">
            <>
                {fakta.aktivitetId != null && <div>Aktivitet ID: {fakta.aktivitetId}</div>}
                <NødvendigUtgiftOppsummering nødvendigUtgift={fakta.nødvendigUtgift} />
                <div>
                    Utgifter: {kronerMedTusenSkilleEllerStrek(fakta.utgifterOffentligTransport)}
                </div>

                <div>Spesifikasjon av utgift (obligatorisk): {fakta.begrunnelse || '-'}</div>
            </>
        </FaktaContainer>
    );
};

const FaktaReiseTilSamlingPrivatBilOppsummering: React.FC<{
    fakta: FaktaReiseTilSamlingPrivatBil;
}> = ({ fakta }) => {
    return (
        <FaktaContainer tittel="Fakta privat bil">
            <>
                {fakta.aktivitetId != null && <div>Aktivitet ID: {fakta.aktivitetId}</div>}
                <NødvendigUtgiftOppsummering nødvendigUtgift={fakta.nødvendigUtgift} />
                <div>Samlet kjøreavstand tur/retur i km: {fakta.reiseavstand}</div>
                <div>Bompenger: {kronerMedTusenSkilleEllerStrek(fakta.bompenger)}</div>
                <div>Fergekostnad: {kronerMedTusenSkilleEllerStrek(fakta.fergekostnad)}</div>
                <div>Parkering: {kronerMedTusenSkilleEllerStrek(fakta.parkering)}</div>
                <div>Piggdekkavgift: {kronerMedTusenSkilleEllerStrek(fakta.piggdekkavgift)}</div>

                <div style={{ marginTop: '16px' }}>
                    Spesifikasjon av utgift (valgfritt): {fakta.begrunnelse || '-'}
                </div>
            </>
        </FaktaContainer>
    );
};

const NødvendigUtgiftOppsummering: React.FC<{
    nødvendigUtgift: NødvendigUtgiftReiseTilSamling;
}> = ({ nødvendigUtgift }) => {
    return (
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
            <div>
                Er utgiften nødvendig: {svarVurderingTilTekst[nødvendigUtgift.erUtgiftenNødvendig]}
            </div>
            {nødvendigUtgift.begrunnelse && (
                <>
                    <div>Hvorfor var ikke utgiften nødvendig?</div>
                    <div>{nødvendigUtgift.begrunnelse}</div>
                </>
            )}
        </div>
    );
};

const FaktaContainer: React.FC<{ tittel: string; children: React.ReactNode }> = ({
    tittel,
    children,
}) => {
    return (
        <div style={{ marginTop: '16px' }}>
            <h4>{tittel}</h4>
            {children}
        </div>
    );
};
