import React from 'react';

import { NonBreakingDiv } from './felles';
import { Behandlinginfo } from './typer/interntVedtak';
import { formaterNorskDatoTid } from '../felles/datoFormat';

const Behandling: React.FC<{ behandling: Behandlinginfo }> = ({ behandling }) => {
    return (
        <NonBreakingDiv>
            <h1>{behandling.stønadstype}</h1>
            <span>
                Fagsak: {behandling.eksternFagsakId} Behandling: {behandling.behandlingId}
            </span>
            <span>Årsak: {behandling.årsak}</span>
            <span>Ident: {behandling.ident}</span>
            <span>Opprettet: {formaterNorskDatoTid(behandling.opprettetTidspunkt)}</span>
            <span>Resultat: {behandling.resultat}</span>
            <span>Vedtatt: {formaterNorskDatoTid(behandling.vedtakstidspunkt)}</span>
            <span>Saksbehandler: {behandling.saksbehandler}</span>
            {behandling.beslutter && <span>Beslutter: {behandling.beslutter}</span>}
        </NonBreakingDiv>
    );
};

export default Behandling;
