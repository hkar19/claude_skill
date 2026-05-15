#!/usr/bin/env bash
# Returns the git commit timestamp of a file in two formats, both in WIB (UTC+7 / Asia/Jakarta).
# Uses the file's last commit date. Falls back to the current time if the file has no git history.
#
# Usage:
#   bash get-file-timestamp.sh <path-to-file>
#
# Output:
#   filename_ts  — YYYYMMDD_HHMMSS  (for use in a log filename)
#   date_ts      — YYYY-MM-DD HH:MM:SS WIB  (for use in log frontmatter)
#
# Works correctly when called from any directory — resolves the file's repo root automatically.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <path-to-file>" >&2
  exit 1
fi

FILE="$1"

if [[ ! -f "$FILE" ]]; then
  echo "Error: file not found: $FILE" >&2
  exit 1
fi

# Resolve the git repo root that owns this file
REPO_ROOT=$(git -C "$(dirname "$(realpath "$FILE")")" rev-parse --show-toplevel 2>/dev/null || true)

if [[ -z "$REPO_ROOT" ]]; then
  echo "Warning: file is not inside a git repository — using current time" >&2
  FILENAME_TS=$(TZ="Asia/Jakarta" date +"%Y%m%d_%H%M%S")
  DATE_TS=$(TZ="Asia/Jakarta" date +"%Y-%m-%d %H:%M:%S WIB")
else
  # Let git format the timestamp in WIB directly — avoids platform date command differences
  FILENAME_TS=$(TZ="Asia/Jakarta" git -C "$REPO_ROOT" log -1 \
    --format="%cd" --date="format-local:%Y%m%d_%H%M%S" \
    -- "$(realpath "$FILE")" 2>/dev/null || true)
  DATE_TS=$(TZ="Asia/Jakarta" git -C "$REPO_ROOT" log -1 \
    --format="%cd" --date="format-local:%Y-%m-%d %H:%M:%S" \
    -- "$(realpath "$FILE")" 2>/dev/null || true)

  if [[ -z "$FILENAME_TS" ]]; then
    echo "Warning: no git history for this file — using current time" >&2
    FILENAME_TS=$(TZ="Asia/Jakarta" date +"%Y%m%d_%H%M%S")
    DATE_TS=$(TZ="Asia/Jakarta" date +"%Y-%m-%d %H:%M:%S")
  fi

  DATE_TS="$DATE_TS WIB"
fi

echo "filename_ts: $FILENAME_TS"
echo "date_ts:     $DATE_TS"
