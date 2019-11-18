/**
 * @type {React.SuspenseConfig}
 */
export const suspenseConfig = {
  timeoutMs: 3000,
  busyDelayMs: 500, // Before we show the inline spinner
  busyMinDurationMs: 100, // If we show it, force it to stick for a bit
};
