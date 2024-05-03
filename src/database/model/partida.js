import {supabase} from "../supabase.js";

export class Partidas {
    constructor(id = null, puntos = null, tiempo = null, usuario_id = null, created_at = null) {
        this.id = id;
        this.puntos = puntos;
        this.tiempo = tiempo;
        this.usuario_id = usuario_id;
        this.created_at = created_at;
    }

    static async getAll() {
        try {
            const { data: partidas, error } = await supabase
                .from('partidas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return partidas.map(partida => new Partidas(partida.id, partida.puntos, partida.tiempo, partida.usuario_id, partida.created_at));
        } catch (error) {
            console.error('Error al obtener todas las partidas:', error.message);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const { data: partida, error } = await supabase
                .from('partidas')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw new Error(error.message);
            return new Partidas(partida.id, partida.puntos, partida.tiempo, partida.usuario_id, partida.created_at);
        } catch (error) {
            console.error('Error al obtener la partida por ID:', error.message);
            throw error;
        }
    }

    static async getByUserId(userId) {
        try {
            const { data: partidas, error } = await supabase
                .from('partidas')
                .select('*')
                .eq('usuario_id', userId);

            if (error) throw new Error(error.message);
            return partidas.map(partida => new Partidas(partida.id, partida.puntos, partida.tiempo, partida.usuario_id, partida.created_at));
        } catch (error) {
            console.error('Error al obtener partidas por usuario:', error.message);
            throw error;
        }
    }

    static async create(perfilData) {
        try {
            const { data, error } = await supabase
                .from('partidas')
                .insert([perfilData], { returning: "representation" });

            if (error) throw new Error(error.message);
            return new Partidas(data[0].id, data[0].puntos, data[0].tiempo, data[0].usuario_id, data[0].created_at);
        } catch (error) {
            console.error('Error al crear una nueva partida:', error.message);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const { error } = await supabase
                .from('partidas')
                .delete()
                .eq('id', id);

            if (error) throw new Error(error.message);
            return true;
        } catch (error) {
            console.error('Error al borrar la partida:', error.message);
            throw error;
        }
    }
}
