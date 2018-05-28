LAST_COMMIT_MESSAGE="$(git log -1 --pretty=%B)"

function update_build_repo {
  rm -rf /tmp/$1-build/
  git clone git@github.com:HQTrust/$1-build.git /tmp/$1-build
  cp -rf ./packages/$1/* /tmp/$1-build/
  pushd /tmp/$1-build/
  git add .
  git commit -m "$LAST_COMMIT_MESSAGE"
  git push origin master
  popd
}

update_build_repo "ra-core"
update_build_repo "ra-ui-materialui"
update_build_repo "react-admin"
