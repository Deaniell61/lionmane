export class Menus {
  constructor() {
    this.inicio = false;
    this.nombre = '';
    this.rol = 1;
  }
  sesion?: boolean;
  select?: boolean;
  clienteOnly?: boolean;
  inicio?: boolean;
  url: string;
  evento?: any;
  nombre?: string;
  rol?: number;
  submenu?: Menus[];
}
export class Perfil {
  constructor(
  ) {
    this.username = '';
    this.email = '';
    this.estado = true;
    this.nombre = '';
    this.apellido = '';
    this.salt = '';
    this.hash = '';
    this.createdAt = new Date();
  }
  id?: number;
  username?: string;
  email?: string;
  estado?: boolean;
  imagenes?: Imagen[];
  nombre?: string;
  apellido?: string;
  salt?: string;
  hash?: string;
  hash_rep?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class ChangePasswordForm {
  constructor() {
    this.id = null;
    this.old_pass = '';
    this.new_pass = '';
    this.new_pass_rep = '';
    this.perfil = new Perfil();
  }
  id?: number;
  old_pass?: string;
  new_pass?: string;
  new_pass_rep?: string;
  perfil?: Perfil;

}
export class ListaBusqueda {
  constructor() {
    this.id = null;
    this.nombre = '';
    this.imagen = 'https://placehold.it/250x200';
    this.validacion = 5;
  }
  id?: number;
  nombre?: string;
  imagen?: string;
  imagenes?: Imagen[];
  objeto?: any;
  validacion?: number;
  cantidad?: number;
}
export class Favorito {
  constructor() {
    this.id = null;
    this.subRazaId = '';
    this.razaId = '';
    this.estado = true;
  }
  subRazaId: string;
  razaId: string;
  estado?: boolean;
  usuarioId?: number;
  id?: number;
  createdAt?: Date;
}

export class Imagen {
  constructor() {
    this.id = null;
    this.url = 'https://placehold.it/50X50';
    this.titulo = '';
    this.descripcion = '';
    this.estado = 1;
  }
  id?: number;
  url: string;
  orden?: string;
  titulo?: string;
  descripcion?: string;
  estado?: number;
}

export class FilterGET {
  constructor() {
    this.id = 0;
    this.estado = '0';
    this.filter = 'nada';
  }
  id: number;
  estado: string;
  filter: string;
}

