import { OffentligTransportTabell } from './OffentligTransportTabell';
import { BeregningsresultatDagligReise } from '../../typer/beregningsresultat';

export const DagligReiseBeregningsresultatTabell: React.FC<{
    beregningsresultat: BeregningsresultatDagligReise;
}> = ({ beregningsresultat: beregningsresultatDagligReise }) => {
    const offentligTransport = beregningsresultatDagligReise.offentligTransport?.reiser ?? [];
    if (offentligTransport.length === 0) {
        return null;
    }
    // TODO: Legg til bil
    return <OffentligTransportTabell offentligTransportReiser={offentligTransport} />;
};
