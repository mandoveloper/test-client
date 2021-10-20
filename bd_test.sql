create database bd_test;

create table if not exists public.clients
(
    id uuid not null default public.uuid_generate_v4(),
    created timestamp not null,
    updated timestamp,
    status bit default '1',
    fname varchar not null,
    lname varchar not null,
    address text not null,
    birthdate date not null,
    PRIMARY KEY (id)
);

-- ############### CREAR CLIENTE #######################

select * from clients

select sp_create_client('nom1', 'ape1', 'dir1', '2013-07-22');

create or replace function sp_create_client(
	in v_fname varchar,
	in v_lname varchar,
	in v_address text,
	in v_birthdate date
) returns text as
$$
begin
	if v_fname isnull or length(v_fname) = 0 then
		raise exception 'el campo fname no puede estar vacio';
	end if;
	
	if	v_lname isnull or length(v_lname) = 0 then
		raise exception 'el campo v_lname no puede estar vacio';
	end if;
	
	if	v_address isnull or length(v_address) = 0 then
		raise exception 'el campo v_address no puede estar vacio';
	end if;
	
	if	v_birthdate isnull then
		raise exception 'el campo v_birthdate no puede estar vacio';
	end if;
	
		insert into public.clients (created, fname, lname, address, birthdate)
		values (current_timestamp, v_fname, v_lname, v_address, v_birthdate );
		return 'cliente creado';

end
$$
 language 'plpgsql';



-- ################### CONSULTAR TODOS LOS CLIENTES / CLIENTE POR ID ########################

select * from clients

select * from sp_view_client_by_id();
select * from sp_view_client_by_id('60905269-5e06-4d95-b456-398a951861ae');


create or replace function sp_view_client_by_id(id_client uuid default null) 
returns table(
	id uuid,
	created timestamp,
	updated timestamp,
	status bit, 
	fname varchar,
	lname varchar,
	address text,
	birthdate date) as
$$
begin
    
  	if id_client isnull then
	return query
		select * from public.clients where public.clients.status = '1';
	else
	return query
  		select * from public.clients where public.clients.id = id_client ;
	end if;
	
end
$$
 language 'plpgsql';


-- ################### ACTUALIZAR CLIENTE POR ID ########################

select * from clients

select sp_update_client_by_id('3212f86c-9ad5-45f1-9b3f-9d9e8851615b','nom1', 'ape1', 'dir1', '2001-12-22');

create or replace function sp_update_client_by_id(
	in v_id uuid,
	in v_fname varchar,
	in v_lname varchar,
	in v_address text,
	in v_birthdate date
) returns text as
$$
	declare client text = (select public.clients.id from public.clients where public.clients.id = v_id) ;
begin
		if v_fname isnull or length(v_fname) = 0 then
		raise exception 'el campo fname no puede estar vacio';
	end if;
	
	if	v_lname isnull or length(v_lname) = 0 then
		raise exception 'el campo v_lname no puede estar vacio';
	end if;
	
	if	v_address isnull or length(v_address) = 0 then
		raise exception 'el campo v_address no puede estar vacio';
	end if;
	
	if	v_birthdate isnull then
		raise exception 'el campo v_birthdate no puede estar vacio';
	end if;
	
	if client isnull or length(client) = 0 then
		raise exception 'Cliente inválido';
	else
		update public.clients set updated = current_timestamp, fname = v_fname, 
		lname = v_lname , address = v_address , birthdate = v_birthdate
			where public.clients.id = v_id;
		return 'Cliente actualizado';
	end if;
	
end
$$
 language 'plpgsql';


-- ################### DAR BAJA CLIENTE POR ID ########################

select * from clients

select sp_delete_client_by_id('3212f86c-9ad5-45f1-9b3f-9d9e8851615b');

create or replace function sp_delete_client_by_id(
	in v_id uuid
) returns text as
$$
	declare client text = (select public.clients.id from public.clients where public.clients.id = v_id) ;
begin
	
	if client isnull or length(client) = 0 then
		raise exception 'Cliente inválido';
	else
		update public.clients set updated = current_timestamp, status = '0'
			where public.clients.id = v_id;
		return 'Cliente eliminado';
	end if;
	
end
$$
 language 'plpgsql';