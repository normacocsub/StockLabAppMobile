export interface AuthResponse {
    usuario: {
        usuario: string,
        password: string,
        nombre: string,
        apellidos: string,
        tipo: string,
        estado: string,
        idPersona: string,
        token: string,
        expires_in: number
    }
}
