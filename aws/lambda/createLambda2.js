import lambda from '@aws-cdk/aws-lambda';    
const fn = new lambda.Function(this, 'MyFunction', {
    runtime: lambda.Runtime.NodeJS810,
    handler: 'index.handler',
    code: lambda.Code.inline('exports.handler = function(event, ctx, cb) { return cb(null, "hello ttulka"); }')
});