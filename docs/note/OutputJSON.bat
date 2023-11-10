@echo off
setlocal enabledelayedexpansion

rem In sequence, generate IDs and file names, and format them into JSON objects for goods.json.
rem the result will be written in output.json.

rem Sequece Number will be from "begin" to "max".
set begin=1
set max=36

set "json="

for /L %%i in (!begin!, 1, !max!) do (
    set "x=00%%i"
    set "x=!x:~-3!"
    set "id=S!x!"
    set "file=goods_!x!.jpg"
    set "name=GOODS NAME !x!"
    set "desc=SAMPLE DESC !x!"
    set "price=1000"
    set "stock=10"
    set "sold=1"
    set "orderform=https://docs.google.com/forms/d/e/1FAIpQLSfaDj51OBVD2YUfKay23nVsDuGOs4iEPuprRqhh-mRmcVZLfw/viewform?usp=sf_link"

    set "json=!json!{"id":"!id!","file":"!file!","name":"!name!","desc":"!desc!","price":!price!,"stock":!stock!,"sold":!sold!,"orderform":"!orderform!"}"

    if %%i lss 36 set "json=!json!,"
)

echo [%json%] > output.json