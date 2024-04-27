// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Partidas {
    // Mapping de propiedades de la tabla perfiles
    constructor (id = null, puntos = null, tiempo = null, usuario_id = null, created_at = null) {
        this.id = id
        this.puntos = puntos
        this.tiempo = tiempo
        this.usuario_id = usuario_id
        this.created_at = created_at
    }

    // leer todos en orden descendiente a como se han creado
    static async getAll () {
        const { data: partida, error } = await supabase
            .from('partidas')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) {
            throw new Error(error.message)
        }
        // devuelve array de objetos
        return partida.map(({ id, puntos, tiempo, usuario_id, created_at }) => {
            return new Partidas(id, puntos, tiempo, usuario_id, created_at)
        })
    }

    // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
    static async getById (id) {
        const { data: partida, error } = await supabase
            .from('partidas')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw new Error(error.message)
        }
        // Devuelve un nuevo objeto con los datos del registro
        return new Partidas(partida.id, partida.puntos, partida.tiempo, partida.usuario_id, partida.created_at)
    }

    // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
    static async getByUserId (id) {
        const { data: partida, error } = await supabase
            .from('partidas')
            .select('*')
            .eq('user_id', id)
            .single()
        if (error) {
            throw new Error(error.message)
        }
        // Devuelve un nuevo objeto con los datos del registro
        return new Partidas(partida.id, partida.puntos, partida.tiempo, partida.usuario_id, partida.created_at)
    }

    // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
    static async create (perfilData) {
        const { error } = await supabase
            .from('partidas')
            .insert(perfilData)
            .select()
        // console.log('nuevo perfil ',error);
        if (error) {
            throw new Error(error.message)
        }
        return true
    }

    // actualizar
    //   async update () {
    //     const { error } = await supabase
    //       .from('perfiles')
    //       .update({
    //         nombre: this.nombre,
    //         apellidos: this.apellidos,
    //         avatar: this.avatar
    //       })
    //       .eq('id', this.id)
    //       .single()

    //     if (error) {
    //       throw new Error(error.message)
    //     }
    //     return true
    //   }

    // borrar
    static async delete (id) {
        const { error } = await supabase
            .from('partidas')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(error.message)
        }
        return true
    }
}