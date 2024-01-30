import { format, parseISO } from 'date-fns';

export const formatterNorskDato = (dato: string): string => format(parseISO(dato), 'dd.MM.yyyy');
