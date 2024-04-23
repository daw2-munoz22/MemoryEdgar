# Projecte: Memory

Aquest projecte consisteix en desenvolupar una aplicació de joc de memòria utilitzant React, Tailwind CSS i diverses APIs com PokeAPI i la de Marvel per a obtenir les dades. El joc permet als usuaris girar targetes i trobar parelles de personatges fins a completar totes les parelles.

## Tecnologies Utilitzades

- **React**: Una biblioteca de JavaScript per construir interfícies d'usuari.
- **Tailwind CSS**: Un framework CSS per a dissenyar ràpidament interfícies personalitzades.
- **PokeAPI/Marvel API**: APIs externes utilitzades per obtenir imatges i noms de personatges.
- **Supabase**: Utilitzat per a l'autenticació d'usuaris i emmagatzematge de dades.
- **Vercel**: Plataforma per al desplegament de l'aplicació.

## Instal·lació

### Configuració del Projecte

1. **Crea un projecte amb Vite**
   Per iniciar un projecte de React amb Vite, executa:
   ```bash
   npm create vite@latest nom-del-teu-projecte -- --template react
   cd nom-del-teu-projecte
   npm install
2. **Instal·lació de Tailwind CSS**
    Afegeix Tailwind CSS al teu projecte:
    ```bash
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    npx tailwindcss init -p

    Afegeix les directives de Tailwind al teu fitxer CSS principal (`src/index.css`):