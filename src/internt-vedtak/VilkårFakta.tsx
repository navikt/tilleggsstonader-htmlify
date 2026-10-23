import { formaterPeriode } from '../felles/datoFormat';
import { kronerMedTusenSkilleEllerStrek } from '../felles/tekstutils';
import {
    erFaktaDagligReiseOffentligTransport,
    erFaktaDagligReisePrivatBil,
    erFaktaReiseTilSamlingDrosje,
    erFaktaReiseTilSamlingOffentligTransport,
    erFaktaReiseTilSamlingPrivatBil,
    FaktaDagligReiseOffentligTransport,
    FaktaDagligReisePrivatBil,
    FaktaReiseTilSamlingDrosje,
    FaktaReiseTilSamlingOffentligTransport,
    FaktaReiseTilSamlingPrivatBil,
    NødvendigUtgiftReiseTilSamling,
    VilkårFakta,
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

    if (erFaktaReiseTilSamlingDrosje(fakta)) {
        return <FaktaReiseTilSamlingDrosjeOppsummering fakta={fakta} />;
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
                {fakta.prisEnkelbillett && (
                    <div>
                        Pris enkelbillett: {kronerMedTusenSkilleEllerStrek(fakta.prisEnkelbillett)}
                    </div>
                )}
                {fakta.prisSyvdagersbillett != null && (
                    <div>
                        Pris 7-dagersbillett:{' '}
                        {kronerMedTusenSkilleEllerStrek(fakta.prisSyvdagersbillett)}
                    </div>
                )}
                {fakta.prisTrettidagersbillett != null && (
                    <div>
                        Pris 30-dagersbillett:{' '}
                        {kronerMedTusenSkilleEllerStrek(fakta.prisTrettidagersbillett)}
                    </div>
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
            <p>Reiseavstand én vei: {fakta.reiseavstandEnVei} km</p>
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
                            <td>{kronerMedTusenSkilleEllerStrek(delperiode.bompengerPerDag)}</td>
                            <td>{kronerMedTusenSkilleEllerStrek(delperiode.fergekostnadPerDag)}</td>
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

const FaktaReiseTilSamlingDrosjeOppsummering: React.FC<{
    fakta: FaktaReiseTilSamlingDrosje;
}> = ({ fakta }) => {
    return (
        <FaktaContainer tittel="Fakta drosje">
            <>
                {fakta.aktivitetId != null && <div>Aktivitet ID: {fakta.aktivitetId}</div>}
                <NødvendigUtgiftOppsummering nødvendigUtgift={fakta.nødvendigUtgift} />
                <div>Utgifter: {kronerMedTusenSkilleEllerStrek(fakta.utgifterDrosje)}</div>

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
                <div>Samlet kjøreavstand tur/retur i km: {fakta.reiseAvstand}</div>
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
                Er hele utgiften nødvendig:{' '}
                {svarVurderingTilTekst[nødvendigUtgift.erUtgiftenNødvendig]}
            </div>
            {nødvendigUtgift.begrunnelse && (
                <>
                    <div>Hvorfor vurderes ikke hele eller deler av utgiften som nødvendig?</div>
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
