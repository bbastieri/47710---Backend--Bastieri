import { Router } from "express";
import { loggerDev, loggerProd } from "../utils/logger.js"

const router = new Router();

router.get('/', (req, res) => {
  
    loggerDev.debug('Debug lvl test message');
    loggerDev.verbose('Verbose lvl test message');
    loggerDev.http('Http lvl test message');
    loggerDev.info('Info lvl test message');
    loggerDev.warn('Warn lvl test message');
    loggerDev.error('Error lvl test message');
    
    loggerProd.info('Info lvl test message (production)');
    loggerProd.warn('Warn lvl test message (production)');
    loggerProd.error('Error lvl test message (production)');
    
    res.send('Logger test done');

  });

export default router; 