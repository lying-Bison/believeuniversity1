@echo off
echo Deploying to Surge...
cd build
echo 786mhkniazi786@gmail.com > .surgeignore
echo usman786.com >> .surgeignore
surge . beuhouse.surge.sh
