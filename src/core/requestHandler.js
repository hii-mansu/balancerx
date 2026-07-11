export function requestHandler(req, res){
    res.writeHead(200,{
        "Content-Type":"text/plain",
    });
    res.end("BalancerX is running.");
}