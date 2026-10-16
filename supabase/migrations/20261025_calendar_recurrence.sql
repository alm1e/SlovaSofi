begin;

alter table public.calendar_events
    add column if not exists repeat_days smallint[] not null default '{}';

alter table public.calendar_events
    drop constraint if exists calendar_events_recurrence_check,
    drop constraint if exists calendar_events_check;

alter table public.calendar_events
    add constraint calendar_events_recurrence_check
        check (recurrence in ('none', 'daily', 'every_other_day', 'weekly', 'custom')),
    add constraint calendar_events_repeat_schedule_check
        check (
            (
                recurrence = 'none'
                and repeat_until is null
                and cardinality(repeat_days) = 0
            )
            or (
                recurrence <> 'none'
                and repeat_until is not null
                and repeat_until >= starts_at::date
                and repeat_until <= (starts_at::date + 365)
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
