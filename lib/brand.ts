export const LOGO_SRC = "/KA-logo-transparent.png";
export const LOGO_ALT = "KA Strategist Logo";

/** Natural aspect ratio of the provided logo asset (width / height). */
export const LOGO_ASPECT = 578 / 299;

export function logoDimensions(height: number) {
  return {
    height,
    width: Math.round(height * LOGO_ASPECT),
  };
}
