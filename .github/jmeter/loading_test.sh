#!/bin/bash

# Perfomance testing scenarios
declare -A scenarios
# loops threads ramptime
scenarios=(
    ["LoadTesting"]="150 25 5"
    ["StressTesting"]="250 50 5"
    ["SpikeTesting"]="250 1 0"
    ["EnduranceTesting"]="150 50 100"
    ["ScalabilityTesting"]="500 50 5"
)

# Domain
DOMAIN="zhyvyisvit.shop"
# URL paths to test
URL_PATHS="/,/products/dlya-kotiv/page=1,product/-fitopasta-animall-vetline-malt-dlya-vyvedennya-shersti-u-kishok---100-h/65b2606f213addb487b8cab22/about"

IFS=',' read -ra ADDR <<<"$URL_PATHS"

# Run JMeter for each scenario and each URL path
for scenario in "${!scenarios[@]}"; do
    params=${scenarios[$scenario]}
    IFS=' ' read -ra PARAMS <<<"$params"

    echo PARAMS: loops: ${PARAMS[0]},threads: ${PARAMS[1]}, ramptime: ${PARAMS[2]}
    for URL_PATH in "${ADDR[@]}"; do
        echo "Running $scenario for '$URL_PATH' path"

        SLUG_PATH=$(echo $URL_PATH | tr '/' '_')
        SCENARIO_PATH=$(echo $scenario | tr ' ' '_')

        mkdir -p "./results/$SCENARIO_PATH/$SLUG_PATH"

        jmeter -n -t ./.github/jmeter/test_plan.jmx -Jdomain=$DOMAIN -Jpath=$URL_PATH -l "./results/$SCENARIO_PATH/$SLUG_PATH/$SLUG_PATH-results.jtl" -e -o "./results/$SCENARIO_PATH/$SLUG_PATH/res" -Jloops=${PARAMS[0]} -Jthreads=${PARAMS[1]} -Jramptime=${PARAMS[2]}
    done
done
