import { autorun, observable } from 'mobx';
import { asComponent } from '../core/as-component';

export const AutorunWithOptionsExample = asComponent(() => {
    const profile = observable({
        name: 'Pavan Podila',
        id: 123,
        couponsUsed: 3,
    });

    function sendCouponTrackingAnalytics(id, couponsUsed) {
        /* Make network request */
    }

    autorun(
        () => {
            sendCouponTrackingAnalytics(profile.id, profile.couponsUsed);
        },
        { delay: 1000 },
    );

    autorun(
        () => {
            if (profile.couponsUsed > 2) {
                throw new Error('No more than 2 Coupons allowed');
            }
        },
        {
            onError(ex) {
                console.error(ex);
                removeExcessCoupons(profile.id);
            },
        },
    );

    function removeExcessCoupons(id) {}
});
