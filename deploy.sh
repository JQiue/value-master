cd ./dist
git init
git add .
git commit -m "deploy"
git checkout -b gh-pages
git push git@github.com:JQiue/value-master.git gh-pages -f