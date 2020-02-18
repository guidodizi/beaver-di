BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
  echo 'Not master - aborting script';
  exit 1;
fi

npm run build;
np;
