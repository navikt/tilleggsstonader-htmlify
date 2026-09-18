import { OffentligTransportSamlingTabell } from './OffentligTransportSamlingTabell';
import { PrivatBilSamlingTabell } from './PrivatBilSamlingTabell';
import { BeregningsresultatReiseTilSamling } from '../typer/beregningsresultat';

export const BeregnReiseTilSamlingTabell: React.FC<{
    beregningsresultatReiseTilSamling: BeregningsresultatReiseTilSamling;
}> = ({ beregningsresultatReiseTilSamling }) => {
    return (
        <>
            <OffentligTransportSamlingTabell
                samlinger={beregningsresultatReiseTilSamling.offentligTransport ?? []}
            />
            <PrivatBilSamlingTabell samlinger={beregningsresultatReiseTilSamling.privatBil ?? []} />
        </>
    );
};
