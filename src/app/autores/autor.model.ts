import { Genero } from "./autor.enum";

export class Autor {
    id?: number;
    nome: string;
    dataNascimento: Date;
    genero: Genero;
}
