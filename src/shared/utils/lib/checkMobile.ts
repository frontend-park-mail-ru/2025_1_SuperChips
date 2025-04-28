export const checkMobile = (): boolean => {
    // if ((navigator as any).userAgentData) {
    //     const userAgentData = (navigator as any).userAgentData;
    //     return userAgentData.mobile;
    // }

    const uaCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const matchMedia = (window.matchMedia('(max-width: 768px)').matches);

    return uaCheck || matchMedia;
};
