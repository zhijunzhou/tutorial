import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

    isMobileDevice: boolean = false;

    constructor() {
        var getMobileState = () => {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            }
            return false;
        }
        this.isMobileDevice = getMobileState();
    }

    isMobile() {
        return this.isMobileDevice;
    }

}