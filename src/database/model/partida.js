import {supabase} from "../supabase.js";

export class Partidas {
    constructor(id = null, puntos = null, tiempo = null, usuari = null, created_at = null, user_icon = null) {
        this.id = id;
        this.puntos = puntos;
        this.tiempo = tiempo;
        this.usuari = usuari;
        this.created_at = created_at;
        this.user_icon = user_icon;
    }

    static async getAll() {
        try {
            const { data: partidas, error } = await supabase
                .from('partidas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return partidas.map(partida => new Partidas(partida.id, partida.puntos, partida.tiempo, partida.usuari, partida.created_at, partidas.user_icon));
        } catch (error) {
            console.error('Error al obtener todas las partidas:', error.message);
            throw error;
        }
    }


    static async getUserData(auth) {
      //HACER RUTINA PARA OBTENER EL USUARIO APARTIR DEL LOGIN
        try {
            //pues obtener el user del que esta abierto ahora
        }catch(error) {
            console.error(auth.error)
        }
    }
    //obtiene el icono del usuario
    static async getUserIconByUserId(usuarioId) {
        const { data, error } = await supabase
            .from('partidas')
            .select('user_icon')  // selecciona todas las columnas
            .eq('usuari', usuarioId)  // filtra donde 'usuari' es igual al usuarioId proporcionado
            .order('data', { ascending: false })  // ordena los resultados por la columna 'data' en orden descendente
            .limit(1);  // limita los resultados a 1


        if (error) {
            console.error('Error en la consulta:', error)
            return null;
        }

        return data;
    }
}
