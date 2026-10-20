begin;

create or replace function public.calendar_event_repeat_dates_valid(date_values date[], start_date date)
returns boolean
language sql
immutable
parallel safe
as $$
    select coalesce(
        bool_and(date_value between (start_date - 1) and (start_date + 366))
        and max(date_value) - min(date_value) <= 365
        and count(*) = count(distinct date_value),
        false
    )
    from unnest(date_values) as selected_date(date_value);
$$;

alter table public.calendar_events
    add column if not exists repeat_dates date[] not null default '{}';

alter table public.calendar_events
    drop constraint if exists calendar_events_recurrence_check,
    drop constraint if exists calendar_events_repeat_schedule_check;

alter table public.calendar_events
    add constraint calendar_events_recurrence_check
        check (recurrence in ('none', 'daily', 'every_other_day', 'weekly', 'custom', 'selected_dates')),
    add constraint calendar_events_repeat_schedule_check
        check (
            (
                recurrence = 'none'
                and repeat_until is null
                and cardinality(repeat_days) = 0
                and cardinality(repeat_dates) = 0
            )
            or (
                recurrence = 'selected_dates'
                and repeat_until is null
                and cardinality(repeat_days) = 0
                and cardinality(repeat_dates) between 1 and 366
                and public.calendar_event_repeat_dates_valid(repeat_dates, starts_at::date)
            )
            or (
                recurrence not in ('none', 'selected_dates')
                and repeat_until is not null
                and repeat_until >= starts_at::date
                and repeat_until <= (starts_at::date + 365)
                and cardinality(repeat_dates) = 0
                and (
                    (
                        recurrence = 'custom'
                        and cardinality(repeat_days) between 1 and 7
                        and repeat_days <@ array[0, 1, 2, 3, 4, 5, 6]::smallint[]
                    )
                    or (recurrence <> 'custom' and cardinality(repeat_days) = 0)
                )
            )
        );

commit;
