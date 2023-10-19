import { Response } from "express";

const handleHttp = (res: Response, error: string, codigoError?: number) => {
  if (codigoError !== undefined) {
    switch (codigoError) {
      case 400:
        res.status(400).send("Bad Request");
      case 401:
        res.status(401).send("Unathorized Session");
      case 403:
        res.status(403).send("Forbidden Request");
      case 404:
        res.status(404).send("Not Found");
      case 408:
        res.status(408).send("Request Timeout");
      case 415:
        res.status(415).send("Unsoported Media Type");
      case 429:
        res.status(429).send("Too Many Request");
      case 500:
        res.status(500).send("Internal Server Error");
      case 503:
        res.status(503).send("Service Unavailable");
      case 504:
        res.status(504).send("Gateway Timeout");
      case 511:
        res.status(511).send("Network Authentication Required");
    }
    res.status(500).send({ error });
  } else {
    res.status(500).send({ error });
  }
};

export { handleHttp };
