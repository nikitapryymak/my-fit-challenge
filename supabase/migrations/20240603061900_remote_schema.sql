alter table "public"."users" drop constraint "users_username_key";

drop index if exists "public"."users_username_key";

alter table "public"."users" drop column "username";

alter table "public"."users" add column "name" character varying not null;

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (name);

alter table "public"."users" add constraint "users_username_key" UNIQUE using index "users_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.users(id, name)
  values (new.id, new.email);

  return new;
end;$function$
;

create policy "Enable current user to get their own record"
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Users can update their own account"
on "public"."users"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



