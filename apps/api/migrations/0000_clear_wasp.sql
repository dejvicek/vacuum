CREATE TABLE "player" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "player_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nick_name" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "player_nick_name_unique" UNIQUE("nick_name")
);
--> statement-breakpoint
CREATE TABLE "rankings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rankings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"player_id" integer NOT NULL,
	"nick_name" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"total_score" numeric(10, 2),
	"total_victories" integer,
	"total_defeats" integer,
	"total_matches" integer,
	"win_rate" numeric(5, 2),
	"average_score" numeric(10, 2),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(10) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_player_id_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."player"("id") ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
CREATE TABLE public.point (
    placement smallint NOT NULL,
    points smallint NOT NULL
);

--> statement-breakpoint
create table tournament
(
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY(sequence name tournament_id_seq),
    created_at timestamp with time zone default now() not null,
    event_date date                                   not null,
    is_double  boolean                  default false not null
);

--> statement-breakpoint
CREATE TABLE result (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY(sequence name result_id_seq),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    placement smallint NOT NULL,
    player_id bigint,
    tournament_id bigint NOT NULL
);

--> statement-breakpoint
ALTER TABLE ONLY result
    ADD CONSTRAINT result_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.player(id);

--> statement-breakpoint
ALTER TABLE ONLY result
    ADD CONSTRAINT result_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES public.tournament(id);

--> statement-breakpoint
CREATE FUNCTION get_rankings_between_dates(from_date date, to_date date) RETURNS TABLE(points numeric, nick_name text, first_name text, last_name text, num_of_tournaments integer)
    LANGUAGE plpgsql
    AS $$
begin
  return query
  select
    ranking.points,
    ranking.nick_name,
    ranking.first_name,
    ranking.last_name,
    ranking.num_of_tournaments
  from (
    select
      sum(case
        when t.is_double = true then po.points * 2
        else po.points
      end)::numeric as points,
      p.nick_name::text as nick_name,
      p.first_name::text as first_name,
      p.last_name::text as last_name,
      count(t.event_date)::integer as num_of_tournaments
    from result r
    join tournament t on r.tournament_id = t.id
    join point po on r.placement = po.placement
    join player p on p.id = r.player_id
    where t.event_date > from_date and t.event_date <= to_date
    group by r.player_id, p.nick_name, p.first_name, p.last_name
  ) as ranking
  order by ranking.points desc;
end;
$$;