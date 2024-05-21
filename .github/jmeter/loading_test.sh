#!/bin/bash

# Perfomance testing scenarios
declare -A scenarios
scenarios=(
    ["LoadTesting"]="loops=100 threads=50 ramptime=1"
    ["StressTesting"]="loops=500 threads=100 ramptime=5"
    ["SpikeTesting"]="loops=1000 threads=1 ramptime=0"
    ["EnduranceTesting"]="loops=100 threads=10 ramptime=60"
    ["ScalabilityTesting"]="loops=100 threads=10 ramptime=1"
)

# Domain
DOMAIN="zhyvyisvit.shop"
# URL paths to test
URL_PATHS="/,/products/dlya-kotiv/page=1,product/-fitopasta-animall-vetline-malt-dlya-vyvedennya-shersti-u-kishok---100-h/65b2606f213addb487b8cab22/about,/products/search=dlya-kotiv/page=1"

IFS=',' read -ra ADDR <<<"$URL_PATHS"

# Run JMeter for each scenario and each URL path
for scenario in "${!scenarios[@]}"; do
    params=${scenarios[$scenario]}
    IFS=' ' read -ra PARAMS <<<"$params"
    for URL_PATH in "${ADDR[@]}"; do
        echo "Running $scenario for $URL_PATH"
        SLUG_PATH=$(echo $URL_PATH | tr '/' '_')
        mkdir -p "./results/$SLUG_PATH"
        ./apache-jmeter-5.6.3/bin/jmeter -n -t ./.github/jmeter/test_plan.jmx -Jdomain=$DOMAIN -Jpath=$URL_PATH -l "./results/$SLUG_PATH/$SLUG_PATH-results.jtl" -e -o "./results/$SLUG_PATH/res" -Jloops=${PARAMS[0]} -Jthreads=${PARAMS[1]} -Jramptime=${PARAMS[2]}
    done
done
