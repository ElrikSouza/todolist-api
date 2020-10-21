create table users (
    id uuid primary key not null,
    username varchar(35) not null,
    email varchar(254) not null,
    password char(60) not null,
    unique(email)
);

create table task_lists (
    id uuid primary key not null,
    user_id uuid not null,
    name varchar(35) not null,
    created_at timestamp with time zone default current_timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

create table tasks (
    id uuid primary key not null,
    user_id uuid not null,
    task_list_id uuid not null,
    name varchar(35) not null,
    description varchar(255),
    scheduled_to date,
    progress smallint not null default 0,
    created_at timestamp with time zone default current_timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(task_list_id) REFERENCES task_lists(id) ON DELETE CASCADE
);
