export type Socio = {

    idPartner: number;
    taxIdentification: string;
    names: string
    lastName: string
    address: string
    phone?: string
    email?: string
    status?: boolean

}

export type CrearSocioInput = Omit<Socio, 'idPartner'>