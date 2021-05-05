import { Autor } from '../autores/autor.model';

export class Livro {
    id?: number;
    autor?: Autor;
    titulo: string;
    isbn: number;
    paginas: number;
    preco: number;
    imagem?: string;
}
