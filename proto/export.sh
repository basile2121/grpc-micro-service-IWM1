# !bin/sh

buf generate
buf export . --output ../product-api/src/proto
buf export . --output ../user-api/src/proto
buf export . --output ../auth-api/src/proto
buf export . --output ../gateway-api/src/proto
buf export . --output ../shop-api/src/proto