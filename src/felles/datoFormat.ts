import { format, parseISO } from 'date-fns';

export const formaterNorskDato = (dato: string): string => format(parseISO(dato), 'dd.MM.yyyy');
