-- Create the tags table first (referenced by the join table)
CREATE TABLE tags
(
    tag_name VARCHAR(255) PRIMARY KEY
);

-- Create the notes table
CREATE TABLE notes
(
    note_id       UUID PRIMARY KEY,
    lock_password TEXT,
    note_title    VARCHAR(255)             NOT NULL,
    note_content  TEXT,
    banner_url    TEXT,
    emoji         VARCHAR(255),
    is_locked     BOOLEAN                  NOT NULL,
    is_trashed    BOOLEAN                  NOT NULL,
    is_pinned     BOOLEAN                  NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at    TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create the join table for the ManyToMany relationship
CREATE TABLE note_tags
(
    note_id  UUID         NOT NULL,
    tag_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (note_id, tag_name),
    CONSTRAINT fk_note_tags_note_id
        FOREIGN KEY (note_id) REFERENCES notes (note_id) ON DELETE CASCADE,
    CONSTRAINT fk_note_tags_tag_name
        FOREIGN KEY (tag_name) REFERENCES tags (tag_name) ON DELETE CASCADE
);