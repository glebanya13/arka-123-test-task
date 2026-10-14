type ErrorContext = Record<string, unknown>;

export function reportRuntimeError(error: unknown, context: ErrorContext = {}) {
  console.error("Runtime error", { error, ...context });
}
