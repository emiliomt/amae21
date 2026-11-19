-- Tabla del registro de huéspedes. Ejecutar en el SQL editor de Supabase.
create table if not exists public.consentimientos (
  id bigint generated always as identity primary key,
  nombre text not null check (char_length(nombre) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 10 and 20),
  correo text not null check (correo ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  consentimiento boolean not null check (consentimiento = true),
  version_aviso text not null,
  idioma text not null default 'es',
  consentido_en timestamptz not null default now()   -- fecha y hora puestas por el servidor
);
alter table public.consentimientos enable row level security;
-- El sitio (rol anon) solo puede INSERTAR; nadie puede leer desde el navegador.
create policy "anon inserta" on public.consentimientos for insert to anon with check (true);
