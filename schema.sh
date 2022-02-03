psql -d pacific -U postgres -f database/schema-events.sql
psql -d pacific -U postgres -f database/schema-events-categories.sql
psql -d pacific -U postgres -f database/schema-users.sql
psql -d pacific -U postgres -f database/schema-user-preferences.sql
psql -d pacific -U postgres -f database/schema-users-event.sql
psql -d pacific -U postgres -f database/schema-friends.sql
psql -d pacific -U postgres -f database/schema-locations.sql
