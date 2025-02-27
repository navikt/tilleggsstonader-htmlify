import React from 'react';

import {
    behandlingResultatTilTekst,
    FormVilkår,
    formkravFristUnntakTilTekst,
    formVilkårTilTekst,
    hjemmelTilVisningstekst,
    FormkravVilkår,
    BehandlingKlage,
    PåklagetVedtak,
    Vurdering,
    vedtakTilTekst,
    årsakTilTekst,
} from './klageInterntVedtakTyper';
import { formaterNorskDato, formaterNorskDatoTid } from '../../felles/datoFormat';
import { tekstEllerFeil } from '../../felles/tekstutils';

const påklagetVedtak = (påklagetVedtak?: PåklagetVedtak) => {
    if (!påklagetVedtak) {
        return 'Har ikke klaget på et vedtak';
    } else {
        return `${påklagetVedtak.behandlingstype} - ${påklagetVedtak.resultat} - ${formaterNorskDatoTid(
            påklagetVedtak.vedtakstidspunkt
        )}`;
    }
};

export const KlageBehandling: React.FC<{ behandling: BehandlingKlage }> = ({ behandling }) => {
    return (
        <div className={'blankett-page-break'}>
            <h2>Behandling</h2>
            <div>
                <strong>Saksnummer:</strong> {behandling.eksternFagsakId}
            </div>
            <div>
                <strong>Klage mottatt:</strong> {formaterNorskDato(behandling.klageMottatt)}
            </div>
            <div>
                <strong>Resultat:</strong>{' '}
                {tekstEllerFeil(behandlingResultatTilTekst, behandling.resultat)}
            </div>
            <div>
                <strong>Vedtak som er påklaget:</strong> {påklagetVedtak(behandling.påklagetVedtak)}
            </div>
        </div>
    );
};

export const KlageFormkrav: React.FC<{ formkrav: FormkravVilkår }> = ({ formkrav }) => {
    return (
        <div className={'blankett-page-break'}>
            <>
                <h2>Formkrav</h2>
                <h4 className={'blankett'}>Er klager part i saken?</h4>
                <span>{tekstEllerFeil(formVilkårTilTekst, formkrav.klagePart)}</span>
                <h4 className={'blankett'}>Klages det på konkrete elementer i vedtaket?</h4>
                <span>{tekstEllerFeil(formVilkårTilTekst, formkrav.klageKonkret)}</span>
                <h4 className={'blankett'}>Er klagefristen overholdt?</h4>
                <span>{tekstEllerFeil(formVilkårTilTekst, formkrav.klagefristOverholdt)}</span>
                {formkrav.klagefristOverholdt === FormVilkår.IKKE_OPPFYLT &&
                    formkrav.klagefristOverholdtUnntak && (
                        <>
                            <h5>Er unntak for klagefristen oppfylt?</h5>
                            <span>
                                {tekstEllerFeil(
                                    formkravFristUnntakTilTekst,
                                    formkrav.klagefristOverholdtUnntak
                                )}
                            </span>
                        </>
                    )}
                <h4 className={'blankett'}>Er klagen signert?</h4>
                <span>{tekstEllerFeil(formVilkårTilTekst, formkrav.klageSignert)}</span>
                {formkrav.saksbehandlerBegrunnelse && (
                    <>
                        <h4 className={'blankett'}>Begrunnelse</h4>
                        <span style={{ whiteSpace: 'pre-wrap' }}>
                            {formkrav.saksbehandlerBegrunnelse}
                        </span>
                    </>
                )}
                {formkrav.brevtekst && (
                    <>
                        <h4 className={'blankett'}>Fritekst til brev</h4>
                        <span style={{ whiteSpace: 'pre-wrap' }}>{formkrav.brevtekst}</span>
                    </>
                )}
            </>
        </div>
    );
};

export const Klagevurdering: React.FC<{ vurdering?: Vurdering }> = ({ vurdering }) => {
    if (!vurdering) {
        return null;
    }

    return (
        <div className={'blankett-page-break'}>
            <h2>Vurdering</h2>
            <h4 className={'blankett'}>Vedtak</h4>
            <span>{tekstEllerFeil(vedtakTilTekst, vurdering.vedtak)}</span>
            {vurdering.hjemmel && (
                <>
                    <h4 className={'blankett'}>Hjemmel</h4>
                    <span>{tekstEllerFeil(hjemmelTilVisningstekst, vurdering.hjemmel)}</span>
                </>
            )}
            {vurdering.hjemler && (
                <>
                    <h4 className={'blankett'}>Hjemler</h4>
                    <ul>
                        {vurdering.hjemler.map((hjemmel, index) => (
                            <li key={index}>{tekstEllerFeil(hjemmelTilVisningstekst, hjemmel)}</li>
                        ))}
                    </ul>
                </>
            )}
            {vurdering.årsak && (
                <>
                    <h4 className={'blankett'}>Årsak</h4>
                    <span>{tekstEllerFeil(årsakTilTekst, vurdering.årsak)}</span>
                </>
            )}
            {vurdering.begrunnelseOmgjøring && (
                <>
                    <h4 className={'blankett'}>Begrunnelse for omgjøring</h4>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{vurdering.begrunnelseOmgjøring}</span>
                </>
            )}
            {vurdering.innstillingKlageinstans && (
                <>
                    <h4 className={'blankett'}>Innstilling til NAV Klageinstans</h4>
                    <span style={{ whiteSpace: 'pre-wrap' }}>
                        {vurdering.innstillingKlageinstans}
                    </span>
                </>
            )}
            {vurdering.interntNotat && (
                <>
                    <h4 className={'blankett'}>Internt notat</h4>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{vurdering.interntNotat}</span>
                </>
            )}
        </div>
    );
};
