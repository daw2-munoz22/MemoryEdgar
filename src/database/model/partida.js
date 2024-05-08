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
        // Assumeix que `partida` és un objecte que té les propietats `usuari`, `data`, `hora` i `puntuació`.
        const { created_at, usuari, data, hora, puntuacion, user_icon } = partida;

        // Realitza la inserció a la taula 'partidas'
        const { data: responseData, error } = await supabase
            .from('partidas')
            .insert([
                {

                    created_at: created_at,
                    usuari: usuari,
                    data: data,
                    hora: hora,
                    puntuacion: puntuacion,
                    user_icon: ''
                }
            ])
            .select();
        // Gestiona possibles errors
        if (error) {
            console.error("Error inserting partida:", error);
            return null; // o potser voldries llançar una excepció o gestionar l'error d'una altra manera
        }

        // Retorna les dades inserides o alguna confirmació si es desitja
        return responseData;
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
