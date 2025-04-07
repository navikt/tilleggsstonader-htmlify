import { format, parseISO } from 'date-fns';

import { Periode } from './periode';

export const formaterNorskDato = (dato: string): string => format(parseISO(dato), 'dd.MM.yyyy');

export const formaterNorskDatoTid = (dato: string): string => {
    return format(parseISO(dato), "dd.MM.yyyy 'kl'.HH:mm");
};

export const formaterPeriode = (periode: Periode) =>
    `${formaterNorskDato(periode.fom)} - ${formaterNorskDato(periode.tom)}`;
