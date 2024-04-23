import { createClient } from "@supabase/supabase-js";


//5a6wogawU3Syi4RM  pasword


const supabaseUrl = 'https://lzrabyrvvtyaswszkywc.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cmFieXJ2dnR5YXN3c3preXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTM5MTksImV4cCI6MjAyODQyOTkxOX0.Z0L6mIwudzN41B9hxYMMulBB27S3nihW4d0ngMz6_FY'

export const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Conexion a supabase', supabase)