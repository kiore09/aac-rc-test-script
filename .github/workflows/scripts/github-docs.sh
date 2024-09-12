# Move cookiecutter values to github-docs folder
cp cookiecutter.json ./shared/github-docs/cookiecutter.json

# Generate docs with substituted values, copy files directly into cookie-temp's root
cookiecutter ./shared/github-docs/ --no-input --output-dir ./cookie-ghdocs-temp
rsync -r ./cookie-ghdocs-temp/* ./cookie-temp/