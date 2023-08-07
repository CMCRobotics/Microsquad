#!/bin/bash
echo 
echo "STARTING :: Checking for valid topics one after the other...."

MAX_TOPICS_TO_CHECK=300

for c in `seq 0 $MAX_TOPICS_TO_CHECK`
    do
    echo "  $c Checking for Topic ...."
    for i in `mosquitto_sub -v -t "#" -C 1|cut -d' ' -f1`
        do  
            echo "    $i >> sending empty payload to topic with retained flag"
            mosquitto_pub -r -n -t "`echo $i | sed s#'\\$'#'\\\$'#g`" 
        done
done