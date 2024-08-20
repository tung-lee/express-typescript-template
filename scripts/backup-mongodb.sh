#!/bin/sh

#=====================================================================
# Set the following variables as per your requirement
#=====================================================================
# Database Name to backup
MONGO_DATABASE=""

# Database host name
# MONGO_HOST="127.0.0.1"

# Database port
# MONGO_PORT="27017"

# Backup directory
BACKUP_DIR="backup/$MONGO_DATABASE"

# Database user name
# DBUSERNAME="admin"

# Database password
# DBPASSWORD="password"

# Authentication database name
# DBAUTHDB="testBackup"

# Days to keep the backup
# DAYSTORETAINBACKUP="1"

# MongoDB URI
MONGO_URI=""
#=====================================================================

TIMESTAMP=`date +%F-%H%M`
BACKUP_NAME="$MONGO_DATABASE-$TIMESTAMP"

echo "Performing backup of $MONGO_DATABASE"
echo "--------------------------------------------"

# Create backup directory
if ! mkdir -p $BACKUP_DIR; then
  echo "Can't create backup directory in $BACKUP_DIR. Go and fix it!" 1>&2
  exit 1;
fi;

# Create dump
# mongodump -d $MONGO_DATABASE --username $DBUSERNAME --password $DBPASSWORD --authenticationDatabase $DBAUTHDB

mongodump -d $MONGO_DATABASE $MONGO_URI

# Rename dump directory to backup name
mv dump $BACKUP_NAME

mv $BACKUP_NAME $BACKUP_DIR

# Compress backup
# tar -zcvf $BACKUPS_DIR/$BACKUP_NAME.tgz $BACKUP_NAME

# Delete uncompressed backup
# rm -rf $BACKUP_NAME

# Delete backups older than retention period
# find $BACKUPS_DIR -type f -mtime +$DAYSTORETAINBACKUP -exec rm {} +

echo "--------------------------------------------"
echo "Database backup complete!"