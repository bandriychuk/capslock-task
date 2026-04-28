/**
 * Input model for a successful in-area lead-flow scenario.
 */
export type InAreaType = {
    /**
     * ZIP code used to determine that the lead is inside the supported area.
     */
    zipCode: string;

    /**
     * Numeric identifier of the form variant to use on the home page.
     */
    formNumber: number;

    /**
     * Interest labels selected by the visitor.
     */
    interests: string[];

    /**
     * Property type chosen during the property-selection step.
     */
    property: string;

    /**
     * Name entered in the user-information step.
     */
    userName: string;

    /**
     * Email entered in the user-information step.
     */
    email: string;

    /**
     * Phone number entered in the final phone step.
     */
    phoneNumber: string;
};

/**
 * Input model for an out-of-area lead-flow scenario.
 */
export type OutOfAreaType = {
    /**
     * ZIP code used to trigger the out-of-area state.
     */
    zipCode: string;

    /**
     * Numeric identifier of the form variant to use on the home page.
     */
    formNumber: number;

    /**
     * Email entered in the out-of-area fallback step.
     */
    email: string;
};
