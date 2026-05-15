#!/usr/bin/env bash
# Outputs the current timestamp in two formats, both in UTC+7 (WIB / Asia/Jakarta).
# Run at the start of a research session to lock the timestamp before any work begins.
#
# Output:
#   filename_ts  — YYYYMMDD_HHMMSS  (for use in the log filename)
#   date_ts      — YYYY-MM-DD HH:MM:SS WIB  (for use in the log frontmatter)

FILENAME_TS=$(TZ="Asia/Jakarta" date +"%Y%m%d_%H%M%S")
DATE_TS=$(TZ="Asia/Jakarta" date +"%Y-%m-%d %H:%M:%S WIB")

echo "filename_ts: $FILENAME_TS"
echo "date_ts:     $DATE_TS"
