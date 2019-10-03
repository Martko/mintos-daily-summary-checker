#!/usr/bin/env bash

RELEASE_FILE_NAME="build-$CI_BUILD_NUMBER.tar.gz"

echo "================== STARTING TO DEPLOY ==================="
echo "BRANCH: $CI_BRANCH ($COMMIT_ID)"
echo "Commit message: $CI_COMMIT_MESSAGE"
echo "Committer: $CI_COMMITTER_NAME ($CI_COMMITTER_EMAIL)"
echo "========================================================="

echo "======== ZIPPING DEPLOYMENT $CI_BUILD_NUMBER ========"
tar -zcf ~/$RELEASE_FILE_NAME ./build
echo "DEPLOYMENT ZIPPING COMPLETE"

echo "======== STARTING TO TRANSFER DEPLOYMENT PACKAGE TO LIVE ======== "
scp -i /home/rof/.ssh/id_rsa -C ~/$RELEASE_FILE_NAME $LIVE_SERVER_USER@$LIVE_SERVER_HOST:$LIVE_SERVER_APP_PATH
echo "======== DEPLOYMENT PACKAGE TRANSFER TO LIVE COMPLETE ========"

echo "======== INSTALLING DEPLOYMENT IN LIVE ========"
DEPLOYMENT_NAME="${CI_BUILD_NUMBER}_`date +\%d-\%m-\%Y_\%H-\%M-\%S`"
ssh -i /home/rof/.ssh/id_rsa $LIVE_SERVER_USER@$LIVE_SERVER_HOST "
mkdir -p ~/deployments/$CI_REPO_NAME/$DEPLOYMENT_NAME &&
tar xzf $RELEASE_FILE_NAME -C ~/deployments/$CI_REPO_NAME/$DEPLOYMENT_NAME &&
ln -sfn ~/deployments/$CI_REPO_NAME/$DEPLOYMENT_NAME ~/latest/$CI_REPO_NAME &&
rm $RELEASE_FILE_NAME &&
exit"

echo "========================================="
echo "========= DEPLOYMENT SUCCESSFUL ========="
echo "========================================="