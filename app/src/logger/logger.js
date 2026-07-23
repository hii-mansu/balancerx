export function logRequest({
  method,
  url,
  target,
  statusCode,
  duration,
}) {
  console.log(
    `[${new Date().toISOString()}] ${method} ${url} -> ${target} | ${statusCode} | ${duration}ms`
  );
}

export function logError({
  method,
  url,
  target,
  error,
}) {
  console.error(
    `[${new Date().toISOString()}] ${method} ${url} -> ${target} | ERROR | ${error.message}`
  );
}