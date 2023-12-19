export function parseParams(req) {
  const PARAMS_KEYS = {
    seed: "seed",
    page: "page",
    errorValue: "error",
    location: "location",
    qty: "qty",
  };

  const seed = parseInt(req.query[PARAMS_KEYS.seed]);
  const page = parseInt(req.query[PARAMS_KEYS.page]);
  const errorValue = parseFloat(req.query[PARAMS_KEYS.errorValue]);
  const location = req.params[PARAMS_KEYS.location] || req.query[PARAMS_KEYS.location];
  const qty = parseInt(req.query[PARAMS_KEYS.qty]);
  return { seed, page, errorValue, location: location.toUpperCase(), qty };
}
