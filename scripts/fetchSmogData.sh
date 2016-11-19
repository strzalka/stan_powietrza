#!/bin/bash
#Fetches JSON data provided by stacje.wios.rzeszow.pl
#and saves it locally.

url='http://stacje.wios.rzeszow.pl/dane-pomiarowe/pobierz'


query='query={"measType":"Auto","viewType":"Station","dateRange":"Day","date":"'
query+="$(date +%d.%m.%Y)"
query+='","viewTypeEntityId":7,"channels":[123,128,121,122,124,125,120,127]}'

curl -s "$url" --data-urlencode "$query" > ../public_html/smog/data.json
 
