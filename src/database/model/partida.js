import {supabase} from "../supabase.js";

export class Partidas {
    constructor(id = null, created_at = null, usuari = null,  hora = null, puntuacion = null, user_icon = null) {
        this.id = id;
        this.created_at = created_at;
        this.usuari = usuari;
        this.hora = hora;
        this.puntuacion = puntuacion;
        this.user_icon = user_icon;
    }

    static async getAll() {
        try {
            const { data: partidas, error } = await supabase
                .from('partidas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return partidas.map(partida => new Partidas(partida.id, partida.created_at, partida.usuari, partida.hora, partida.puntuacion, partidas.user_icon));
        } catch (error) {
            console.error('Error al obtener todas las partidas:', error.message);
            throw error;
        }
    }

    static async InsertPartida(partida) {
        // Asegúrate de que los nombres de las propiedades coinciden con los nombres de las columnas de tu base de datos.
        const { data: { user } } = await supabase.auth.getUser()
        //const { created_at, usuari, hora, puntuacion } = partida;

        try {

            const { data: { user } } = await supabase.auth.getUser()
            const { data: usu, error: errorUsu } = await supabase
                .from('partidas')
                .insert([
                    {
                        usuari: user.email,
                        puntuacion: puntuacion,
                    }
                ])
                .select()

            if(errorUsu)throw new Error (errorUsu.message)

        } catch (error) {
            console.log(error)
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
