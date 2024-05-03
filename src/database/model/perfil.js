//Este fichero almacenará los perfiles de los usuarios

import {supabase} from "../supabase.js";

export class Perfil {
    constructor(id = null, name = null, created_at = null, salt = null, user_id = null, email = null) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.salt = salt;
        this.user_id = userId;
        this.email = email;
    }


    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getCreatedAt(){
        return this.created_at;
    }
    getSalt(){
        return this.salt;
    }
    getUserId(){
        return this.user_id;
    }
    getEmail(){
        return this.email;
    }


}