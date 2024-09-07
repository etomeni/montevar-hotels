import axios from "axios";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { psbEndpoint } from "@/util/resources.js";

import NodeCache from 'node-cache';

const tokenCache = new NodeCache({ stdTTL: 7200 }); // 7200 seconds = 2 hours


let waasAccessToken = '';
let waasTokenExpirationTime = 0;

let vasAccessToken = '';
let vasTokenExpirationTime = 0;

// Middleware to get the stored token or fetch a new one if expired
export async function getVasAuthToken(req: Request, res: Response, next: NextFunction) {
    if (!vasAccessToken || !vasTokenExpirationTime || Date.now() >= vasTokenExpirationTime) {
        try {
            const username = process.env.PSB_VASS_USERNAME;
            const password = process.env.PSB_VASS_PASSWORD;

            const response = (await axios.post(
                `${psbEndpoint}/identity/api/v1/authenticate`, 
                { username: username, password: password }
            )).data;

            if (response.data.accessToken ) {
                vasAccessToken = response.data.accessToken;
                const expiresIn: number = response.data.expiresIn;
                
                vasTokenExpirationTime = Date.now() + (expiresIn * 1000); // expires_in is in seconds

                // req.accessToken = accessToken;
                req.body.psbVas = {
                    vasAccessToken, 
                    vasTokenExpirationTime
                }

                // next();
                return next();
            }

            vasAccessToken = '';
            vasTokenExpirationTime = 0;


            return res.status(402).json({
                message: response.message || "Unable to get access token",
                status: false,
                statusCode: 402,
            });

        } catch (error: any) {
            vasAccessToken = '';
            vasTokenExpirationTime = 0;

            return res.status(500).json({
                message: error.response.data.message || "Unable to get access token",
                status: false,
                statusCode: 500,
                error
            });
        }
    } else {
        // req.accessToken = accessToken;
        req.body.psbVas = {
            vasAccessToken, 
            vasTokenExpirationTime
        }

        // next();
        return next();
    }
}



export async function getWaasAuthToken(req: Request, res: Response, next: NextFunction) {
    const cachedToken = tokenCache.get('waasAccessToken');
    const cachedTokenTokenExpirationTime = tokenCache.get('waasTokenExpirationTime');
    if (cachedToken) {
        waasAccessToken = cachedToken.toString();
        waasTokenExpirationTime = Number(cachedTokenTokenExpirationTime || 0);

        // req.accessToken = accessToken;
        req.body.psbWaas = {
            waasAccessToken: cachedToken,
            waasTokenExpirationTime: cachedTokenTokenExpirationTime
        }

        // next();
        return next();
    }

    if (waasAccessToken && (!waasTokenExpirationTime || Date.now() >= waasTokenExpirationTime)) {
        req.body.psbWaas = {
            waasAccessToken: waasAccessToken,
            waasTokenExpirationTime: waasTokenExpirationTime
        }

        // next();
        return next();
    }

    try {
        const username = process.env.PSB_WASS_USERNAME;
        const password = process.env.PSB_WASS_PASSWORD;
        const clientSecret = process.env.PSB_WASS_CLIENTSECRET;

        const response = (await axios.post(
            `${psbEndpoint}/bank9ja/api/v2/k1/authenticate`, 
            {
                username,
                password,
                clientId: "waas",
                clientSecret,
            }
        )).data;

        if (response.accessToken ) {
            waasAccessToken = response.accessToken;
            tokenCache.set('waasAccessToken', waasAccessToken);

            const expiresIn: number = response.expiresIn;
            waasTokenExpirationTime = Date.now() + (expiresIn * 1000); // expires_in is in seconds
            tokenCache.set('waasTokenExpirationTime', waasTokenExpirationTime);

            // req.accessToken = accessToken;
            req.body.psbWaas = {
                waasAccessToken, 
                waasTokenExpirationTime
            }

            // next();
            return next();
        }

        waasAccessToken = '';
        waasTokenExpirationTime = 0;


        return res.status(402).json({
            message: response.message || "Unable to get access token",
            status: false,
            statusCode: 402,
        });
    } catch (error: any) {
        console.log(error);
        
        waasAccessToken = '';
        waasTokenExpirationTime = 0;

        return res.status(500).json({
            message: error.response.data.message || error.response.message || error.message || "Unable to get access token",
            status: false,
            statusCode: 500,
            error
        });
    }
}