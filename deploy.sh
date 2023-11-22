cd ./dist
git init
git add .
git commit -m "deploy"
git checkout -b gh-pages
git remote add origin git@github.com:JQiue/value-master.git
git push origin gh-pages -f