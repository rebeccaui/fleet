import { ApplePlatform } from "interfaces/platform";
import sendRequest from "services";
import endpoints from "utilities/endpoints";

export interface IGetVppInfoResponse {
  org_name: string;
  renew_date: string;
  location: string;
}

export interface IVppApp {
  name: string;
  bundle_identifier: string;
  icon_url: string;
  latest_version: string;
  app_store_id: string;
  added: boolean;
  platform: ApplePlatform;
}

export interface IGetVppAppsResponse {
  app_store_apps: IVppApp[];
}

export default {
  getAppleAPNInfo: () => {
    const { MDM_APPLE_PNS } = endpoints;
    const path = MDM_APPLE_PNS;
    return sendRequest("GET", path);
  },

  uploadApplePushCertificate: (certificate: File) => {
    const { MDM_APPLE_APNS_CERTIFICATE } = endpoints;
    const formData = new FormData();
    formData.append("certificate", certificate);
    return sendRequest("POST", MDM_APPLE_APNS_CERTIFICATE, formData);
  },

  deleteApplePushCertificate: () => {
    const { MDM_APPLE_APNS_CERTIFICATE } = endpoints;
    return sendRequest("DELETE", MDM_APPLE_APNS_CERTIFICATE);
  },

  requestCSR: () => {
    const { MDM_REQUEST_CSR } = endpoints;
    return sendRequest("GET", MDM_REQUEST_CSR);
  },

  getVppInfo: (): Promise<IGetVppInfoResponse> => {
    const { MDM_APPLE_VPP } = endpoints;
    return sendRequest("GET", MDM_APPLE_VPP);
  },

  uploadVppToken: (token: File) => {
    const { MDM_APPLE_VPP_TOKEN } = endpoints;
    const formData = new FormData();
    formData.append("token", token);
    return sendRequest("POST", MDM_APPLE_VPP_TOKEN, formData);
  },

  disableVpp: () => {
    const { MDM_APPLE_VPP_TOKEN } = endpoints;
    return sendRequest("DELETE", MDM_APPLE_VPP_TOKEN);
  },

  getVppApps: (teamId: number): Promise<IGetVppAppsResponse> => {
    const { MDM_APPLE_VPP_APPS } = endpoints;
    const path = `${MDM_APPLE_VPP_APPS}?team_id=${teamId}`;
    return sendRequest("GET", path);
  },

  addVppApp: (teamId: number, appStoreId: string, platform: ApplePlatform) => {
    const { MDM_APPLE_VPP_APPS } = endpoints;
    return sendRequest("POST", MDM_APPLE_VPP_APPS, {
      app_store_id: appStoreId,
      team_id: teamId,
      platform,
    });
  },
};
